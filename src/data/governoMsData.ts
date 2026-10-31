/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DADOS PÚBLICOS DO GOVERNO DO ESTADO DE MATO GROSSO DO SUL (MS)
 * Gestão Estadual: Governador Eduardo Riedel (2023–2026)
 * Fontes Oficiais: SEFAZ-MS (Relatório de Gestão Fiscal - RGF), TCE-MS, Tesouro Nacional e LOA
 */

export interface SecretariaEstadual {
  sigla: string;
  nome: string;
  secretario: string;
  orcamentoAnual: number;
  participacaoPercentual: number;
  principaisProjetos: string[];
}

export interface ObraEstadual {
  id: string;
  titulo: string;
  municipios: string;
  secretariaResponsavel: string;
  investimentoTotal: number;
  status: 'Em Execução' | 'Concluída' | 'Licitada' | 'Fase Final';
  percentualConclusao: number;
  descricao: string;
  prazoEstimado: string;
}

export interface IndicadorLRF {
  titulo: string;
  percentual: number;
  valorFormatado: string;
  limiteLegal: number;
  limitePrudencial: number;
  status: 'Regular' | 'Alerta' | 'Prudencial' | 'Excedido';
  baseLegal: string;
  explicacao: string;
}

export interface DadosGovernoMS {
  anoExercicio: number;
  governador: {
    nome: string;
    partido: string;
    mandato: string;
    salarioBruto: number;
  };
  viceGovernador: {
    nome: string;
    partido: string;
    salarioBruto: number;
  };
  orcamentoGeralEstado: number; // R$ 25,48 bilhões
  receitaCorrenteLiquida: number; // RCL ~R$ 25,48 bilhões
  indicadoresLRF: IndicadorLRF[];
  decomposicaoOrcamento: {
    categoria: string;
    valor: number;
    percentual: number;
    descricao: string;
  }[];
  secretarias: SecretariaEstadual[];
  obrasEstruturantes: ObraEstadual[];
  investimentoTotalObras: number;
  portalTransparenciaUrl: string;
  painelObrasUrl: string;
}

export const GOVERNO_MS_DATA: DadosGovernoMS = {
  anoExercicio: 2026,
  governador: {
    nome: "Eduardo Riedel",
    partido: "PSDB",
    mandato: "2023–2026",
    salarioBruto: 35462.22
  },
  viceGovernador: {
    nome: "José Carlos Barbosa (Barbosinha)",
    partido: "PP",
    salarioBruto: 31915.99
  },
  orcamentoGeralEstado: 25480000000, // R$ 25,48 Bilhões
  receitaCorrenteLiquida: 25480000000,
  indicadoresLRF: [
    {
      titulo: "Despesa com Pessoal do Poder Executivo",
      percentual: 40.84,
      valorFormatado: "R$ 10,41 bilhões",
      limiteLegal: 49.00,
      limitePrudencial: 46.55,
      status: "Regular",
      baseLegal: "Art. 20, II, 'c' da LC nº 101/2000 (Lei de Responsabilidade Fiscal)",
      explicacao: "O Governo do Estado de MS gasta 40,84% da sua Receita Corrente Líquida com servidores ativos e inativos do Executivo, mantendo-se confortavelmente abaixo do Limite Máximo (49%) e do Limite de Alerta (44,1%)."
    },
    {
      titulo: "Limite Global da LRF para o Estado (Todos os Poderes)",
      percentual: 46.12,
      valorFormatado: "R$ 11,75 bilhões",
      limiteLegal: 60.00,
      limitePrudencial: 57.00,
      status: "Regular",
      baseLegal: "Art. 19, II da LC nº 101/2000",
      explicacao: "A LRF estabelece um teto de 60% da RCL para a soma de TODOS os Poderes (Executivo 49%, Judiciário 6%, Legislativo/TCE 3% e Ministério Público 2%). O somatório real consolidado em MS é de 46,12%."
    }
  ],
  decomposicaoOrcamento: [
    {
      categoria: "Pessoal e Encargos Sociais",
      valor: 12383280000,
      percentual: 48.6,
      descricao: "Remuneração e proventos dos servidores públicos estaduais ativos, aposentados e pensionistas da Ageprev em todas as áreas."
    },
    {
      categoria: "Custeio e Manutenção Operacional",
      valor: 9198280000,
      percentual: 36.1,
      descricao: "Manutenção de hospitais, insumos de saúde, merenda e transporte escolar, segurança pública, combustível de viaturas e tecnologia."
    },
    {
      categoria: "Investimentos e Obras Estruturantes",
      valor: 3898440000,
      percentual: 15.3,
      descricao: "Pavimentação asfáltica, pontes de concreto, Rota Bioceânica, hospitais regionais, saneamento e habitação."
    }
  ],
  secretarias: [
    {
      sigla: "SEILOG",
      nome: "Secretaria de Estado de Infraestrutura e Logística",
      secretario: "Guilherme Alcântara",
      orcamentoAnual: 3820000000,
      participacaoPercentual: 15.0,
      principaisProjetos: ["Pavimentação da Rodovia do Pantanal", "Acessos à Ponte Bioceânica", "Restauração de Rodovias Agropecuárias"]
    },
    {
      sigla: "SES",
      nome: "Secretaria de Estado de Saúde",
      secretario: "Maurício Simões Corrêa",
      orcamentoAnual: 3410000000,
      participacaoPercentual: 13.4,
      principaisProjetos: ["Caravana da Saúde / Cirurgias Eletivas", "Construção do Hospital Regional de Dourados", "Ampliação de Leitos de UTI"]
    },
    {
      sigla: "SED",
      nome: "Secretaria de Estado de Educação",
      secretario: "Hélio Queiroz Daher",
      orcamentoAnual: 3380000000,
      participacaoPercentual: 13.3,
      principaisProjetos: ["Universalização do Ensino em Tempo Integral", "Reforma de 180 Escolas Estaduais", "Tecnologia Digital nas Salas de Aula"]
    },
    {
      sigla: "SEJUSP",
      nome: "Secretaria de Estado de Justiça e Segurança Pública",
      secretario: "Antônio Carlos Videira",
      orcamentoAnual: 2450000000,
      participacaoPercentual: 9.6,
      principaisProjetos: ["Operação Hórus e Blindagem da Fronteira", "Modernização da Frota de Viaturas", "Câmeras de Reconhecimento Facial"]
    },
    {
      sigla: "SEMADESC",
      nome: "Meio Ambiente, Desenvolvimento, Ciência, Tecnologia e Inovação",
      secretario: "Jaime Verruck",
      orcamentoAnual: 980000000,
      participacaoPercentual: 3.8,
      principaisProjetos: ["MS Carbono Neutro 2030", "Atração da Fábrica de Celulose da Arauco", "Concessões Rodoviárias e Ferrovias"]
    },
    {
      sigla: "SEHAS",
      nome: "Secretaria de Direitos Humanos e Assistência Social",
      secretario: "Patrícia Cozzolino",
      orcamentoAnual: 680000000,
      participacaoPercentual: 2.7,
      principaisProjetos: ["Programa Mais Social", "Conta de Energia Zero", "Cozinhas Comunitárias"]
    },
    {
      sigla: "SEFAZ",
      nome: "Secretaria de Estado de Fazenda",
      secretario: "Flávio César de Oliveira",
      orcamentoAnual: 460000000,
      participacaoPercentual: 1.8,
      principaisProjetos: ["Nota MS Premiada", "Modernização Tributária", "Transformação Digital do Fisco"]
    }
  ],
  obrasEstruturantes: [
    {
      id: "obra-1",
      titulo: "Acesso Rodoviário à Ponte Internacional da Rota Bioceânica",
      municipios: "Porto Murtinho (Fronteira com Carmelo Peralta - PY)",
      secretariaResponsavel: "SEILOG / Agesul",
      investimentoTotal: 472000000,
      status: "Em Execução",
      percentualConclusao: 72,
      descricao: "Construção de contorno rodoviário asfaltado de 13 km e viadutos conectando a BR-267 à Ponte Internacional sobre o Rio Paraguai, integrando o MS aos portos chilenos no Oceano Pacífico.",
      prazoEstimado: "2026"
    },
    {
      id: "obra-2",
      titulo: "Construção do Complexo Hospitalar Regional de Dourados",
      municipios: "Dourados e Macrorregião Sul",
      secretariaResponsavel: "SES / Agesul",
      investimentoTotal: 125000000,
      status: "Fase Final",
      percentualConclusao: 88,
      descricao: "Novo centro médico com mais de 210 leitos, centro cirúrgico de alta complexidade, oncologia e UTI pediátrica para atender 33 municípios da Grande Dourados e Cone Sul.",
      prazoEstimado: "2026"
    },
    {
      id: "obra-3",
      titulo: "Pavimentação e Drenagem da Estrada Parque / Rodovia do Pantanal (MS-228)",
      municipios: "Corumbá, Aquidauana e Miranda",
      secretariaResponsavel: "SEILOG",
      investimentoTotal: 215000000,
      status: "Em Execução",
      percentualConclusao: 64,
      descricao: "Implantação de pontes de concreto armado e galerias ecológicas para escoamento das cheias na planície pantaneira, garantindo tráfego ano todo para pecuária e ecoturismo.",
      prazoEstimado: "2026"
    },
    {
      id: "obra-4",
      titulo: "Corredor da Celulose: Duplicação e Reforço da MS-112 e MS-338",
      municipios: "Ribas do Rio Pardo, Três Lagoas e Inocência",
      secretariaResponsavel: "SEILOG / Parceria Público-Privada",
      investimentoTotal: 880000000,
      status: "Em Execução",
      percentualConclusao: 58,
      descricao: "Ampliação de capacidade de carga para os novos megaempreendimentos industriais (Suzano e Arauco), com acostamentos largos e terceiras faixas em pontos críticos.",
      prazoEstimado: "2026/2027"
    },
    {
      id: "obra-5",
      titulo: "Programa Universaliza MS: Esgotamento Sanitário e Água Tratada",
      municipios: "68 municípios operados pela Sanesul",
      secretariaResponsavel: "Governo MS / Sanesul PPP",
      investimentoTotal: 1050000000,
      status: "Em Execução",
      percentualConclusao: 81,
      descricao: "Meta de universalização de 98% da cobertura de coleta e tratamento de esgoto sanitário em todo o Estado de Mato Grosso do Sul.",
      prazoEstimado: "Meta atingida em 2026"
    }
  ],
  investimentoTotalObras: 3898440000,
  portalTransparenciaUrl: "https://www.transparencia.ms.gov.br/",
  painelObrasUrl: "https://www.agesul.ms.gov.br/painel-de-obras/"
};
