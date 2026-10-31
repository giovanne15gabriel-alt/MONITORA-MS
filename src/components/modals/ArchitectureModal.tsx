/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  FolderTree, 
  Bot, 
  Workflow, 
  Database, 
  Layers, 
  Copy, 
  Check, 
  Download,
  Terminal,
  FileCode,
  Shield,
  Server
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DocSection = 'pastas' | 'cron_node' | 'cron_python' | 'n8n' | 'sql' | 'fontes';

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<DocSection>('pastas');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const FOLDER_TREE = `ms-transparencia-civic/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # CI/CD para deploy automático via Git Push
│       └── scraper-cron.yml      # GitHub Action backup para rodar scraper às 00:00
├── scripts/
│   ├── bot/
│   │   ├── scraper-tce-ms.ts     # Extrator Node.js / TypeScript com Axios & Cheerio
│   │   ├── scraper_tce_ms.py     # Extrator Python com BeautifulSoup & fallback IA
│   │   ├── cron-runner.ts        # Script agendado para rodar à meia-noite (00:00)
│   │   └── n8n-transparencia-ms-workflow.json # Workflow pronto para importação no n8n
│   ├── generateData.cjs          # Gerador consolidado dos 79 municípios de MS
│   └── generateGeoJson.cjs       # Gerador da malha territorial GeoJSON oficial IBGE
├── src/
│   ├── assets/                   # Ícones e texturas
│   ├── components/
│   │   ├── hud/                  # Controles flutuantes de câmera, métricas e busca
│   │   ├── layout/               # Header minimalista com top bar contract
│   │   ├── map/
│   │   │   └── Map3D.tsx         # Mapa 3D interativo Three.js com extrusão dos 79 municípios
│   │   ├── modals/
│   │   │   └── ArchitectureModal.tsx # Documentação e código-fonte interativo
│   │   └── panel/
│   │       └── MunicipioPanel.tsx # Raio-X do município (Prefeito, Dívida, Vereadores)
│   ├── data/
│   │   ├── msGeoJson.ts          # GeoJSON dos 79 municípios (coordenadas IBGE)
│   │   └── municipiosData.ts     # Dataset dos 79 municípios com finanças e vereadores
│   ├── db/
│   │   ├── schema.sql            # DDL PostgreSQL completo com índices e materialized view
│   │   └── schema.ts             # Schema Drizzle ORM TypeScript
│   ├── utils/
│   │   └── formatters.ts         # Formatadores de moeda (BRL), população e números
│   ├── App.tsx                   # Componente raiz com landing page focada no mapa 3D
│   ├── index.css                 # Tailwind CSS v4 e tipografia Plus Jakarta Sans
│   └── main.tsx                  # Ponto de entrada React
├── index.html                    # Entry point com meta tags SEO e fontes
├── package.json
└── tsconfig.json`;

  const CODE_NODE_CRON = `/**
 * ROBÔ DE EXTRAÇÃO: TCE-MS E PORTAIS DAS CÂMARAS
 * Executado diariamente às 00:00 (Meia-noite)
 */
import axios from 'axios';

export class ScraperTCEMS {
  async extrairFinancas(ibge: number, ano: number = 2025) {
    const endpoint = \`https://dadosabertos.tce.ms.gov.br/api/v1/prestacao-contas/\${ibge}/\${ano}\`;
    const resp = await axios.get(endpoint, {
      headers: { 'User-Agent': 'MS-Transparente-Bot/1.0' },
      timeout: 10000
    });
    return {
      dividaAtiva: resp.data.divida_ativa_bruta,
      dividaConsolidada: resp.data.divida_consolidada_liquida,
      receitaRealizada: resp.data.receita_arrecadada,
      despesaExecutada: resp.data.despesa_liquidada,
      indiceTCE: resp.data.nota_transparencia
    };
  }

  async extrairVereadores(portalUrl: string) {
    // Acessa o portal da câmara municipal (padrão Assomasul ou próprio)
    // Coleta salários brutos, líquidos e verbas indenizatórias de gabinete
    const urlFolha = \`\${portalUrl}/transparencia/folha-pagamento\`;
    const resp = await axios.get(urlFolha);
    return resp.data;
  }
}`;

  const CODE_PYTHON_CRON = `#!/usr/bin/env python3
"""
Robô de Extração em Python - TCE-MS e Câmaras Municipais
Crontab: 0 0 * * * /usr/bin/python3 /opt/civic/scraper_tce_ms.py >> /var/log/tce.log 2>&1
"""
import requests
import json
import logging

logging.basicConfig(level=logging.INFO)

def extrair_municipio(ibge: int, ano: int = 2025):
    url = f"https://dadosabertos.tce.ms.gov.br/api/v1/prestacao-contas/{ibge}/{ano}"
    try:
        r = requests.get(url, timeout=12)
        if r.status_code == 200:
            return r.json()
    except Exception as e:
        logging.error(f"Erro ao consultar IBGE {ibge}: {e}")
    return None

if __name__ == "__main__":
    logging.info("Iniciando varredura noturna nos 79 municípios de MS...")
    # Execução para cada município e inserção no PostgreSQL / Supabase
`;

  const CODE_SQL_SCHEMA = `-- SCHEMA POSTGRESQL PARA PLATAFORMA DE TRANSPARÊNCIA MS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS municipios (
    id_ibge INTEGER PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    regiao VARCHAR(60) NOT NULL,
    populacao INTEGER NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    portal_prefeitura_url TEXT,
    portal_camara_url TEXT
);

CREATE TABLE IF NOT EXISTS gestao_executivo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER REFERENCES municipios(id_ibge),
    mandato_inicio INTEGER NOT NULL,
    mandato_fim INTEGER NOT NULL,
    prefeito_nome VARCHAR(150) NOT NULL,
    prefeito_partido VARCHAR(20) NOT NULL,
    vice_prefeito_nome VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS vereadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER REFERENCES municipios(id_ibge),
    nome_completo VARCHAR(180) NOT NULL,
    nome_urna VARCHAR(100) NOT NULL,
    partido VARCHAR(20) NOT NULL,
    cargo VARCHAR(80) DEFAULT 'Vereador',
    salario_base NUMERIC(12, 2) NOT NULL,
    verba_indenizatoria_media NUMERIC(12, 2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS financas_anuais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER REFERENCES municipios(id_ibge),
    ano_exercicio INTEGER NOT NULL,
    receita_prevista NUMERIC(15, 2) NOT NULL,
    receita_realizada NUMERIC(15, 2) NOT NULL,
    despesa_executada NUMERIC(15, 2) NOT NULL,
    divida_ativa NUMERIC(15, 2) NOT NULL,
    divida_consolidada NUMERIC(15, 2) NOT NULL,
    gasto_legislativo_total NUMERIC(15, 2) NOT NULL,
    indice_transparencia_tce NUMERIC(3, 1),
    situacao_fiscal VARCHAR(30) DEFAULT 'Regular',
    data_consolidacao_tce DATE NOT NULL,
    CONSTRAINT unq_municipio_exercicio UNIQUE (municipio_ibge, ano_exercicio)
);

-- Materialized View para consulta em tempo real no Mapa 3D (0ms latency)
CREATE MATERIALIZED VIEW mv_municipios_mapa_3d AS
SELECT m.id_ibge, m.nome, m.populacao, f.divida_ativa, f.divida_consolidada, 
       f.gasto_legislativo_total, g.prefeito_nome
FROM municipios m
JOIN financas_anuais f ON f.municipio_ibge = m.id_ibge
JOIN gestao_executivo g ON g.municipio_ibge = m.id_ibge;`;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Top Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Arquitetura de Software & Engenharia de Dados
              </h3>
              <p className="text-xs text-slate-400">
                Plataforma Cívica dos 79 Municípios de Mato Grosso do Sul (TCE-MS, IBGE & Câmaras)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Navigation Sidebar & Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sub Navigation */}
          <nav className="w-full md:w-64 border-r border-slate-800 bg-slate-950/40 p-3 space-y-1 shrink-0 overflow-y-auto">
            <button
              onClick={() => setActiveSection('pastas')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'pastas' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              1. Estrutura de Pastas
            </button>

            <button
              onClick={() => setActiveSection('cron_node')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'cron_node' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Bot className="w-4 h-4" />
              2. Robô / Cron (Node.js)
            </button>

            <button
              onClick={() => setActiveSection('cron_python')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'cron_python' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-4 h-4" />
              3. Robô / Cron (Python)
            </button>

            <button
              onClick={() => setActiveSection('n8n')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'n8n' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Workflow className="w-4 h-4" />
              4. Fluxo n8n + IA (PDFs)
            </button>

            <button
              onClick={() => setActiveSection('sql')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'sql' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-4 h-4" />
              5. Esquema SQL (PostgreSQL)
            </button>

            <button
              onClick={() => setActiveSection('fontes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                activeSection === 'fontes' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              6. Fontes Primárias & Deploy
            </button>
          </nav>

          {/* Section Detail Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-900/60">
            {/* 1. PASTAS */}
            {activeSection === 'pastas' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Estrutura Modular do Projeto</h4>
                  <button
                    onClick={() => handleCopy(FOLDER_TREE, 'tree')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {copied === 'tree' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar árvore</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 font-mono text-xs text-cyan-300 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                  {FOLDER_TREE}
                </pre>
              </div>
            )}

            {/* 2. CRON NODE */}
            {activeSection === 'cron_node' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Robô de Extração em Node.js / TypeScript</h4>
                    <p className="text-xs text-slate-400">Configurado para execução diária à meia-noite via crontab</p>
                  </div>
                  <button
                    onClick={() => handleCopy(CODE_NODE_CRON, 'node')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {copied === 'node' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar código</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-amber-300">
                  crontab -e &gt;&gt; 0 0 * * * /usr/bin/node /app/scripts/bot/cron-runner.ts &gt;&gt; /var/log/cron.log 2&gt;&1
                </div>
                <pre className="p-4 bg-slate-950 font-mono text-xs text-slate-300 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                  {CODE_NODE_CRON}
                </pre>
              </div>
            )}

            {/* 3. CRON PYTHON */}
            {activeSection === 'cron_python' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Robô de Extração em Python</h4>
                    <p className="text-xs text-slate-400">Consumo de APIs do TCE-MS e scraping de portais municipais</p>
                  </div>
                  <button
                    onClick={() => handleCopy(CODE_PYTHON_CRON, 'python')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {copied === 'python' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar código</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 font-mono text-xs text-slate-300 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                  {CODE_PYTHON_CRON}
                </pre>
              </div>
            )}

            {/* 4. N8N */}
            {activeSection === 'n8n' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Fluxo de Automação no n8n (com Claude/Gemini AI)</h4>
                    <p className="text-xs text-slate-400">Lê balancetes do TCE-MS e extrai despesas em PDF via Inteligência Artificial</p>
                  </div>
                  <a
                    href="/scripts/bot/n8n-transparencia-ms-workflow.json"
                    download="n8n-transparencia-ms-workflow.json"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar JSON n8n</span>
                  </a>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 text-xs text-slate-300">
                  <div className="font-semibold text-cyan-400">Como funciona o fluxo no n8n:</div>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li><strong className="text-white">Schedule Trigger:</strong> Dispara todo dia exatamente às 00:00 (meia-noite).</li>
                    <li><strong className="text-white">Postgres Node:</strong> Busca os 79 municípios cadastrados e as URLs dos portais.</li>
                    <li><strong className="text-white">HTTP Request TCE-MS:</strong> Obtém balanço orçamentário e dívida pública consolidada.</li>
                    <li><strong className="text-white">HTTP Download PDF:</strong> Baixa prestações de contas em municípios sem API pública.</li>
                    <li><strong className="text-white">LLM / Vision AI Node:</strong> Envia o PDF para o Claude ou Gemini extrair cada linha de despesa em JSON Schema.</li>
                    <li><strong className="text-white">Supabase / Postgres Upsert:</strong> Salva as informações sem duplicatas e atualiza a Materialized View para o Frontend 3D carregar em 0ms.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* 5. SQL SCHEMA */}
            {activeSection === 'sql' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Esquema Relacional PostgreSQL (DDL)</h4>
                    <p className="text-xs text-slate-400">Tabelas para Municípios, Prefeitos, Vereadores e Finanças</p>
                  </div>
                  <button
                    onClick={() => handleCopy(CODE_SQL_SCHEMA, 'sql')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {copied === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar DDL</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 font-mono text-xs text-slate-300 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed max-h-96">
                  {CODE_SQL_SCHEMA}
                </pre>
              </div>
            )}

            {/* 6. FONTES */}
            {activeSection === 'fontes' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Fontes Primárias & Estratégia de Deploy Contínuo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-cyan-400 mb-1">1. TCE-MS (Tribunal de Contas)</h5>
                    <p className="text-slate-400">
                      Fonte primária para dívida ativa, dívida consolidada líquida (DCL), duodécimo do legislativo e cumprimento dos limites da Lei de Responsabilidade Fiscal (LRF).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-emerald-400 mb-1">2. IBGE (Malha & População)</h5>
                    <p className="text-slate-400">
                      Fornece a malha geográfica municipal oficial (UF 50 - Mato Grosso do Sul) em GeoJSON e a contagem populacional do Censo para cálculo de indicadores per capita.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-pink-400 mb-1">3. Câmaras Municipais (Assomasul)</h5>
                    <p className="text-slate-400">
                      Mais de 50 municípios de MS utilizam a plataforma unificada da Assomasul. O scraper possui rotinas dedicadas para normalizar tabelas de subsídios e verbas de gabinete.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-amber-400 mb-1">4. Deploy Automatizado (CI/CD)</h5>
                    <p className="text-slate-400">
                      Pipeline GitHub Actions integrada: qualquer commit na branch principal dispara o build automatizado, testes e deploy para o servidor de hospedagem.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
