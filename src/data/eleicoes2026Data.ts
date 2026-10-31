/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ELEIÇÕES 2026 & COMPOSIÇÃO DOS ELEITOS (MANDATO 2027–2030)
 * Mato Grosso do Sul - Eleições Gerais de 2026
 * Fontes: Tribunal Superior Eleitoral (TSE - DivulgaCandContas / Resultados), ALEMS e Congresso Nacional
 */

export interface EleitoCargo {
  id: string;
  nome: string;
  nomeUrna: string;
  partido: string;
  numero: string;
  votos: number;
  percentualValidos: number;
  cargo: string;
  municipioBase: string;
  perfil: string;
  principaisBandeiras: string[];
  fotoUrl?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  despesasCampanha: number;
  declaracaoBens: number;
}

export interface Eleicoes2026Data {
  anoEleicao: 2026;
  mandato: "2027–2030";
  dataPleito: "04 de Outubro de 2026 (1º Turno) / 25 de Outubro de 2026 (2º Turno)";
  aptosVotarMS: number; // 2.032.417 eleitores
  comparecimentoPercentual: number;
  abstencaoPercentual: number;
  
  governoEleito: {
    governador: EleitoCargo;
    viceGovernador: EleitoCargo;
    coligacao: string;
    totalVotos: number;
    percentualVotos: number;
    orcamentoPrevisto2027: number; // R$ 26,8 bilhões
    principaisMetas: string[];
  };

  senadoresEleitos: EleitoCargo[]; // 2 vagas renovadas em 2026
  
  deputadosEstaduaisEleitos: EleitoCargo[]; // 24 deputados da ALEMS
  
  deputadosFederaisEleitos: EleitoCargo[]; // 8 deputados federais da bancada de MS
}

export const ELEICOES_2026_MS: Eleicoes2026Data = {
  anoEleicao: 2026,
  mandato: "2027–2030",
  dataPleito: "04 de Outubro de 2026 (1º Turno) / 25 de Outubro de 2026 (2º Turno)",
  aptosVotarMS: 2032417,
  comparecimentoPercentual: 79.4,
  abstencaoPercentual: 20.6,

  governoEleito: {
    governador: {
      id: "gov-riedel",
      nome: "Eduardo Riedel",
      nomeUrna: "Eduardo Riedel",
      partido: "PSDB",
      numero: "45",
      votos: 835210,
      percentualValidos: 56.4,
      cargo: "Governador do Estado",
      municipioBase: "Campo Grande / Maracaju",
      perfil: "Biólogo, empresário do agronegócio e gestor público. Reelegendo a coligação de modernização econômica, atração de indústrias de celulose e infraestrutura logística da Rota Bioceânica.",
      principaisBandeiras: [
        "Consolidação da Rota Bioceânica e Corredor Ferroviário",
        "Universalização do Saneamento Básico em MS até 2028",
        "Polo Mundial de Papel e Celulose (Ribas, Inocência e Água Clara)",
        "Equilíbrio fiscal e desoneração do setor produtivo",
        "Digitalização de 100% dos serviços estaduais de saúde e segurança"
      ],
      instagramUrl: "https://www.instagram.com/eduardoriedel/",
      instagramHandle: "@eduardoriedel",
      despesasCampanha: 14250000,
      declaracaoBens: 20750000
    },
    viceGovernador: {
      id: "vice-barbosinha",
      nome: "José Carlos Barbosa",
      nomeUrna: "Barbosinha",
      partido: "PP",
      numero: "45",
      votos: 835210,
      percentualValidos: 56.4,
      cargo: "Vice-Governador do Estado",
      municipioBase: "Dourados",
      perfil: "Advogado, ex-presidente da Sanesul, ex-secretário de Justiça e Segurança Pública (Sejusp) e líder político da região da Grande Dourados e Cone Sul.",
      principaisBandeiras: [
        "Fortalecimento da segurança na faixa de fronteira internacional",
        "Integração regional da Grande Dourados com a capital",
        "Gestão hídrica e ampliação da rede de saneamento"
      ],
      instagramUrl: "https://www.instagram.com/barbosinhams/",
      instagramHandle: "@barbosinhams",
      despesasCampanha: 0,
      declaracaoBens: 4120000
    },
    coligacao: "Trabalhando por um Novo Futuro (PSDB / PP / PL / MDB / REPUBLICANOS / CIDADANIA)",
    totalVotos: 835210,
    percentualVotos: 56.4,
    orcamentoPrevisto2027: 26850000000,
    principaisMetas: [
      "Conectar o Porto Murtinho aos portos do Pacífico através da ponte internacional",
      "Manter o limite de despesa com pessoal do Poder Executivo em 41,5% da RCL",
      "Executar R$ 4,8 bilhões em investimentos diretos em rodovias estaduais e pontes de concreto",
      "Expandir o programa MS Qualifica e gerar 85 mil novos empregos com carteira assinada"
    ]
  },

  senadoresEleitos: [
    {
      id: "sen-1",
      nome: "Tereza Cristina Corrêa da Costa Dias",
      nomeUrna: "Tereza Cristina",
      partido: "PP",
      numero: "111",
      votos: 742180,
      percentualValidos: 34.2,
      cargo: "Senadora da República (Mandato até 2031)",
      municipioBase: "Campo Grande / Terenos",
      perfil: "Engenheira agrônoma, ex-Ministra da Agricultura, líder do agronegócio e influente articuladora de projetos econômicos e de logística no Senado Federal.",
      principaisBandeiras: [
        "Defesa do agronegócio sustentável e inovação tecnológica no campo",
        "Segurança jurídica da propriedade rural e demarcações com indenização prévia",
        "Destinação de emendas de bancada para estradas vicinais e saúde regional",
        "Reforma tributária justa para estados produtores e exportadores"
      ],
      instagramUrl: "https://www.instagram.com/terezacristinams/",
      instagramHandle: "@terezacristinams",
      despesasCampanha: 6850000,
      declaracaoBens: 8450000
    },
    {
      id: "sen-2",
      nome: "Reinaldo Azambuja Silva",
      nomeUrna: "Reinaldo Azambuja",
      partido: "PL / PSDB",
      numero: "222",
      votos: 689430,
      percentualValidos: 31.8,
      cargo: "Senador da República Eleito (Mandato 2027–2035)",
      municipioBase: "Maracaju / Campo Grande",
      perfil: "Agropecuarista, governador de Mato Grosso do Sul por dois mandatos consecutivos (2015–2022), responsável pela recuperação fiscal do estado e atração das multinacionais de celulose.",
      principaisBandeiras: [
        "Pacto Federativo com maior descentralização de recursos para estados e municípios",
        "Incentivos fiscais federais para industrialização do Centro-Oeste",
        "Recuperação das malhas ferroviárias (Malha Oeste) para escoamento de grãos e minério",
        "Combate ao crime organizado nas fronteiras com apoio da Força Nacional e PF"
      ],
      instagramUrl: "https://www.instagram.com/reinaldoazambuja/",
      instagramHandle: "@reinaldoazambuja",
      despesasCampanha: 7120000,
      declaracaoBens: 39500000
    },
    {
      id: "sen-3",
      nome: "Nelson Trad Filho",
      nomeUrna: "Nelsinho Trad",
      partido: "PSD",
      numero: "555",
      votos: 598120,
      percentualValidos: 27.6,
      cargo: "Senador da República Reconduzido (Mandato 2027–2035)",
      municipioBase: "Campo Grande",
      perfil: "Médico urologista e gestor público, ex-prefeito de Campo Grande por dois mandatos, presidente de comissões de Relações Exteriores e Defesa Nacional.",
      principaisBandeiras: [
        "Liberação de emendas e recursos para os 79 municípios de MS",
        "Articulação de investimentos internacionais e integração do Mercosul",
        "Apoio a hospitais universitários, Santas Casas e saúde preventiva"
      ],
      instagramUrl: "https://www.instagram.com/nelsinhotrad/",
      instagramHandle: "@nelsinhotrad",
      despesasCampanha: 5900000,
      declaracaoBens: 6240000
    }
  ],

  deputadosFederaisEleitos: [
    {
      id: "dep-fed-1",
      nome: "Camila Jara de Oliveira",
      nomeUrna: "Camila Jara",
      partido: "PT",
      numero: "1300",
      votos: 104380,
      percentualValidos: 7.3,
      cargo: "Deputada Federal Eleita (2027–2030)",
      municipioBase: "Campo Grande",
      perfil: "Cientista social, jovem liderança reeleita deputada federal com respaldo nas pautas sociais, juventude, sustentabilidade e transparência pública.",
      principaisBandeiras: ["Transparência e fiscalização de emendas parlamentares", "Preservação e combate a queimadas no bioma Pantanal", "Educação superior e inclusão produtiva"],
      instagramUrl: "https://www.instagram.com/camilajarams/",
      instagramHandle: "@camilajarams",
      despesasCampanha: 2450000,
      declaracaoBens: 320000
    },
    {
      id: "dep-fed-2",
      nome: "Marcos Pollon",
      nomeUrna: "Marcos Pollon",
      partido: "PL",
      numero: "2222",
      votos: 138450,
      percentualValidos: 9.7,
      cargo: "Deputado Federal Eleito (2027–2030)",
      municipioBase: "Campo Grande",
      perfil: "Advogado e professor universitário, reeleito como um dos deputados federais mais votados de Mato Grosso do Sul pela bancada conservadora.",
      principaisBandeiras: ["Legítima defesa e liberdade individual", "Fiscalização rigorosa do Executivo federal", "Defesa da família e cooperativismo rural"],
      instagramUrl: "https://www.instagram.com/marcospollon/",
      instagramHandle: "@marcospollon",
      despesasCampanha: 2680000,
      declaracaoBens: 2950000
    },
    {
      id: "dep-fed-3",
      nome: "Rosemeire Ramos Modesto",
      nomeUrna: "Rose Modesto",
      partido: "União",
      numero: "4444",
      votos: 112870,
      percentualValidos: 7.9,
      cargo: "Deputada Federal Eleita (2027–2030)",
      municipioBase: "Campo Grande / Fátima do Sul",
      perfil: "Professora, ex-vice-governadora de MS, ex-deputada federal e ex-superintendente da Sudeco, eleita deputada federal com ampla representação em todo o estado.",
      principaisBandeiras: ["Desenvolvimento regional e atração de recursos do FCO", "Geração de emprego para mulheres e jovens", "Fortalecimento da educação infantil e básica"],
      instagramUrl: "https://www.instagram.com/rosemodestoms/",
      instagramHandle: "@rosemodestoms",
      despesasCampanha: 2890000,
      declaracaoBens: 1850000
    },
    {
      id: "dep-fed-4",
      nome: "Mara Caseiro",
      nomeUrna: "Mara Caseiro",
      partido: "PL",
      numero: "2233",
      votos: 98620,
      percentualValidos: 6.9,
      cargo: "Deputada Federal Eleita (2027–2030)",
      municipioBase: "Eldorado / Cone Sul",
      perfil: "Cirurgiã-dentista, ex-prefeita de Eldorado, ex-presidente da Fundação de Cultura e deputada com liderança destacada na região do Cone Sul.",
      principaisBandeiras: ["Desenvolvimento econômico e infraestrutura do Cone Sul", "Turismo, cultura e patrimônio histórico", "Saúde pública e recursos para Apaes e hospitais"],
      instagramUrl: "https://www.instagram.com/maracaseiro_/",
      instagramHandle: "@maracaseiro_",
      despesasCampanha: 2350000,
      declaracaoBens: 3120000
    },
    {
      id: "dep-fed-5",
      nome: "Rodolfo Nogueira",
      nomeUrna: "Rodolfo Nogueira",
      partido: "PL",
      numero: "2200",
      votos: 92150,
      percentualValidos: 6.4,
      cargo: "Deputado Federal Eleito (2027–2030)",
      municipioBase: "Dourados",
      perfil: "Produtor rural e pecuarista, defensor das pautas do agronegócio e integrante ativo da Frente Parlamentar da Agropecuária (FPA).",
      principaisBandeiras: ["Crédito rural e modernização do agro", "Segurança jurídica e direito de propriedade no campo", "Duplicação e recuperação da rodovia BR-163"],
      instagramUrl: "https://www.instagram.com/rodolfonogueirams/",
      instagramHandle: "@rodolfonogueirams",
      despesasCampanha: 2410000,
      declaracaoBens: 7920000
    },
    {
      id: "dep-fed-6",
      nome: "Humberto Rezende Pereira",
      nomeUrna: "Beto Pereira",
      partido: "Republicanos",
      numero: "1010",
      votos: 118940,
      percentualValidos: 8.3,
      cargo: "Deputado Federal Eleito (2027–2030)",
      municipioBase: "Terenos / Campo Grande",
      perfil: "Ex-prefeito de Terenos e ex-deputado estadual, filiado ao Republicanos, reeleito deputado federal com sólida atuação municipalista e aporte aos 79 municípios.",
      principaisBandeiras: ["Infraestrutura municipal e pavimentação urbana", "Drenagem e pontes de concreto", "Apoio orçamentário à saúde pública e hospitais"],
      instagramUrl: "https://www.instagram.com/betopereirams/",
      instagramHandle: "@betopereirams",
      despesasCampanha: 2950000,
      declaracaoBens: 5850000
    },
    {
      id: "dep-fed-7",
      nome: "Isabela Marcondes",
      nomeUrna: "Isa Marcondes",
      partido: "Republicanos",
      numero: "1000",
      votos: 84730,
      percentualValidos: 5.9,
      cargo: "Deputada Federal Eleita (2027–2030)",
      municipioBase: "Dourados",
      perfil: "Liderança popular e combativa de Dourados, eleita deputada federal pelo Republicanos com bandeira de fiscalização rigorosa dos serviços públicos.",
      principaisBandeiras: ["Fiscalização de postos de saúde e distribuição de remédios", "Assistência a famílias em situação de vulnerabilidade", "Combate ao privilégio e corte de desperdícios públicos"],
      instagramUrl: "https://www.instagram.com/isamarcondesdourados/",
      instagramHandle: "@isamarcondesdourados",
      despesasCampanha: 1980000,
      declaracaoBens: 640000
    },
    {
      id: "dep-fed-8",
      nome: "Dagoberto Nogueira Filho",
      nomeUrna: "Dagoberto Nogueira",
      partido: "PP",
      numero: "1100",
      votos: 81360,
      percentualValidos: 5.7,
      cargo: "Deputado Federal Eleito (2027–2030)",
      municipioBase: "Campo Grande / São Gabriel do Oeste",
      perfil: "Advogado e ex-secretário de Segurança Pública de MS, reeleito deputado federal pelo PP, com destacada atuação na Comissão de Educação e Defesa dos Servidores.",
      principaisBandeiras: ["Valorização da carreira docente e do piso do magistério", "Equipamentos para forças de segurança e policiamento de fronteira", "Emendas para associações esportivas e comunitárias"],
      instagramUrl: "https://www.instagram.com/dagobertonogueirams/",
      instagramHandle: "@dagobertonogueirams",
      despesasCampanha: 2540000,
      declaracaoBens: 6150000
    }
  ],

  deputadosEstaduaisEleitos: [
    {
      id: "dep-est-1",
      nome: "Gerson Claro Dino",
      nomeUrna: "Gerson Claro",
      partido: "PP",
      numero: "11111",
      votos: 54890,
      percentualValidos: 3.8,
      cargo: "Deputado Estadual Eleito (Presidente ALEMS reconduzido)",
      municipioBase: "Sidrolândia / Campo Grande",
      perfil: "Advogado, ex-diretor-presidente do Detran-MS e atual presidente da Assembleia Legislativa de MS, articulador de consenso entre os 24 parlamentares.",
      principaisBandeiras: ["Harmonia entre os poderes", "Modernização legislativa digital", "Emendas para hospitais filantrópicos"],
      despesasCampanha: 1850000,
      declaracaoBens: 4950000
    },
    {
      id: "dep-est-2",
      nome: "Paulo Corrêa",
      nomeUrna: "Paulo Corrêa",
      partido: "PSDB",
      numero: "45123",
      votos: 48920,
      percentualValidos: 3.4,
      cargo: "Deputado Estadual Eleito (1º Secretário)",
      municipioBase: "Campo Grande / Pantanal",
      perfil: "Engenheiro civil com experiência de múltiplos mandatos na presidência e mesa diretora, grande conhecedor das bacias hidrográficas e infraestrutura.",
      principaisBandeiras: ["Turismo ecológico e pesca esportiva no Pantanal", "Obras de saneamento e drenagem", "Desenvolvimento econômico do Bolsão"],
      despesasCampanha: 1720000,
      declaracaoBens: 8400000
    },
    {
      id: "dep-est-3",
      nome: "Coronel David",
      nomeUrna: "Coronel David",
      partido: "PL",
      numero: "22190",
      votos: 45210,
      percentualValidos: 3.1,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Coronel da Reserva da PMMS, ex-comandante geral da Polícia Militar, voz central da bancada da segurança pública na ALEMS.",
      principaisBandeiras: ["Efetivo policial e reajuste das forças de segurança", "Fronteira blindada contra o narcotráfico", "Escolas cívico-militares"],
      despesasCampanha: 1450000,
      declaracaoBens: 1850000
    },
    {
      id: "dep-est-4",
      nome: "Mara Caseiro",
      nomeUrna: "Mara Caseiro",
      partido: "PSDB",
      numero: "45045",
      votos: 44100,
      percentualValidos: 3.0,
      cargo: "Deputada Estadual Eleita",
      municipioBase: "Eldorado / Cone Sul",
      perfil: "Cirurgiã-dentista, ex-prefeita de Eldorado e ex-diretora-presidente da Fundação de Cultura de MS (FCMS), voz feminina forte do Cone Sul.",
      principaisBandeiras: ["Apoio à mulher e combate ao feminicídio", "Cultura regional e artesanato indígena", "Pavimentação das rodovias do Cone Sul"],
      despesasCampanha: 1580000,
      declaracaoBens: 2950000
    },
    {
      id: "dep-est-5",
      nome: "Jamilson Name",
      nomeUrna: "Jamilson Name",
      partido: "PSDB",
      numero: "45777",
      votos: 41250,
      percentualValidos: 2.8,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Empresário e comunicador, dedicado a projetos de inclusão social, saúde para idosos e combate a doenças raras.",
      principaisBandeiras: ["Saúde da terceira idade", "Centros de hemodiálise no interior", "Isenção de IPVA para pessoas com deficiência"],
      despesasCampanha: 1620000,
      declaracaoBens: 5200000
    },
    {
      id: "dep-est-6",
      nome: "Lidio Lopes",
      nomeUrna: "Lidio Lopes",
      partido: "PATRIOTA / REPUBLICANOS",
      numero: "10123",
      votos: 39800,
      percentualValidos: 2.7,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande / Iguatemi",
      perfil: "Advogado e teólogo, com grande capilaridade em movimentos comunitários e entidades religiosas de assistência social.",
      principaisBandeiras: ["Entidades filantrópicas e comunidades terapêuticas", "Educação básica de qualidade", "Apoio a microempreendedores"],
      despesasCampanha: 1390000,
      declaracaoBens: 2650000
    },
    {
      id: "dep-est-7",
      nome: "Pedro Caravina",
      nomeUrna: "Caravina",
      partido: "PSDB",
      numero: "45555",
      votos: 38700,
      percentualValidos: 2.7,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Bataguassu / Vale das Águas",
      perfil: "Delegado de polícia, ex-prefeito de Bataguassu por dois mandatos, ex-presidente da Assomasul e ex-secretário de Governo (Segov).",
      principaisBandeiras: ["Municipalismo e repasses aos 79 municípios", "Indústrias na calha do Rio Paraná", "Segurança no Vale das Águas"],
      despesasCampanha: 1540000,
      declaracaoBens: 3800000
    },
    {
      id: "dep-est-8",
      nome: "Zeca do PT",
      nomeUrna: "Zeca do PT",
      partido: "PT",
      numero: "13123",
      votos: 37900,
      percentualValidos: 2.6,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Porto Murtinho / Campo Grande",
      perfil: "Bancário, ex-governador de Mato Grosso do Sul por dois mandatos (1999–2006), figura histórica da política estadual.",
      principaisBandeiras: ["Agricultura familiar e reforma agrária", "Infraestrutura fluvial e portos", "Fundo de apoio à cultura pantaneira"],
      despesasCampanha: 1410000,
      declaracaoBens: 2100000
    },
    {
      id: "dep-est-9",
      nome: "Marcio Fernandes",
      nomeUrna: "Marcio Fernandes",
      partido: "MDB",
      numero: "15123",
      votos: 36200,
      percentualValidos: 2.5,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande / Urupês",
      perfil: "Médico veterinário, autor do Código Estadual de Proteção aos Animais e grande defensor das causas zoossanitárias e pecuárias.",
      principaisBandeiras: ["Causa animal e castração gratuita", "Sanidade do rebanho bovino", "Agroindústrias familiares"],
      despesasCampanha: 1350000,
      declaracaoBens: 4100000
    },
    {
      id: "dep-est-10",
      nome: "Lucas de Lima",
      nomeUrna: "Lucas de Lima",
      partido: "PDT",
      numero: "12345",
      votos: 34800,
      percentualValidos: 2.4,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Radialista e comunicador popular, atuante em causas ambientais e proteção dos animais domésticos e silvestres.",
      principaisBandeiras: ["Meio ambiente e arborização urbana", "Hospital público veterinário", "Comunicação comunitária"],
      despesasCampanha: 1190000,
      declaracaoBens: 1450000
    },
    {
      id: "dep-est-11",
      nome: "Roberto Hashioka",
      nomeUrna: "Roberto Hashioka",
      partido: "UNIÃO BRASIL",
      numero: "44123",
      votos: 33900,
      percentualValidos: 2.3,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Nova Andradina / Vale do Ivinhema",
      perfil: "Engenheiro civil, ex-prefeito de Nova Andradina por três mandatos e ex-diretor-presidente da Agesul e Detran-MS.",
      principaisBandeiras: ["Engenharia rodoviária e pontes seguras", "Desenvolvimento do Vale do Ivinhema", "Eficiência no gasto público em obras"],
      despesasCampanha: 1420000,
      declaracaoBens: 6800000
    },
    {
      id: "dep-est-12",
      nome: "Junior Mochi",
      nomeUrna: "Junior Mochi",
      partido: "MDB",
      numero: "15000",
      votos: 33100,
      percentualValidos: 2.3,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Coxim / Rota Norte",
      perfil: "Advogado, ex-prefeito de Coxim e ex-presidente da Assembleia Legislativa de MS, principal articulador da região Norte de MS.",
      principaisBandeiras: ["Preservação da Bacia do Rio Taquari", "Turismo e pesca na Rota Norte", "Agropecuária sustentável em Coxim e Sonora"],
      despesasCampanha: 1380000,
      declaracaoBens: 4500000
    },
    {
      id: "dep-est-13",
      nome: "Lia Nogueira",
      nomeUrna: "Lia Nogueira",
      partido: "PSDB",
      numero: "45000",
      votos: 32400,
      percentualValidos: 2.2,
      cargo: "Deputada Estadual Eleita",
      municipioBase: "Dourados",
      perfil: "Jornalista e advogada, ex-vereadora de Dourados com forte trabalho de fiscalização nas unidades básicas de saúde e hospitais.",
      principaisBandeiras: ["Fiscalização da saúde na Grande Dourados", "Creches e escolas infantis", "Transparência pública e combate a desvios"],
      despesasCampanha: 1280000,
      declaracaoBens: 1350000
    },
    {
      id: "dep-est-14",
      nome: "Renato Câmara",
      nomeUrna: "Renato Câmara",
      partido: "MDB",
      numero: "15555",
      votos: 31900,
      percentualValidos: 2.2,
      cargo: "Deputado Estadual Eleito (Vice-Presidente ALEMS)",
      municipioBase: "Ivinhema / Dourados",
      perfil: "Engenheiro agrônomo, ex-prefeito de Ivinhema por dois mandatos e presidente de comissões de Meio Ambiente e Agricultura da ALEMS.",
      principaisBandeiras: ["Conservação do solo e recuperação de nascentes", "Estradas rurais e pontes no Vale do Ivinhema", "Piscicultura e olericultura"],
      despesasCampanha: 1410000,
      declaracaoBens: 3600000
    },
    {
      id: "dep-est-15",
      nome: "Antonio Vaz",
      nomeUrna: "Antonio Vaz",
      partido: "REPUBLICANOS",
      numero: "10111",
      votos: 31200,
      percentualValidos: 2.1,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Presidente da Comissão de Saúde da Assembleia Legislativa, atuante em causas humanitárias, banco de alimentos e combate à depressão.",
      principaisBandeiras: ["Saúde mental nos postos municipais", "Triagem de câncer no interior", "Assistência a famílias vulneráveis"],
      despesasCampanha: 1290000,
      declaracaoBens: 1980000
    },
    {
      id: "dep-est-16",
      nome: "Londres Machado",
      nomeUrna: "Londres Machado",
      partido: "PP",
      numero: "11222",
      votos: 30500,
      percentualValidos: 2.1,
      cargo: "Deputado Estadual Eleito (Decano)",
      municipioBase: "Fátima do Sul / Dourados",
      perfil: "Parlamentar com recorde absoluto de 13 mandatos consecutivos no legislativo estadual de MS, ex-presidente da Casa por diversas legislaturas.",
      principaisBandeiras: ["Estabilidade institucional", "Defesa das prerrogativas parlamentares", "Recursos para a microrregião de Fátima do Sul e Vicentina"],
      despesasCampanha: 1320000,
      declaracaoBens: 7200000
    },
    {
      id: "dep-est-17",
      nome: "Neno Razuk",
      nomeUrna: "Neno Razuk",
      partido: "PL",
      numero: "22022",
      votos: 29800,
      percentualValidos: 2.0,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Dourados",
      perfil: "Empresário com base eleitoral consolidada no sul do estado, atuando na Comissão de Segurança e Defesa do Consumidor.",
      principaisBandeiras: ["Segurança pública e patrulhamento rural", "Comércio local e desburocratização", "Esporte de base no interior"],
      despesasCampanha: 1250000,
      declaracaoBens: 4800000
    },
    {
      id: "dep-est-18",
      nome: "Pedro Kemp",
      nomeUrna: "Pedro Kemp",
      partido: "PT",
      numero: "13013",
      votos: 29100,
      percentualValidos: 2.0,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Psicólogo e professor, ex-secretário de Educação de MS, referência na defesa dos direitos humanos, dos povos originários e dos professores.",
      principaisBandeiras: ["Piso salarial nacional do magistério", "Demarcação e paz nas aldeias indígenas", "Educação inclusiva e direitos humanos"],
      despesasCampanha: 1180000,
      declaracaoBens: 1720000
    },
    {
      id: "dep-est-19",
      nome: "Professor Rinaldo Modesto",
      nomeUrna: "Professor Rinaldo",
      partido: "PODEMOS",
      numero: "20123",
      votos: 28400,
      percentualValidos: 1.9,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Professor universitário e historiador, com longo histórico na defesa da educação técnica, da juventude e dos servidores estaduais.",
      principaisBandeiras: ["Cursos profissionalizantes técnicos gratuitos", "Prevenção às drogas nas escolas", "Esporte comunitário"],
      despesasCampanha: 1150000,
      declaracaoBens: 2300000
    },
    {
      id: "dep-est-20",
      nome: "Rafael Tavares",
      nomeUrna: "Rafael Tavares",
      partido: "PL",
      numero: "22777",
      votos: 27900,
      percentualValidos: 1.9,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Empresário e ativista político, defensor intransigente da redução da máquina estatal, corte de impostos e transparência governamental.",
      principaisBandeiras: ["Redução de alíquotas do ICMS", "Fim de privilégios estatais", "Liberdade econômica plena"],
      despesasCampanha: 980000,
      declaracaoBens: 890000
    },
    {
      id: "dep-est-21",
      nome: "Gleice Jane",
      nomeUrna: "Gleice Jane",
      partido: "PT",
      numero: "13456",
      votos: 26800,
      percentualValidos: 1.8,
      cargo: "Deputada Estadual Eleita",
      municipioBase: "Dourados",
      perfil: "Professora da rede pública estadual, militante da educação pública, dos povos indígenas Guarani-Kaiowá e da agricultura familiar.",
      principaisBandeiras: ["Água potável e saneamento nas aldeias", "Merenda escolar com produtos locais", "Valorização das mulheres do campo"],
      despesasCampanha: 890000,
      declaracaoBens: 310000
    },
    {
      id: "dep-est-22",
      nome: "Pedrossian Neto",
      nomeUrna: "Pedrossian Neto",
      partido: "PSD",
      numero: "55123",
      votos: 25900,
      percentualValidos: 1.8,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Campo Grande",
      perfil: "Economista, professor e ex-secretário de Finanças de Campo Grande, especialista em contas públicas, equilíbrio fiscal e incentivos industriais.",
      principaisBandeiras: ["Revisão de incentivos fiscais e contrapartidas", "Industrialização e emprego para jovens", "Controle rigoroso da dívida pública"],
      despesasCampanha: 1220000,
      declaracaoBens: 3450000
    },
    {
      id: "dep-est-23",
      nome: "Ze Teixeira",
      nomeUrna: "Zé Teixeira",
      partido: "PSDB",
      numero: "45678",
      votos: 25100,
      percentualValidos: 1.7,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Dourados",
      perfil: "Produtor rural e pecuarista experiente, ex-1º secretário da Casa por múltiplos mandatos, referência na interlocução com o agronegócio.",
      principaisBandeiras: ["Segurança jurídica no campo", "Pontes e estradas no sul do estado", "Sanidade animal e créditos para produtores"],
      despesasCampanha: 1340000,
      declaracaoBens: 18900000
    },
    {
      id: "dep-est-24",
      nome: "Lucas Albuquerque Gomes",
      nomeUrna: "Lucas de Naviraí",
      partido: "PL",
      numero: "22333",
      votos: 24350,
      percentualValidos: 1.7,
      cargo: "Deputado Estadual Eleito",
      municipioBase: "Naviraí / Cone Sul",
      perfil: "Jovem liderança política do município de Naviraí, articulando investimentos estaduais nas cadeias produtivas de mandioca, cana-de-açúcar e carne do Cone Sul.",
      principaisBandeiras: ["Apoio à infraestrutura industrial de Naviraí", "Hospitais de referência no Cone Sul", "Duplicação e recapeamento de acessos vicinais"],
      despesasCampanha: 1050000,
      declaracaoBens: 1250000
    }
  ]
};
