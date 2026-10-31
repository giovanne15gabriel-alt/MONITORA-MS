import test from 'node:test';
import assert from 'node:assert/strict';
import { MUNICIPIOS_DATA } from '../data/municipiosData.ts';
import { ELEICOES_2026_MS } from '../data/eleicoes2026Data.ts';
import { DEPUTADOS_FEDERAIS_MS } from '../data/legislativoMsData.ts';
import { TCE_MS_DATA } from '../data/tceMsData.ts';
import { MS_GEOJSON } from '../data/msGeoJson.ts';

test('Municípios dataset contains all 79 municipalities of MS', () => {
  assert.equal(MUNICIPIOS_DATA.length, 79);
});

test('Naviraí has Rodrigo Sakuno as Prefeito and 15 vereadores with correct Mesa Diretora', () => {
  const navirai = MUNICIPIOS_DATA.find(m => m.nome === 'Naviraí');
  assert.ok(navirai, 'Naviraí must exist in dataset');
  assert.equal(navirai.prefeito.nome, 'Rodrigo Sakuno');
  assert.equal(navirai.prefeito.partido, 'PL');
  assert.equal(navirai.camara.totalCadeiras, 15);
  assert.equal(navirai.vereadores.length, 15);

  const presidente = navirai.vereadores.find(v => v.cargo.includes('Presidente'));
  assert.ok(presidente, 'Presidente must exist');
  assert.match(presidente.nome, /Daniel Moretto/i);
  assert.equal(presidente.partido, 'PL');

  const vice = navirai.vereadores.find(v => v.cargo.includes('Vice'));
  assert.ok(vice, 'Vice-Presidente must exist');
  assert.match(vice.nomeUrna, /Mario do Gesso/i);

  const sec1 = navirai.vereadores.find(v => v.cargo.includes('Secretár'));
  assert.ok(sec1, 'Secretária must exist');
});

test('Dourados has Marçal Filho as Prefeito and Liandra Brambilla as Presidente da Câmara', () => {
  const dourados = MUNICIPIOS_DATA.find(m => m.nome === 'Dourados');
  assert.ok(dourados, 'Dourados must exist in dataset');
  assert.equal(dourados.prefeito.nome, 'Marçal Filho');
  assert.equal(dourados.prefeito.partido, 'PSDB');

  const pres = dourados.vereadores.find(v => v.cargo.includes('Presidente'));
  assert.ok(pres, 'Presidente must exist');
  assert.match(pres.nome, /Liandra Brambilla/i);
});

test('Eleições 2026 Federais exact 8 names and parties for 2027-2030 legislature', () => {
  const federais = ELEICOES_2026_MS.deputadosFederaisEleitos;
  assert.equal(federais.length, 8);

  const names = federais.map(d => d.nomeUrna);
  assert.ok(names.includes('Camila Jara'), 'Camila Jara must be included');
  assert.ok(names.includes('Marcos Pollon'), 'Marcos Pollon must be included');
  assert.ok(names.includes('Rose Modesto'), 'Rose Modesto must be included');
  assert.ok(names.includes('Mara Caseiro'), 'Mara Caseiro must be included');
  assert.ok(names.includes('Rodolfo Nogueira'), 'Rodolfo Nogueira must be included');
  assert.ok(names.includes('Beto Pereira'), 'Beto Pereira must be included');
  assert.ok(names.includes('Isa Marcondes'), 'Isa Marcondes must be included');
  assert.ok(names.includes('Dagoberto Nogueira'), 'Dagoberto Nogueira must be included');

  // Verify parties requested by user
  const camila = federais.find(d => d.nomeUrna === 'Camila Jara');
  assert.equal(camila?.partido, 'PT');

  const pollon = federais.find(d => d.nomeUrna === 'Marcos Pollon');
  assert.equal(pollon?.partido, 'PL');

  const rose = federais.find(d => d.nomeUrna === 'Rose Modesto');
  assert.equal(rose?.partido, 'União');

  const mara = federais.find(d => d.nomeUrna === 'Mara Caseiro');
  assert.equal(mara?.partido, 'PL');

  const rodolfo = federais.find(d => d.nomeUrna === 'Rodolfo Nogueira');
  assert.equal(rodolfo?.partido, 'PL');

  const beto = federais.find(d => d.nomeUrna === 'Beto Pereira');
  assert.equal(beto?.partido, 'Republicanos');

  const isa = federais.find(d => d.nomeUrna === 'Isa Marcondes');
  assert.equal(isa?.partido, 'Republicanos');

  const dago = federais.find(d => d.nomeUrna === 'Dagoberto Nogueira');
  assert.equal(dago?.partido, 'PP');
});

test('Senado 2026 renewal contains Tereza Cristina, Reinaldo Azambuja and Nelsinho Trad', () => {
  const senadores = ELEICOES_2026_MS.senadoresEleitos;
  assert.ok(senadores.length >= 2);
  const names = senadores.map(s => s.nomeUrna);
  assert.ok(names.includes('Reinaldo Azambuja'));
});

test('TCE-MS data is populated with Conselheiro Presidente Jerson Domingos and LRF indicators', () => {
  assert.match(TCE_MS_DATA.presidente, /Jerson Domingos/i);
  assert.ok(TCE_MS_DATA.orcamentoTotalAnual > 300000000);
  assert.ok(TCE_MS_DATA.gastoPessoalPercentual > 60);
  assert.ok(TCE_MS_DATA.conselheiros.length >= 3);
});

test('MS_GEOJSON geographic bounds conform to authentic Mato Grosso do Sul borders', () => {
  assert.equal(MS_GEOJSON.features.length, 79);

  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  MS_GEOJSON.features.forEach(f => {
    f.geometry.coordinates[0].forEach(pt => {
      if (pt[0] < minLng) minLng = pt[0];
      if (pt[0] > maxLng) maxLng = pt[0];
      if (pt[1] < minLat) minLat = pt[1];
      if (pt[1] > maxLat) maxLat = pt[1];
    });
  });

  // MS is located between -58.2 and -50.9 West Longitude, and -24.1 and -17.1 South Latitude
  assert.ok(minLng <= -57.5, 'MS west boundary must reach Pantanal/Bolivia border');
  assert.ok(maxLng >= -51.5, 'MS east boundary must reach Parana river border');
  assert.ok(minLat <= -23.8, 'MS south boundary must reach Cone Sul border');
  assert.ok(maxLat >= -17.5, 'MS north boundary must reach northern tip');
});

test('Jardim has Juliano Miranda (Guga) as Prefeito and Tereza Moreira as Presidente da Câmara', () => {
  const jardim = MUNICIPIOS_DATA.find(m => m.nome === 'Jardim');
  assert.ok(jardim, 'Jardim must exist in dataset');
  assert.match(jardim.prefeito.nome, /Juliano Miranda/i);
  assert.equal(jardim.prefeito.partido, 'PSDB');
  assert.equal(jardim.camara.totalCadeiras, 11);
  assert.equal(jardim.vereadores.length, 11);

  const pres = jardim.vereadores.find(v => v.cargo.includes('Presidente'));
  assert.ok(pres, 'Presidente must exist');
  assert.match(pres.nome, /Tereza Moreira/i);
  assert.equal(pres.partido, 'PSDB');

  // Verify mayor is NOT duplicated in vereadores
  const dupe = jardim.vereadores.find(v => v.nome.toLowerCase().includes('juliano miranda') || v.nome.toLowerCase().includes('guga'));
  assert.equal(dupe, undefined, 'Mayor Juliano Miranda must not be in vereadores list');
});

test('No municipality has its Prefeito duplicated in its Vereadores list across all 79 cities', () => {
  for (const m of MUNICIPIOS_DATA) {
    const mayor = m.prefeito.nome.toLowerCase().trim();
    for (const v of m.vereadores) {
      assert.notEqual(
        v.nome.toLowerCase().trim(),
        mayor,
        `Prefeito ${m.prefeito.nome} must not appear as vereador in ${m.nome}`
      );
    }
  }
});

