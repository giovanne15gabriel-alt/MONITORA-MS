/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DADOS PÚBLICOS CONSOLIDADOS DO TRIBUNAL DE CONTAS DO ESTADO DE MATO GROSSO DO SUL (TCE-MS)
 * Fonte: Portal da Transparência do TCE-MS e Diário Oficial Eletrônico (DOE-TCE-MS)
 */

export interface ConselheiroTCE {
  id: string;
  nome: string;
  cargo: string;
  dataPosse: string;
  subsidioBruto: number;
  subsidioLiquidoMedio: number;
  formacao: string;
  biografiaBreve: string;
}

export interface GastoCategoriaTCE {
  categoria: string;
  valorAnual: number;
  percentual: number;
  descricao: string;
}

export interface DadosTCE_MS {
  anoExercicio: number;
  presidente: string;
  vicePresidente: string;
  corregedorGeral: string;
  orcamentoTotalAnual: number;
  gastoPessoalPercentual: number;
  custoPorHabitanteMS: number;
  totalServidores: {
    efetivosConcursados: number;
    comissionados: number;
    auditoresSubstitutos: number;
    procuradoresMPC: number;
    estagiarios: number;
  };
  conselheiros: ConselheiroTCE[];
  procuradoresMPC: {
    nome: string;
    cargo: string;
    subsidioBruto: number;
  }[];
  distribuicaoDespesas: GastoCategoriaTCE[];
  indicadoresFiscalizacao: {
    prestacoesContasAnalisadas: number;
    municipiosSobJurisdicao: number;
    orgaosEstaduaisFiscalizados: number;
    multasImputadasAnoMilhoes: number;
    impugnacoesPreservadasMilhoes: number;
  };
  portalTransparenciaUrl: string;
  diarioOficialUrl: string;
}

export const TCE_MS_DATA: DadosTCE_MS = {
  anoExercicio: 2026,
  presidente: "Conselheiro Jerson Domingos",
  vicePresidente: "Conselheiro Flávio Kayatt",
  corregedorGeral: "Conselheiro Osmar Domingues Jeronymo",
  orcamentoTotalAnual: 384500000, // R$ 384,5 milhões (Duodécimo repassado pelo Estado)
  gastoPessoalPercentual: 74.2, // ~74% destinado a folha de pessoal ativo, inativo e encargos
  custoPorHabitanteMS: 135.80, // Custo do TCE-MS por cidadão sul-mato-grossense ao ano
  totalServidores: {
    efetivosConcursados: 428,
    comissionados: 165,
    auditoresSubstitutos: 7,
    procuradoresMPC: 4,
    estagiarios: 85
  },
  conselheiros: [
    {
      id: "c1",
      nome: "Jerson Domingos",
      cargo: "Conselheiro Presidente",
      dataPosse: "19/01/2015",
      subsidioBruto: 41845.49,
      subsidioLiquidoMedio: 29850.00,
      formacao: "Administração e Gestão Pública",
      biografiaBreve: "Ex-deputado estadual e presidente da Assembleia Legislativa de MS (ALEMS), atual Presidente do Tribunal de Contas."
    },
    {
      id: "c2",
      nome: "Flávio Esgaib Kayatt",
      cargo: "Conselheiro Vice-Presidente",
      dataPosse: "10/11/2017",
      subsidioBruto: 41845.49,
      subsidioLiquidoMedio: 29850.00,
      formacao: "Farmácia e Bioquímica / Gestão Pública",
      biografiaBreve: "Ex-prefeito de Ponta Porã por dois mandatos e ex-deputado estadual, atual Vice-Presidente do TCE-MS."
    },
    {
      id: "c3",
      nome: "Osmar Domingues Jeronymo",
      cargo: "Conselheiro Corregedor-Geral",
      dataPosse: "25/08/2015",
      subsidioBruto: 41845.49,
      subsidioLiquidoMedio: 29850.00,
      formacao: "Direito",
      biografiaBreve: "Ex-secretário de Estado da Casa Civil do Governo de MS e Corregedor-Geral da Corte de Contas."
    },
    {
      id: "c4",
      nome: "Marcio Monteiro",
      cargo: "Conselheiro Titular",
      dataPosse: "22/11/2017",
      subsidioBruto: 41845.49,
      subsidioLiquidoMedio: 29850.00,
      formacao: "Medicina Veterinária / Direito",
      biografiaBreve: "Ex-secretário de Fazenda de MS (SEFAZ), ex-deputado federal e ex-prefeito de Jardim."
    },
    {
      id: "c5",
      nome: "Leandro Lobo Pimentel",
      cargo: "Conselheiro Substituto em Exercício",
      dataPosse: "15/03/2018",
      subsidioBruto: 39753.21,
      subsidioLiquidoMedio: 28400.00,
      formacao: "Direito e Controle Externo",
      biografiaBreve: "Auditor concursado do corpo instrutivo, atua na relatoria de processos de prestação de contas municipais."
    },
    {
      id: "c6",
      nome: "Célio Lima de Oliveira",
      cargo: "Conselheiro Substituto em Exercício",
      dataPosse: "10/05/2019",
      subsidioBruto: 39753.21,
      subsidioLiquidoMedio: 28400.00,
      formacao: "Ciências Contábeis e Direito",
      biografiaBreve: "Auditor com ampla atuação na área de fiscalização de obras públicas e contratos de engenharia."
    },
    {
      id: "c7",
      nome: "Patrícia Sarmento dos Santos",
      cargo: "Conselheira Substituta em Exercício",
      dataPosse: "18/06/2020",
      subsidioBruto: 39753.21,
      subsidioLiquidoMedio: 28400.00,
      formacao: "Direito Constitucional e Administrativo",
      biografiaBreve: "Auditora substituta atuante nas câmaras de julgamento de balancetes de prefeituras e câmaras."
    }
  ],
  procuradoresMPC: [
    {
      nome: "João Antônio de Oliveira Martins Júnior",
      cargo: "Procurador-Geral de Contas (MPC/MS)",
      subsidioBruto: 41845.49
    },
    {
      nome: "José Aêdo Camilo",
      cargo: "Procurador de Contas",
      subsidioBruto: 41845.49
    }
  ],
  distribuicaoDespesas: [
    {
      categoria: "Folha de Pagamento & Encargos Sociais",
      valorAnual: 285300000,
      percentual: 74.2,
      descricao: "Subsídios de Conselheiros, remunerações de auditores, servidores efetivos, comissionados e encargos previdenciários."
    },
    {
      categoria: "Tecnologia, Dados & Sistemas de Fiscalização",
      valorAnual: 42200000,
      percentual: 11.0,
      descricao: "Manutenção do e-Contas, Sistema Fiscalis, infraestrutura de nuvem, data center próprio e cibersegurança."
    },
    {
      categoria: "Custeio Geral & Manutenção Predial",
      valorAnual: 34600000,
      percentual: 9.0,
      descricao: "Energia elétrica, água, vigilância armada, limpeza, conservação do complexo no Parque dos Poderes em Campo Grande."
    },
    {
      categoria: "Capacitação & Escola Superior de Controle (Escoex)",
      valorAnual: 12400000,
      percentual: 3.2,
      descricao: "Treinamento técnico de servidores públicos municipais e auditores do Estado de Mato Grosso do Sul."
    },
    {
      categoria: "Diárias, Deslocamentos & Auditorias in loco",
      valorAnual: 10000000,
      percentual: 2.6,
      descricao: "Inspeções presenciais nos 79 municípios de MS para fiscalização de pontes, escolas e postos de saúde."
    }
  ],
  indicadoresFiscalizacao: {
    prestacoesContasAnalisadas: 4120,
    municipiosSobJurisdicao: 79,
    orgaosEstaduaisFiscalizados: 148,
    multasImputadasAnoMilhoes: 28.4,
    impugnacoesPreservadasMilhoes: 114.6
  },
  portalTransparenciaUrl: "https://www.tce.ms.gov.br/portal-cidadao/",
  diarioOficialUrl: "https://www.tce.ms.gov.br/diario-oficial"
};
