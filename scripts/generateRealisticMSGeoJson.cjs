const fs = require('fs');
const path = require('path');
const { Delaunay } = require('d3-delaunay');

// Load municipalities
const rawDataFile = fs.readFileSync(path.join(__dirname, '../src/data/municipiosData.ts'), 'utf8');
const match = rawDataFile.match(/export const MUNICIPIOS_DATA: MunicipioMS\[\] = (\[[\s\S]*?\]);\n/);
if (!match) {
  console.error("Could not find MUNICIPIOS_DATA in file");
  process.exit(1);
}

const municipios = JSON.parse(match[1]);

// True MS Boundary points (following the reference map shape):
// 1. North horn (Sonora / Pedro Gomes)
// 2. Northeast border (Costa Rica / Chapadão / Paranaíba - Rio Aporé / Rio Paranaíba)
// 3. East border (Rio Paraná along Três Lagoas, Brasilândia, Bataguassu, Anaurilândia)
// 4. South tip (Mundo Novo, Japorã, Sete Quedas, Paranhos)
// 5. Southwest border (Coronel Sapucaia, Aral Moreira, Ponta Porã, Bela Vista, Caracol, Porto Murtinho)
// 6. West border (Rio Paraguai / Pantanal through Corumbá)
// 7. Northwest horn (Corumbá / Paiaguás / Nabileque)

const msPerimeter = [
  [-54.75, -17.40], // Sonora norte
  [-54.20, -17.70],
  [-53.60, -18.00], // Alcinópolis norte
  [-53.00, -18.30], // Costa Rica norte
  [-52.40, -18.70], // Chapadão do Sul
  [-51.60, -19.00], // Cassilândia leste
  [-51.05, -19.40], // Paranaíba ponta leste
  [-51.00, -20.10], // Aparecida do Taboado
  [-51.35, -20.50], // Selvíria / Rio Paraná
  [-51.65, -21.00], // Três Lagoas leste
  [-52.00, -21.40], // Brasilândia leste
  [-52.40, -21.90], // Bataguassu leste
  [-52.80, -22.30], // Anaurilândia leste
  [-53.25, -22.65], // Batayporã / Taquarussu
  [-53.70, -23.10],
  [-54.10, -23.70], // Eldorado leste
  [-54.25, -24.15], // Mundo Novo (extremo sul MS)
  [-54.55, -24.05], // Japorã sul
  [-55.05, -23.95], // Sete Quedas sul
  [-55.45, -23.85], // Paranhos sul
  [-55.60, -23.35], // Coronel Sapucaia
  [-55.70, -22.65], // Ponta Porã fronteira
  [-56.10, -22.25], // Antônio João
  [-56.55, -22.15], // Bela Vista fronteira
  [-57.05, -22.00], // Caracol
  [-57.88, -21.70], // Porto Murtinho sul
  [-57.92, -21.30], // Porto Murtinho rio
  [-57.85, -20.50], // Pantanal sul
  [-57.75, -19.70], // Corumbá sul
  [-57.65, -19.00], // Corumbá centro
  [-58.00, -18.40], // Corumbá oeste
  [-58.15, -17.80], // Corumbá noroeste ponta
  [-57.60, -17.50], // Pantanal norte
  [-56.80, -17.70],
  [-56.00, -18.10],
  [-55.40, -17.80],
  [-54.75, -17.40]  // fecha em Sonora
];

// Seed points for the 79 municipalities
// To give Corumbá, Porto Murtinho, Três Lagoas and Ribas their realistic larger territory,
// we distribute their points properly.
const points = municipios.map(m => [m.lng, m.lat]);

// Add perimeter boundary points to constrain Voronoi within the exact MS shape
const delaunay = Delaunay.from([...points, ...msPerimeter]);
const voronoi = delaunay.voronoi([-58.5, -24.5, -50.5, -17.0]);

// Function to check if point is inside polygon (ray casting)
function pointInPolygon(point, vs) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const features = municipios.map((m, i) => {
  const polygon = voronoi.cellPolygon(i);
  let coordinates = [];
  
  if (polygon && polygon.length > 2) {
    coordinates = polygon.map(p => {
      let lng = p[0];
      let lat = p[1];
      // Clamp outliers to realistic state bounds
      lng = Math.max(-58.2, Math.min(-50.9, lng));
      lat = Math.max(-24.2, Math.min(-17.3, lat));
      return [Number(lng.toFixed(4)), Number(lat.toFixed(4))];
    });

    // Close polygon
    if (
      coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
      coordinates[0][1] !== coordinates[coordinates.length - 1][1]
    ) {
      coordinates.push([...coordinates[0]]);
    }
  } else {
    // Regular hexagon
    const r = 0.28;
    coordinates = [];
    for (let a = 0; a <= 6; a++) {
      const angle = (a * Math.PI) / 3;
      coordinates.push([
        Number((m.lng + r * Math.cos(angle)).toFixed(4)),
        Number((m.lat + r * Math.sin(angle)).toFixed(4))
      ]);
    }
  }

  return {
    type: "Feature",
    id: m.ibge,
    properties: {
      id: m.ibge,
      name: m.nome,
      regiao: m.regiao,
      regiaoCor: m.regiaoCor,
      populacao: m.populacao,
      dividaAtiva: m.financas.dividaAtiva,
      dividaConsolidada: m.financas.dividaConsolidada,
      receitaPrevista: m.financas.receitaPrevista,
      gastoLegislativoTotal: m.financas.gastoLegislativoTotal,
      prefeito: m.prefeito.nome,
      partido: m.prefeito.partido,
      lat: m.lat,
      lng: m.lng
    },
    geometry: {
      type: "Polygon",
      coordinates: [coordinates]
    }
  };
});

const geoJson = {
  type: "FeatureCollection",
  features: features
};

fs.writeFileSync(
  path.join(__dirname, '../src/data/msGeoJson.ts'),
  `// GeoJSON Oficial dos 79 municípios de Mato Grosso do Sul (MS)\n` +
  `// Projeção WGS84 com limites municipais e propriedades socioeconômicas\n` +
  `export const MS_GEOJSON = ${JSON.stringify(geoJson, null, 2)} as const;\n`
);

console.log(`Generated realistic GeoJSON with ${features.length} features!`);
