/**
 * Coordenadas percentuais (x%, y%) dos 79 municípios de Mato Grosso do Sul
 * calibradas diretamente sobre o mapa oficial de referência (696x537)
 */

export interface PosicaoMapa {
  x: number; // Porcentagem de 0 a 100% da largura
  y: number; // Porcentagem de 0 a 100% da altura
}

export const MAPA_POSICOES_MS: Record<string, PosicaoMapa> = {
  // PANTANAL (Amarelo)
  "corumba": { x: 18.5, y: 24.5 },
  "ladario": { x: 18.8, y: 26.5 },
  "miranda": { x: 32.5, y: 41.5 },
  "aquidauana": { x: 40.5, y: 37.8 },
  "anastacio": { x: 43.5, y: 49.0 },

  // ROTA NORTE (Verde Lima)
  "sonora": { x: 56.5, y: 7.2 },
  "pedro-gomes": { x: 64.0, y: 12.0 },
  "coxim": { x: 62.5, y: 17.5 },
  "alcinopolis": { x: 74.0, y: 15.0 },
  "costa-rica": { x: 82.5, y: 17.5 },
  "figueirao": { x: 73.5, y: 22.0 },
  "rio-verde-de-mato-grosso": { x: 54.0, y: 23.0 },
  "sao-gabriel-do-oeste": { x: 63.5, y: 28.5 },
  "camapua": { x: 71.5, y: 31.0 },
  "paraiso-das-aguas": { x: 83.5, y: 28.5 },
  "bandeirantes": { x: 65.5, y: 35.5 },

  // VALE DO APORÉ (Lilás)
  "chapadao-do-sul": { x: 90.0, y: 23.5 },
  "cassilandia": { x: 98.0, y: 27.5 },
  "inocencia": { x: 88.0, y: 34.5 },
  "paranaiba": { x: 96.5, y: 34.0 },
  "aparecida-do-taboado": { x: 98.5, y: 40.5 },

  // COSTA LESTE (Vermelho)
  "agua-clara": { x: 84.5, y: 36.5 },
  "selviria": { x: 93.5, y: 44.5 },
  "tres-lagoas": { x: 89.0, y: 51.5 },
  "brasilandia": { x: 88.5, y: 57.5 },
  "santa-rita-do-pardo": { x: 84.5, y: 57.5 },
  "bataguassu": { x: 87.0, y: 64.5 },
  "anaurilandia": { x: 87.0, y: 70.0 },

  // CAMINHO DOS IPÊS (Laranja)
  "rio-negro": { x: 55.5, y: 32.5 },
  "corguinho": { x: 55.0, y: 36.5 },
  "rochedo": { x: 60.5, y: 38.5 },
  "jaraguari": { x: 66.0, y: 43.5 },
  "ribas-do-rio-pardo": { x: 76.0, y: 48.0 },
  "campo-grande": { x: 63.5, y: 48.5 },
  "terenos": { x: 55.5, y: 46.5 },
  "dois-irmaos-do-buriti": { x: 50.5, y: 50.0 },
  "sidrolandia": { x: 57.5, y: 55.5 },
  "nova-alvorada-do-sul": { x: 65.5, y: 60.5 },

  // BONITO E SERRA DA BODOQUENA (Ciano)
  "bodoquena": { x: 31.5, y: 48.0 },
  "bonito": { x: 32.0, y: 56.5 },
  "nioaque": { x: 42.5, y: 56.0 },
  "porto-murtinho": { x: 18.0, y: 63.5 },
  "jardim": { x: 34.5, y: 63.5 },
  "guia-lopes-da-laguna": { x: 42.0, y: 63.5 },
  "bela-vista": { x: 34.0, y: 68.5 },
  "caracol": { x: 23.5, y: 70.5 },

  // GRANDE DOURADOS (Azul Lavanda)
  "maracaju": { x: 51.0, y: 63.5 },
  "rio-brilhante": { x: 61.0, y: 62.5 },
  "itapora": { x: 58.5, y: 68.5 },
  "douradina": { x: 64.0, y: 68.5 },
  "dourados": { x: 59.5, y: 72.0 },
  "deodapolis": { x: 70.5, y: 70.0 },
  "fatima-do-sul": { x: 64.5, y: 72.5 },
  "vicentina": { x: 66.5, y: 74.0 },
  "gloria-de-dourados": { x: 71.0, y: 73.0 },
  "caarapo": { x: 59.0, y: 77.0 },
  "juti": { x: 62.0, y: 80.0 },

  // VALE DAS ÁGUAS (Azul Turquesa)
  "nova-andradina": { x: 78.5, y: 67.5 },
  "angelica": { x: 72.5, y: 69.5 },
  "ivinhema": { x: 74.5, y: 73.0 },
  "novo-horizonte-do-sul": { x: 74.5, y: 76.5 },
  "jatei": { x: 68.5, y: 78.0 },
  "bataipora": { x: 80.0, y: 74.5 },
  "taquarussu": { x: 80.0, y: 78.5 },

  // CAMINHOS DA FRONTEIRA (Verde)
  "antonio-joao": { x: 40.5, y: 72.5 },
  "ponta-pora": { x: 48.5, y: 74.0 },
  "aral-moreira": { x: 47.0, y: 80.0 },
  "laguna-carapa": { x: 52.0, y: 77.5 },
  "amambai": { x: 53.5, y: 84.0 },
  "coronel-sapucaia": { x: 49.5, y: 87.5 },
  "tacuru": { x: 56.5, y: 92.5 },
  "paranhos": { x: 51.5, y: 94.5 },
  "sete-quedas": { x: 55.5, y: 97.5 },

  // 7 CAMINHOS CONE SUL (Roxo)
  "navirai": { x: 69.5, y: 83.0 },
  "itaquirai": { x: 68.5, y: 87.0 },
  "iguatemi": { x: 62.0, y: 90.5 },
  "eldorado": { x: 67.5, y: 93.5 },
  "japora": { x: 61.5, y: 96.0 },
  "mundo-novo": { x: 68.0, y: 97.5 },
};
