/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal de Fontes Oficiais & SEBRAE
 * Baseado no Banco de Dados Triado e Validado de Mato Grosso do Sul (PDF / DataSebrae)
 */

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Database, 
  Globe, 
  Landmark, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Tractor, 
  Plane, 
  Search,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';

interface FontesOficiaisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FonteItem {
  id: string;
  categoria: string;
  titulo: string;
  orgao: string;
  descricao: string;
  serieHistorica: string;
  url: string;
  destaque?: boolean;
}

const FONTES_MS: FonteItem[] = [
  // SEBRAE & Empreendedorismo
  {
    id: 'sebrae-data',
    categoria: 'Empreendedorismo & SEBRAE',
    titulo: 'DataSebrae MS - DataCidade',
    orgao: 'SEBRAE / MS',
    descricao: 'Painel oficial municipalizado com dados de empresas ativas, empregos formais, tempo de abertura e taxa de sobrevivência dos negócios nos 79 municípios de MS.',
    serieHistorica: '1931 - 2026',
    url: 'http://datasebrae.com.br/ms-data-cidade/',
    destaque: true
  },
  {
    id: 'rfb-mapa',
    categoria: 'Empreendedorismo & SEBRAE',
    titulo: 'Mapa de Empresas & Receita Federal',
    orgao: 'Ministério do Desenvolvimento / RFB',
    descricao: 'Tempo médio de abertura de empresas em horas, viabilidade locacional e contagem de CNPJs ativos.',
    serieHistorica: '1931 - 2025',
    url: 'https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/painel-mapa-de-empresas'
  },
  {
    id: 'mte-caged',
    categoria: 'Empreendedorismo & SEBRAE',
    titulo: 'Novo CAGED & RAIS',
    orgao: 'Ministério do Trabalho e Emprego (MTE)',
    descricao: 'Estatísticas de admissões, demissões, saldo líquido de empregos formais com carteira e massa salarial por município.',
    serieHistorica: '2012 - 2025',
    url: 'https://bi.mte.gov.br/bgcaged/login.php'
  },
  {
    id: 'jucems-portal',
    categoria: 'Empreendedorismo & SEBRAE',
    titulo: 'JUCEMS - Junta Comercial de MS',
    orgao: 'Governo do Estado de MS / JUCEMS',
    descricao: 'Registro e integração da RedeSim em Mato Grosso do Sul para abertura e alteração de empresas.',
    serieHistorica: 'Tempo Real',
    url: 'https://www.jucems.ms.gov.br/'
  },

  // Poder Público & Fiscal
  {
    id: 'tce-ms',
    categoria: 'Poder Público & Fiscal',
    titulo: 'Portal do Cidadão TCE-MS',
    orgao: 'Tribunal de Contas de Mato Grosso do Sul',
    descricao: 'Auditorias das contas dos 79 municípios, dívida ativa, dívida consolidada, despesas com pessoal (LRF) e alertas fiscais.',
    serieHistorica: 'Série Histórica Contínua',
    url: 'https://www.tce.ms.gov.br/portal-cidadao/',
    destaque: true
  },
  {
    id: 'tesouro-capag',
    categoria: 'Poder Público & Fiscal',
    titulo: 'CAPAG - Capacidade de Pagamento Municipal',
    orgao: 'Secretaria do Tesouro Nacional (STN)',
    descricao: 'Classificação de risco fiscal (Notas A, B e C) que mede a aptidão de cada prefeitura para honrar dívidas e captar financiamentos com garantia da União.',
    serieHistorica: '2019 - 2025',
    url: 'https://www.tesourotransparente.gov.br/ckan/dataset/capag-municipios'
  },
  {
    id: 'tesouro-endividamento',
    categoria: 'Poder Público & Fiscal',
    titulo: 'Painel de Endividamento dos Entes Subnacionais',
    orgao: 'Tesouro Transparente',
    descricao: 'Relatórios de Gestão Fiscal (RGF), dívida consolidada líquida e operações de crédito de MS.',
    serieHistorica: '2016 - 2024',
    url: 'https://www.tesourotransparente.gov.br/'
  },
  {
    id: 'gov-transparencia',
    categoria: 'Poder Público & Fiscal',
    titulo: 'Portal da Transparência do Governo de MS',
    orgao: 'Governo do Estado de Mato Grosso do Sul',
    descricao: 'Execução orçamentária das 12 secretarias estaduais, folha de servidores e repasses aos municípios.',
    serieHistorica: '2020 - 2026',
    url: 'https://www.transparencia.ms.gov.br/'
  },

  // Legislativo & Eleições
  {
    id: 'alems-transp',
    categoria: 'Poder Legislativo & Eleições',
    titulo: 'Transparência ALEMS',
    orgao: 'Assembleia Legislativa de MS',
    descricao: 'Gastos da Cota para Exercício da Atividade Parlamentar (CEAP), subsídios e remunerações dos 24 deputados estaduais de MS.',
    serieHistorica: 'Legislaturas ALEMS',
    url: 'https://transparencia.al.ms.leg.br/',
    destaque: true
  },
  {
    id: 'camara-dep-federais',
    categoria: 'Poder Legislativo & Eleições',
    titulo: 'Dados Abertos da Câmara dos Deputados',
    orgao: 'Câmara dos Deputados (Brasília - DF)',
    descricao: 'Notas fiscais da cota parlamentar (CEAP), verba de gabinete, secretários contratados e projetos da bancada de MS.',
    serieHistorica: '57ª e 58ª Legislaturas',
    url: 'https://www.camara.leg.br/transparencia'
  },
  {
    id: 'senado-transp',
    categoria: 'Poder Legislativo & Eleições',
    titulo: 'Transparência do Senado Federal',
    orgao: 'Senado Federal',
    descricao: 'Contas, verbas indenizatórias e atuação parlamentar dos senadores representantes de Mato Grosso do Sul.',
    serieHistorica: 'Mandato Oito Anos',
    url: 'https://www.senado.leg.br/transparencia/'
  },
  {
    id: 'tse-divulgacand',
    categoria: 'Poder Legislativo & Eleições',
    titulo: 'TSE DivulgaCandContas & Resultados',
    orgao: 'Tribunal Superior Eleitoral',
    descricao: 'Declarações de bens, prestação de contas de campanha, votação nominal e certidões dos candidatos eleitos em MS.',
    serieHistorica: 'Eleições 2024 / 2026',
    url: 'https://divulgacandcontas.tse.jus.br/'
  },

  // Demográficos & Sociais
  {
    id: 'ibge-pop',
    categoria: 'Demografia & Dinamismo',
    titulo: 'IBGE Cidades & Estimativas Populacionais',
    orgao: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    descricao: 'População recenseada (Censo 2022 / estimativas 2024), pirâmide etária e perfil territorial de cada município sul-mato-grossense.',
    serieHistorica: '2001 - 2024',
    url: 'https://cidades.ibge.gov.br/brasil/ms'
  },
  {
    id: 'ibge-pib',
    categoria: 'Demografia & Dinamismo',
    titulo: 'PIB dos Municípios e PIB per capita',
    orgao: 'IBGE Contas Regionais',
    descricao: 'Valor adicionado bruto da agropecuária, indústria, serviços e renda média por habitante em MS.',
    serieHistorica: '1999 - 2023',
    url: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html'
  },
  {
    id: 'comex-stat',
    categoria: 'Demografia & Dinamismo',
    titulo: 'ComexStat - Balança Comercial Municipal',
    orgao: 'MDIC / Secretaria de Comércio Exterior',
    descricao: 'Exportações de soja, celulose, carne bovina e milho por município embarcador no Mato Grosso do Sul.',
    serieHistorica: '1997 - 2025',
    url: 'https://comexstat.mdic.gov.br/pt/home'
  },
  {
    id: 'pnud-idhm',
    categoria: 'Demografia & Dinamismo',
    titulo: 'Painel IDHM (Índice de Desenvolvimento Humano)',
    orgao: 'PNUD Brasil / IPEA',
    descricao: 'Dimensões de longevidade, educação e renda para todos os municípios do estado.',
    serieHistorica: 'Série Intercensitária',
    url: 'https://www.undp.org/pt/brazil/desenvolvimento-humano/painel-idhm'
  },

  // Saúde, Educação e Agro
  {
    id: 'datasus-cnes',
    categoria: 'Saúde, Educação & Agro',
    titulo: 'DATASUS / CNES - Infraestrutura Hospitalar',
    orgao: 'Ministério da Saúde',
    descricao: 'Cadastro de leitos clínicos, UTI, profissionais de saúde e estabelecimentos conveniados ao SUS no MS.',
    serieHistorica: '2012 - 2025',
    url: 'https://cnes2.datasus.gov.br/'
  },
  {
    id: 'inep-qedu',
    categoria: 'Saúde, Educação & Agro',
    titulo: 'INEP / Censo Escolar & QEdu MS',
    orgao: 'INEP / MEC',
    descricao: 'Índice de Desenvolvimento da Educação Básica (IDEB), taxas de aprovação e distorção idade-série em MS.',
    serieHistorica: '1995 - 2024',
    url: 'https://qedu.org.br/uf/50-mato-grosso-do-sul'
  },
  {
    id: 'sinis-saneamento',
    categoria: 'Saúde, Educação & Agro',
    titulo: 'SINIS - Sistema Nacional de Saneamento',
    orgao: 'Ministério das Cidades / ANA',
    descricao: 'Índices de atendimento de água tratada, coleta de esgoto e perda na distribuição nos municípios do MS.',
    serieHistorica: '1979 - 2023',
    url: 'https://app4.mdr.gov.br/serieHistorica/'
  },
  {
    id: 'cadastur-turismo',
    categoria: 'Saúde, Educação & Agro',
    titulo: 'CADASTUR & Observatório do Turismo MS',
    orgao: 'SECTUR / Fundação de Turismo de MS',
    descricao: 'Empresas turísticas registradas, fluxo de visitantes no Pantanal e Bonito/Serra da Bodoquena.',
    serieHistorica: '2021 - 2024',
    url: 'https://www.semadesc.ms.gov.br/'
  }
];

export const FontesOficiaisModal: React.FC<FontesOficiaisModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  if (!isOpen) return null;

  const categories = ['todas', 'Empreendedorismo & SEBRAE', 'Poder Público & Fiscal', 'Poder Legislativo & Eleições', 'Demografia & Dinamismo', 'Saúde, Educação & Agro'];

  const filteredFontes = FONTES_MS.filter(f => {
    const matchCategory = selectedCategory === 'todas' || f.categoria === selectedCategory;
    const matchSearch = f.titulo.toLowerCase().includes(search.toLowerCase()) ||
                        f.orgao.toLowerCase().includes(search.toLowerCase()) ||
                        f.descricao.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <header className="px-6 py-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Fontes Primárias Governamentais & SEBRAE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Banco de Dados Triados e Validados de Mato Grosso do Sul
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Consolidação das bases oficiais com links diretos para auditoria dos 79 municípios, poderes e parlamentares.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shadow-sm shrink-0"
            title="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Filter and Category Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por fonte, órgão ou indicador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat === 'todas' ? 'Todas as Fontes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sources Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFontes.map((fonte) => (
              <div
                key={fonte.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  fonte.destaque 
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-cyan-800/60 shadow-lg' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700/60">
                      {fonte.categoria}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {fonte.serieHistorica}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {fonte.titulo}
                  </h3>
                  <div className="text-xs text-emerald-400 font-medium mb-2.5">
                    Órgão: {fonte.orgao}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {fonte.descricao}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Fonte Oficial Validada
                  </span>

                  <a
                    href={fonte.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-xs font-semibold text-white transition-all shadow-md group"
                  >
                    <span>Acessar Portal Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredFontes.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-sm">
              Nenhuma fonte encontrada com o termo "{search}".
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Dados consolidados em conformidade com a Lei de Acesso à Informação (Lei nº 12.527/2011) e LRF</span>
          </div>

          <a
            href="http://datasebrae.com.br/ms-data-cidade/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>Ver perfil completo no DataSebrae MS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </footer>

      </div>
    </div>
  );
};
