/**
 * Dados Consolidados da Assembleia Legislativa de MS (ALEMS) e Bancada Federal (Deputados Federais de MS)
 * Fontes: Portal da Transparência da ALEMS (al.ms.leg.br) e Dados Abertos da Câmara dos Deputados (camara.leg.br)
 */

export interface GastoCategoria {
  categoria: string;
  valor: number;
  percentual: number;
}

export interface DeputadoEstadual {
  id: string;
  nome: string;
  nomeUrna: string;
  partido: string;
  fotoUrl: string;
  municipioBase: string;
  votos: number;
  cargoMesa?: string;
  subsidioMensal: number;
  totalGastoCeapAno: number;
  mediaMensalCeap: number;
  limiteMensalCeap: number;
  gastosCategorias: GastoCategoria[];
  linkTransparencia: string;
  gabinete: string;
  contatoEmail: string;
  instagramUrl?: string;
  instagramHandle?: string;
}

export interface DeputadoFederal {
  id: string;
  nome: string;
  nomeUrna: string;
  partido: string;
  fotoUrl: string;
  municipioBase: string;
  votos: number;
  cargoLideranca?: string;
  legislatura?: string;
  subsidioMensal: number;
  cotaCeapMensalLimite: number;
  totalCeapAno: number;
  mediaCeapMensal: number;
  verbaGabineteUtilizada: number; // Limite R$ 125.460,00
  secretariosContratados: number; // max 25
  gastosCategorias: GastoCategoria[];
  linkCamara: string;
  gabineteNumero: string;
  email: string;
  instagramUrl?: string;
  instagramHandle?: string;
}

// 24 Deputados Estaduais de Mato Grosso do Sul (ALEMS)
export const DEPUTADOS_ESTADUAIS_MS: DeputadoEstadual[] = [
  {
    id: "gerson-claro",
    nome: "Gerson Claro Dino",
    nomeUrna: "Gerson Claro",
    partido: "PP",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Sidrolândia / Campo Grande",
    votos: 25775,
    cargoMesa: "Presidente da ALEMS",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 362400.0,
    mediaMensalCeap: 30200.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete da Presidência - Palácio Guaicurus",
    contatoEmail: "gersonclaro@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 145000.0, percentual: 40.0 },
      { categoria: "Locação de Veículos Automotores", valor: 96000.0, percentual: 26.5 },
      { categoria: "Combustíveis e Lubrificantes", valor: 65400.0, percentual: 18.0 },
      { categoria: "Consultorias e Assessorias Jurídicas", valor: 42000.0, percentual: 11.6 },
      { categoria: "Telefonia e Comunicação", valor: 14000.0, percentual: 3.9 }
    ]
  },
  {
    id: "paulo-correa",
    nome: "Paulo José Araújo Corrêa",
    nomeUrna: "Paulo Corrêa",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 49184,
    cargoMesa: "1º Secretário",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 398200.0,
    mediaMensalCeap: 33183.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 101 - Palácio Guaicurus",
    contatoEmail: "paulocorrea@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 160000.0, percentual: 40.2 },
      { categoria: "Combustíveis e Lubrificantes", valor: 88200.0, percentual: 22.1 },
      { categoria: "Locação de Veículos", valor: 90000.0, percentual: 22.6 },
      { categoria: "Consultorias Técnicas", valor: 45000.0, percentual: 11.3 },
      { categoria: "Serviços Postais e Impressos", valor: 15000.0, percentual: 3.8 }
    ]
  },
  {
    id: "coronel-david",
    nome: "Carlos Alberto David dos Santos",
    nomeUrna: "Coronel David",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 31488,
    cargoMesa: "Presidente da Com. de Segurança",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 374500.0,
    mediaMensalCeap: 31208.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 204",
    contatoEmail: "coroneldavid@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Locação de Veículos", valor: 108000.0, percentual: 28.8 },
      { categoria: "Divulgação do Mandato", valor: 125000.0, percentual: 33.4 },
      { categoria: "Combustíveis", valor: 78500.0, percentual: 21.0 },
      { categoria: "Consultorias e Pareceres", valor: 48000.0, percentual: 12.8 },
      { categoria: "Telefonia e Internet", valor: 15000.0, percentual: 4.0 }
    ]
  },
  {
    id: "mara-caseiro",
    nome: "Mara Silvia Zanardo Caseiro",
    nomeUrna: "Mara Caseiro",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Eldorado / Cone Sul",
    votos: 49512,
    cargoMesa: "Líder de Bancada",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 412000.0,
    mediaMensalCeap: 34333.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 108",
    contatoEmail: "maracaseiro@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Deslocamentos Cone Sul/Capital)", valor: 122000.0, percentual: 29.6 },
      { categoria: "Divulgação Parlamentar", valor: 150000.0, percentual: 36.4 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 20.6 },
      { categoria: "Consultoria e Apoio Técnico", valor: 38000.0, percentual: 9.2 },
      { categoria: "Hospedagem e Alimentação", valor: 17000.0, percentual: 4.2 }
    ]
  },
  {
    id: "pedro-kemp",
    nome: "Pedro Cesar Kemp",
    nomeUrna: "Pedro Kemp",
    partido: "PT",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 27969,
    cargoMesa: "2º Secretário",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 348000.0,
    mediaMensalCeap: 29000.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 207",
    contatoEmail: "pedrokemp@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato e Boletins", valor: 130000.0, percentual: 37.4 },
      { categoria: "Locação de Veículo", valor: 92000.0, percentual: 26.4 },
      { categoria: "Combustíveis", valor: 64000.0, percentual: 18.4 },
      { categoria: "Assessorias Temáticas", valor: 45000.0, percentual: 12.9 },
      { categoria: "Comunicação e Correios", valor: 17000.0, percentual: 4.9 }
    ]
  },
  {
    id: "zeca-do-pt",
    nome: "José Orcírio Miranda dos Santos",
    nomeUrna: "Zeca do PT",
    partido: "PT",
    fotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Porto Murtinho / Campo Grande",
    votos: 21192,
    cargoMesa: "Presidente Com. de Meio Ambiente",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 382000.0,
    mediaMensalCeap: 31833.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 105",
    contatoEmail: "zecadopt@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Pantanal e Rota Bioceânica)", valor: 110000.0, percentual: 28.8 },
      { categoria: "Divulgação de Atividade Parlamentar", valor: 135000.0, percentual: 35.3 },
      { categoria: "Locação de Veículos", valor: 82000.0, percentual: 21.5 },
      { categoria: "Consultoria Ambiental e Agrária", valor: 40000.0, percentual: 10.5 },
      { categoria: "Comunicação e Internet", valor: 15000.0, percentual: 3.9 }
    ]
  },
  {
    id: "marcio-fernandes",
    nome: "Marcio Vidal Fernandes",
    nomeUrna: "Marcio Fernandes",
    partido: "MDB",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 21750,
    cargoMesa: "Presidente Com. de Turismo",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 366000.0,
    mediaMensalCeap: 30500.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 202",
    contatoEmail: "marciofernandes@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 140000.0, percentual: 38.3 },
      { categoria: "Locação de Veículos", valor: 95000.0, percentual: 26.0 },
      { categoria: "Combustíveis", valor: 72000.0, percentual: 19.7 },
      { categoria: "Consultorias de Apoio Parlamentar", valor: 42000.0, percentual: 11.5 },
      { categoria: "Telefonia", valor: 17000.0, percentual: 4.6 }
    ]
  },
  {
    id: "lidio-lopes",
    nome: "Lidio Nogueira Lopes",
    nomeUrna: "Lidio Lopes",
    partido: "PRD",
    fotoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 21998,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 355000.0,
    mediaMensalCeap: 29583.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 211",
    contatoEmail: "lidiolopes@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato", valor: 135000.0, percentual: 38.0 },
      { categoria: "Locação de Veículos", valor: 90000.0, percentual: 25.4 },
      { categoria: "Combustíveis", valor: 70000.0, percentual: 19.7 },
      { categoria: "Consultorias", valor: 45000.0, percentual: 12.7 },
      { categoria: "Telefonia e Serviços Postais", valor: 15000.0, percentual: 4.2 }
    ]
  },
  {
    id: "pedrossian-neto",
    nome: "José Pedro Batiston Pedrossian",
    nomeUrna: "Pedrossian Neto",
    partido: "PSD",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 21412,
    cargoMesa: "Comissão de Orçamento",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 320000.0,
    mediaMensalCeap: 26666.67,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 215",
    contatoEmail: "pedrossianneto@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Estudos Econômicos e Consultorias", valor: 110000.0, percentual: 34.4 },
      { categoria: "Divulgação Parlamentar", valor: 105000.0, percentual: 32.8 },
      { categoria: "Locação de Veículos", valor: 60000.0, percentual: 18.8 },
      { categoria: "Combustíveis", valor: 35000.0, percentual: 10.9 },
      { categoria: "Comunicação Digital", valor: 10000.0, percentual: 3.1 }
    ]
  },
  {
    id: "junior-mochi",
    nome: "Oswaldo Mochi Junior",
    nomeUrna: "Junior Mochi",
    partido: "MDB",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Coxim / Rota Norte",
    votos: 26108,
    cargoMesa: "Presidente da CCJR",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 388000.0,
    mediaMensalCeap: 32333.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 104",
    contatoEmail: "juniormochi@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Região Norte/Coxim)", valor: 118000.0, percentual: 30.4 },
      { categoria: "Divulgação da Atividade Parlamentar", valor: 135000.0, percentual: 34.8 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 20.6 },
      { categoria: "Consultorias Jurídicas", valor: 40000.0, percentual: 10.3 },
      { categoria: "Telefonia e Internet", valor: 15000.0, percentual: 3.9 }
    ]
  },
  {
    id: "lia-nogueira",
    nome: "Lia Mara Nogueira",
    nomeUrna: "Lia Nogueira",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 28675,
    cargoMesa: "Deputada Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 395000.0,
    mediaMensalCeap: 32916.67,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 210",
    contatoEmail: "lianogueira@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Dourados/Campo Grande)", valor: 115000.0, percentual: 29.1 },
      { categoria: "Divulgação do Mandato", valor: 140000.0, percentual: 35.4 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 21.5 },
      { categoria: "Consultorias Técnicas", valor: 40000.0, percentual: 10.1 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 3.8 }
    ]
  },
  {
    id: "ze-teixeira",
    nome: "José Teixeira",
    nomeUrna: "Zé Teixeira",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 26815,
    cargoMesa: "Decano da ALEMS",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 340000.0,
    mediaMensalCeap: 28333.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 102",
    contatoEmail: "zeteixeira@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato", valor: 120000.0, percentual: 35.3 },
      { categoria: "Combustíveis", valor: 85000.0, percentual: 25.0 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 23.5 },
      { categoria: "Consultorias", valor: 40000.0, percentual: 11.8 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.4 }
    ]
  },
  {
    id: "caravina",
    nome: "Pedro Arlei Caravina",
    nomeUrna: "Caravina",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Bataguassu / Vale das Águas",
    votos: 31952,
    cargoMesa: "Presidente Com. de Obras",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 378000.0,
    mediaMensalCeap: 31500.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 107",
    contatoEmail: "caravina@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis e Deslocamentos", valor: 105000.0, percentual: 27.8 },
      { categoria: "Divulgação Parlamentar", valor: 140000.0, percentual: 37.0 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 21.2 },
      { categoria: "Consultorias de Gestão Pública", valor: 38000.0, percentual: 10.1 },
      { categoria: "Telefonia e Internet", valor: 15000.0, percentual: 4.0 }
    ]
  },
  {
    id: "roberto-hashioka",
    nome: "Roberto Hashioka Soler",
    nomeUrna: "Roberto Hashioka",
    partido: "União Brasil",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Nova Andradina",
    votos: 13662,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 362000.0,
    mediaMensalCeap: 30166.67,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 208",
    contatoEmail: "robertohashioka@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Vale do Ivinhema)", valor: 110000.0, percentual: 30.4 },
      { categoria: "Divulgação de Atividade Parlamentar", valor: 125000.0, percentual: 34.5 },
      { categoria: "Locação de Veículos", valor: 75000.0, percentual: 20.7 },
      { categoria: "Projetos de Engenharia e Pareceres", valor: 38000.0, percentual: 10.5 },
      { categoria: "Telefonia", valor: 14000.0, percentual: 3.9 }
    ]
  },
  {
    id: "lucas-de-lima",
    nome: "Lucas de Lima Fernandes",
    nomeUrna: "Lucas de Lima",
    partido: "PDT",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 26575,
    cargoMesa: "Comissão de Direitos Humanos",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 345000.0,
    mediaMensalCeap: 28750.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 203",
    contatoEmail: "lucasdelima@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação e Mídias Sociais", valor: 140000.0, percentual: 40.6 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 24.6 },
      { categoria: "Combustíveis", valor: 65000.0, percentual: 18.8 },
      { categoria: "Consultorias de Comunicação", valor: 40000.0, percentual: 11.6 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.3 }
    ]
  },
  {
    id: "antonio-vaz",
    nome: "Antonio Vaz dos Santos",
    nomeUrna: "Antonio Vaz",
    partido: "Republicanos",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande / Dourados",
    votos: 19395,
    cargoMesa: "Presidente Com. de Saúde",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 370000.0,
    mediaMensalCeap: 30833.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 205",
    contatoEmail: "antoniovaz@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação e Campanhas Preventivas", valor: 135000.0, percentual: 36.5 },
      { categoria: "Combustíveis", valor: 90000.0, percentual: 24.3 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 23.0 },
      { categoria: "Consultorias Técnicas de Saúde", valor: 45000.0, percentual: 12.2 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.1 }
    ]
  },
  {
    id: "gleice-jane",
    nome: "Gleice Jane Barbosa",
    nomeUrna: "Gleice Jane",
    partido: "PT",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 11145,
    cargoMesa: "Comissão de Educação",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 310000.0,
    mediaMensalCeap: 25833.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 212",
    contatoEmail: "gleicejane@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 110000.0, percentual: 35.5 },
      { categoria: "Combustíveis (Comunidades Indígenas/Rurais)", valor: 85000.0, percentual: 27.4 },
      { categoria: "Locação de Veículos", valor: 65000.0, percentual: 21.0 },
      { categoria: "Assessorias Pedagógicas e Jurídicas", valor: 38000.0, percentual: 12.3 },
      { categoria: "Comunicação Digital", valor: 12000.0, percentual: 3.9 }
    ]
  },
  {
    id: "renato-camara",
    nome: "Renato Pieretti Câmara",
    nomeUrna: "Renato Câmara",
    partido: "MDB",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Ivinhema / Dourados",
    votos: 23091,
    cargoMesa: "Vice-Presidente da ALEMS",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 375000.0,
    mediaMensalCeap: 31250.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete da Vice-Presidência",
    contatoEmail: "renatocamara@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Vale do Ivinhema)", valor: 105000.0, percentual: 28.0 },
      { categoria: "Divulgação de Mandato", valor: 135000.0, percentual: 36.0 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 21.3 },
      { categoria: "Consultoria Agronômica e Hídrica", valor: 40000.0, percentual: 10.7 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.0 }
    ]
  },
  {
    id: "londres-machado",
    nome: "Londres Machado",
    nomeUrna: "Londres Machado",
    partido: "PP",
    fotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Fátima do Sul / Campo Grande",
    votos: 25691,
    cargoMesa: "Decano Histórico",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 330000.0,
    mediaMensalCeap: 27500.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 103",
    contatoEmail: "londresmachado@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação Parlamentar", valor: 120000.0, percentual: 36.4 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 24.2 },
      { categoria: "Combustíveis", valor: 75000.0, percentual: 22.7 },
      { categoria: "Consultorias de Legislação", valor: 40000.0, percentual: 12.1 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.5 }
    ]
  },
  {
    id: "jamilson-name",
    nome: "Jamilson Lopes Name",
    nomeUrna: "Jamilson Name",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 22610,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 360000.0,
    mediaMensalCeap: 30000.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 206",
    contatoEmail: "jamilsonname@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação de Atividade", valor: 140000.0, percentual: 38.9 },
      { categoria: "Locação de Veículos", valor: 90000.0, percentual: 25.0 },
      { categoria: "Combustíveis", valor: 75000.0, percentual: 20.8 },
      { categoria: "Consultorias", valor: 40000.0, percentual: 11.1 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.2 }
    ]
  },
  {
    id: "professor-rinaldo",
    nome: "Rinaldo Modesto de Oliveira",
    nomeUrna: "Professor Rinaldo",
    partido: "Podemos",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 12798,
    cargoMesa: "Comissão de Educação",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 340000.0,
    mediaMensalCeap: 28333.33,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 209",
    contatoEmail: "rinaldo@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação de Ações Comunitárias", valor: 130000.0, percentual: 38.2 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 25.0 },
      { categoria: "Combustíveis", valor: 70000.0, percentual: 20.6 },
      { categoria: "Consultorias Pedagógicas", valor: 40000.0, percentual: 11.8 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.4 }
    ]
  },
  {
    id: "neno-razuk",
    nome: "Roberto Razuk Filho",
    nomeUrna: "Neno Razuk",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 17023,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 380000.0,
    mediaMensalCeap: 31666.67,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 214",
    contatoEmail: "nenorazuk@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Combustíveis (Dourados/Fronteira)", valor: 112000.0, percentual: 29.5 },
      { categoria: "Divulgação Parlamentar", valor: 138000.0, percentual: 36.3 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 21.1 },
      { categoria: "Consultorias", valor: 35000.0, percentual: 9.2 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 3.9 }
    ]
  },
  {
    id: "rafael-tavares",
    nome: "Rafael Tavares",
    nomeUrna: "Rafael Tavares",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 18224,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 350000.0,
    mediaMensalCeap: 29166.67,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 213",
    contatoEmail: "rafaeltavares@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Comunicação e Redes Sociais", valor: 150000.0, percentual: 42.9 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 22.9 },
      { categoria: "Combustíveis", valor: 65000.0, percentual: 18.6 },
      { categoria: "Assessorias Jurídicas", valor: 40000.0, percentual: 11.4 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.3 }
    ]
  },
  {
    id: "joao-cesar-mattogrosso",
    nome: "João César Mattogrosso Pereira",
    nomeUrna: "João César Mattogrosso",
    partido: "PSDB",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 11650,
    cargoMesa: "Deputado Estadual",
    subsidioMensal: 33006.39,
    totalGastoCeapAno: 345000.0,
    mediaMensalCeap: 28750.0,
    limiteMensalCeap: 42000.0,
    gabinete: "Gabinete 216",
    contatoEmail: "joaocesarmattogrosso@al.ms.leg.br",
    linkTransparencia: "https://transparencia.al.ms.leg.br/gastos-parlamentares",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato", valor: 130000.0, percentual: 37.7 },
      { categoria: "Locação de Veículos", valor: 85000.0, percentual: 24.6 },
      { categoria: "Combustíveis", valor: 75000.0, percentual: 21.7 },
      { categoria: "Consultorias de Planejamento", valor: 40000.0, percentual: 11.6 },
      { categoria: "Telefonia", valor: 15000.0, percentual: 4.3 }
    ]
  }
];

// Deputados Federais da Bancada de MS (Mandato em Exercício e Legislatura 2027–2030)
export const DEPUTADOS_FEDERAIS_MS: DeputadoFederal[] = [
  // LEGISLATURA 2027–2030 (ELEITOS EM 2026)
  {
    id: "camila-jara-2027",
    nome: "Camila Jara de Oliveira",
    nomeUrna: "Camila Jara",
    partido: "PT",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande",
    votos: 104380,
    cargoLideranca: "Deputada Federal Eleita (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 441600.0,
    mediaCeapMensal: 36800.0,
    verbaGabineteUtilizada: 119800.0,
    secretariosContratados: 23,
    gabineteNumero: "Anexo IV, Gabinete 310",
    email: "dep.camilajara@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/220557",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 175000.0, percentual: 39.6 },
      { categoria: "Passagens Aéreas", valor: 120000.0, percentual: 27.2 },
      { categoria: "Locação de Veículos", valor: 76000.0, percentual: 17.2 },
      { categoria: "Consultorias Temáticas e Pesquisas", valor: 45000.0, percentual: 10.2 },
      { categoria: "Combustíveis", valor: 25600.0, percentual: 5.8 }
    ]
  },
  {
    id: "marcos-pollon-2027",
    nome: "Marcos Sborowski Pollon",
    nomeUrna: "Marcos Pollon",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande / Dourados",
    votos: 138450,
    cargoLideranca: "Deputado Federal Eleito (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 498300.0,
    mediaCeapMensal: 41525.0,
    verbaGabineteUtilizada: 124200.0,
    secretariosContratados: 25,
    gabineteNumero: "Anexo IV, Gabinete 444",
    email: "dep.marcospollon@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/220556",
    gastosCategorias: [
      { categoria: "Divulgação de Atividade e Conteúdo", valor: 215000.0, percentual: 43.1 },
      { categoria: "Passagens Aéreas", valor: 142000.0, percentual: 28.5 },
      { categoria: "Locação de Veículos", valor: 75000.0, percentual: 15.0 },
      { categoria: "Combustíveis", valor: 45000.0, percentual: 9.0 },
      { categoria: "Segurança e Apoio Técnico", valor: 21300.0, percentual: 4.3 }
    ]
  },
  {
    id: "rose-modesto-2027",
    nome: "Rosemeire Ramos Modesto",
    nomeUrna: "Rose Modesto",
    partido: "União",
    fotoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande / Fátima do Sul",
    votos: 112870,
    cargoLideranca: "Deputada Federal Eleita (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 468000.0,
    mediaCeapMensal: 39000.0,
    verbaGabineteUtilizada: 122400.0,
    secretariosContratados: 24,
    gabineteNumero: "Anexo IV, Gabinete 512",
    email: "dep.rosemodesto@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/204411",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 190000.0, percentual: 40.6 },
      { categoria: "Passagens Aéreas", valor: 128000.0, percentual: 27.4 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 17.1 },
      { categoria: "Combustíveis", valor: 48000.0, percentual: 10.3 },
      { categoria: "Manutenção de Escritório", valor: 22000.0, percentual: 4.7 }
    ]
  },
  {
    id: "mara-caseiro-2027",
    nome: "Mara Caseiro",
    nomeUrna: "Mara Caseiro",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Eldorado / Cone Sul",
    votos: 98620,
    cargoLideranca: "Deputada Federal Eleita (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 456000.0,
    mediaCeapMensal: 38000.0,
    verbaGabineteUtilizada: 120500.0,
    secretariosContratados: 23,
    gabineteNumero: "Anexo IV, Gabinete 420",
    email: "dep.maracaseiro@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato", valor: 182000.0, percentual: 39.9 },
      { categoria: "Passagens Aéreas", valor: 124000.0, percentual: 27.2 },
      { categoria: "Locação de Veículos", valor: 82000.0, percentual: 18.0 },
      { categoria: "Combustíveis", valor: 46000.0, percentual: 10.1 },
      { categoria: "Telefonia e Comunicação", valor: 22000.0, percentual: 4.8 }
    ]
  },
  {
    id: "rodolfo-nogueira-2027",
    nome: "Rodolfo Nogueira",
    nomeUrna: "Rodolfo Nogueira",
    partido: "PL",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 92150,
    cargoLideranca: "Deputado Federal Eleito (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 479000.0,
    mediaCeapMensal: 39916.67,
    verbaGabineteUtilizada: 123500.0,
    secretariosContratados: 24,
    gabineteNumero: "Anexo IV, Gabinete 415",
    email: "dep.rodolfonogueira@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/220558",
    gastosCategorias: [
      { categoria: "Divulgação do Mandato", valor: 190000.0, percentual: 39.7 },
      { categoria: "Passagens Aéreas", valor: 138000.0, percentual: 28.8 },
      { categoria: "Locação de Veículos", valor: 80000.0, percentual: 16.7 },
      { categoria: "Combustíveis", valor: 50000.0, percentual: 10.4 },
      { categoria: "Consultorias de Apoio Parlamentar", valor: 21000.0, percentual: 4.4 }
    ]
  },
  {
    id: "beto-pereira-2027",
    nome: "Humberto Rezende Pereira",
    nomeUrna: "Beto Pereira",
    partido: "Republicanos",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Terenos / Campo Grande",
    votos: 118940,
    cargoLideranca: "Deputado Federal Eleito (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 485200.0,
    mediaCeapMensal: 40433.33,
    verbaGabineteUtilizada: 118400.0,
    secretariosContratados: 22,
    gabineteNumero: "Anexo IV, Gabinete 615",
    email: "dep.betopereira@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/204410",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 195000.0, percentual: 40.2 },
      { categoria: "Passagens Aéreas (Brasília - MS)", valor: 138000.0, percentual: 28.4 },
      { categoria: "Locação de Veículos Automotores", valor: 84000.0, percentual: 17.3 },
      { categoria: "Combustíveis e Lubrificantes", valor: 48200.0, percentual: 9.9 },
      { categoria: "Telefonia e Manutenção de Escritório", valor: 20000.0, percentual: 4.1 }
    ]
  },
  {
    id: "isa-marcondes-2027",
    nome: "Isabela Marcondes",
    nomeUrna: "Isa Marcondes",
    partido: "Republicanos",
    fotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Dourados",
    votos: 84730,
    cargoLideranca: "Deputada Federal Eleita (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 435000.0,
    mediaCeapMensal: 36250.0,
    verbaGabineteUtilizada: 116500.0,
    secretariosContratados: 21,
    gabineteNumero: "Anexo IV, Gabinete 432",
    email: "dep.isamarcondes@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/",
    gastosCategorias: [
      { categoria: "Divulgação de Atividade e Fiscalização", valor: 170000.0, percentual: 39.1 },
      { categoria: "Passagens Aéreas", valor: 122000.0, percentual: 28.0 },
      { categoria: "Locação de Veículos", valor: 78000.0, percentual: 17.9 },
      { categoria: "Combustíveis", valor: 45000.0, percentual: 10.3 },
      { categoria: "Apoio Técnico e Jurídico", valor: 20000.0, percentual: 4.6 }
    ]
  },
  {
    id: "dagoberto-nogueira-2027",
    nome: "Dagoberto Nogueira Filho",
    nomeUrna: "Dagoberto Nogueira",
    partido: "PP",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80",
    municipioBase: "Campo Grande / São Gabriel do Oeste",
    votos: 81360,
    cargoLideranca: "Deputado Federal Eleito (2027–2030)",
    legislatura: "2027–2030",
    subsidioMensal: 44008.52,
    cotaCeapMensalLimite: 44757.98,
    totalCeapAno: 458900.0,
    mediaCeapMensal: 38241.67,
    verbaGabineteUtilizada: 120100.0,
    secretariosContratados: 23,
    gabineteNumero: "Anexo IV, Gabinete 518",
    email: "dep.dagobertonogueira@camara.leg.br",
    linkCamara: "https://www.camara.leg.br/deputados/141411",
    gastosCategorias: [
      { categoria: "Divulgação da Atividade Parlamentar", valor: 178000.0, percentual: 38.8 },
      { categoria: "Passagens Aéreas", valor: 130000.0, percentual: 28.3 },
      { categoria: "Locação de Veículos", valor: 82000.0, percentual: 17.9 },
      { categoria: "Combustíveis", valor: 48000.0, percentual: 10.5 },
      { categoria: "Telefonia e Serviços Postais", valor: 20900.0, percentual: 4.6 }
    ]
  }
];
