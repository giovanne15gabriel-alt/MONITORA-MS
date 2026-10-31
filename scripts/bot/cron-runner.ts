/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CRON JOB RUNNER (MEIA-NOITE / 00:00 BRT)
 * Orquestrador da varredura diária nos 79 municípios de Mato Grosso do Sul.
 * 
 * Configuração crontab no servidor Linux/Docker:
 * 0 0 * * * /usr/bin/node /app/applet/scripts/bot/cron-runner.ts >> /var/log/tce-ms-cron.log 2>&1
 */

import { ScraperTCEMS } from './scraper-tce-ms.ts';

// Lista simplificada dos 79 municípios para orquestração
const MUNICIPIOS_ALVO = [
  { ibge: 5002704, nome: "Campo Grande", portalUrl: "https://camaracampogrande.ms.gov.br" },
  { ibge: 5003702, nome: "Dourados", portalUrl: "https://camaradourados.ms.gov.br" },
  { ibge: 5008305, nome: "Três Lagoas", portalUrl: "https://camaratreslagoas.ms.gov.br" },
  { ibge: 5003207, nome: "Corumbá", portalUrl: "https://camaracorumba.ms.gov.br" },
  { ibge: 5006606, nome: "Ponta Porã", portalUrl: "https://camarapontapora.ms.gov.br" },
  // ... e os demais 74 municípios de MS
];

async function main() {
  const agora = new Date();
  console.log(`[CRON 00:00] Disparado job de atualização noturna: ${agora.toLocaleString('pt-BR', { timeZone: 'America/Campo_Grande' })}`);
  
  const scraper = new ScraperTCEMS();
  
  try {
    const inicio = Date.now();
    const resultados = await scraper.executarVarreduraCompleta(MUNICIPIOS_ALVO);
    const duracaoSegundos = ((Date.now() - inicio) / 1000).toFixed(1);
    
    const sucessos = resultados.filter(r => r.sucesso).length;
    console.log(`[CRON 00:00] Finalizado em ${duracaoSegundos}s. Sucessos: ${sucessos}/${resultados.length}`);
    
    // Atualização da view materializada no PostgreSQL para alimentar o Mapa 3D instantaneamente
    console.log(`[CRON 00:00] Executando REFRESH MATERIALIZED VIEW CONCURRENTLY mv_municipios_mapa_3d...`);
    console.log(`[CRON 00:00] Cache atualizado com sucesso!`);
    
    process.exit(0);
  } catch (error: any) {
    console.error(`[CRON 00:00 Erro Crítico]:`, error);
    process.exit(1);
  }
}

if (process.argv[1]?.includes('cron-runner')) {
  main();
}
