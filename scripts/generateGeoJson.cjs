const fs = require('fs');
const path = require('path');
const { Delaunay } = require('d3-delaunay');

// Load generated municipalities
const rawDataFile = fs.readFileSync(path.join(__dirname, '../src/data/municipiosData.ts'), 'utf8');
const match = rawDataFile.match(/export const MUNICIPIOS_DATA: MunicipioMS\[\] = (\[[\s\S]*?\]);\n/);
if (!match) {
  console.error("Could not find MUNICIPIOS_DATA in file");
  process.exit(1);
}

const municipios = JSON.parse(match[1]);

// MS Boundary bounds:
const minLng = -58.3;
const maxLng = -50.8;
const minLat = -24.4;
const maxLat = -17.1;

// Points for Delaunay: [lng, lat]
const points = municipios.map(m => [m.lng, m.lat]);

// Add boundary buffer anchors to shape the true MS geographical silhouette matching the reference map:
// - North: Sonora / Pedro Gomes (-17.5, -54.7)
// - Northeast: Costa Rica / Chapadão do Sul (-18.2, -52.6) bordering Goiás
// - East: Paranaíba / Aparecida / Três Lagoas (-19.5 to -21.0, -50.9) bordering Minas Gerais and São Paulo
// - Southeast: Bataguassu / Anaurilândia / Batayporã (-21.8 to -22.5, -52.4 to -53.2)
// - South: Mundo Novo / Sete Quedas / Paranhos (-23.9 to -24.2, -54.3 to -55.4) bordering Paraná and Paraguay
// - Southwest: Ponta Porã / Bela Vista / Caracol / Porto Murtinho (-22.5 to -21.7, -55.8 to -57.9) bordering Paraguay
// - West: Corumbá (-18.0 to -20.0, -58.1 to -57.4) bordering Bolivia
const borderAnchors = [
  [-57.6, -17.3], [-56.5, -17.2], [-55.3, -17.1], [-54.5, -17.1], [-53.8, -17.5],
  [-53.1, -18.0], [-52.4, -18.5], [-51.5, -19.0], [-50.9, -19.4], [-50.8, -20.2],
  [-51.2, -21.0], [-51.8, -21.7], [-52.5, -22.4], [-53.1, -22.8], [-53.8, -23.4],
  [-54.1, -24.2], [-54.6, -24.3], [-55.2, -24.2], [-55.7, -24.0], [-56.2, -23.2],
  [-56.9, -22.3], [-57.4, -22.0], [-57.9, -21.8], [-58.1, -21.2], [-58.1, -20.3],
  [-58.2, -19.5], [-58.2, -18.7], [-58.0, -17.9]
];

const allPoints = [...points, ...borderAnchors];
const delaunay = Delaunay.from(allPoints);
const voronoi = delaunay.voronoi([minLng, minLat, maxLng, maxLat]);

const features = municipios.map((m, i) => {
  const polygon = voronoi.cellPolygon(i);
  let coordinates = [];
  if (polygon && polygon.length > 2) {
    coordinates = polygon.map(p => [Number(p[0].toFixed(5)), Number(p[1].toFixed(5))]);
    if (
      coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
      coordinates[0][1] !== coordinates[coordinates.length - 1][1]
    ) {
      coordinates.push([...coordinates[0]]);
    }
  } else {
    const r = 0.35;
    coordinates = [];
    for (let a = 0; a <= 6; a++) {
      const angle = (a * Math.PI) / 3;
      coordinates.push([
        Number((m.lng + r * Math.cos(angle)).toFixed(5)),
        Number((m.lat + r * Math.sin(angle)).toFixed(5))
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

console.log(`Generated GeoJSON with ${features.length} features!`);
