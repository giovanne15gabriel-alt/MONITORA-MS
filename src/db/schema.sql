-- ============================================================================
-- PLATAFORMA CÍVICA DE TRANSPARÊNCIA PÚBLICA - MATO GROSSO DO SUL (79 MUNICÍPIOS)
-- ESQUEMA DE BANCO DE DADOS RELACIONAL (POSTGRESQL 15+ / SUPABASE / CLOUD SQL)
-- ============================================================================

-- Habilitar extensões úteis para geolocalização e geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. TABELA DE MUNICÍPIOS
CREATE TABLE IF NOT EXISTS municipios (
    id_ibge INTEGER PRIMARY KEY,                      -- Código oficial IBGE de 7 dígitos (ex: 5002704 para Campo Grande)
    nome VARCHAR(120) NOT NULL,
    uf CHAR(2) NOT NULL DEFAULT 'MS',
    regiao VARCHAR(60) NOT NULL,                      -- Pantanal, Bolsão, Grande Dourados, Cone Sul, Central, Norte, Sudoeste, Leste
    populacao INTEGER NOT NULL,                       -- Censo Demográfico mais recente (IBGE)
    area_km2 NUMERIC(10, 2),
    densidade_demografica NUMERIC(8, 2),
    idhm NUMERIC(4, 3),                               -- Índice de Desenvolvimento Humano Municipal
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    portal_prefeitura_url TEXT,
    portal_camara_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE GESTÕES DO PODER EXECUTIVO (PREFEITOS E VICES)
CREATE TABLE IF NOT EXISTS gestao_executivo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER NOT NULL REFERENCES municipios(id_ibge) ON DELETE CASCADE,
    mandato_inicio INTEGER NOT NULL,                  -- ex: 2021
    mandato_fim INTEGER NOT NULL,                     -- ex: 2024 ou 2028
    prefeito_nome VARCHAR(150) NOT NULL,
    prefeito_partido VARCHAR(20) NOT NULL,
    vice_prefeito_nome VARCHAR(150),
    vice_prefeito_partido VARCHAR(20),
    email_contato VARCHAR(120),
    situacao_mandato VARCHAR(30) DEFAULT 'Em exercício', -- Em exercício, Afastado, Renúncia, Cassado
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unq_gestao_mandato UNIQUE (municipio_ibge, mandato_inicio, mandato_fim)
);

-- 3. TABELA DE VEREADORES (PODER LEGISLATIVO)
CREATE TABLE IF NOT EXISTS vereadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER NOT NULL REFERENCES municipios(id_ibge) ON DELETE CASCADE,
    id_externo_camara VARCHAR(100),                  -- Código ou ID no portal da câmara / Assomasul
    nome_completo VARCHAR(180) NOT NULL,
    nome_urna VARCHAR(100) NOT NULL,
    partido VARCHAR(20) NOT NULL,
    cargo VARCHAR(80) DEFAULT 'Vereador',             -- Presidente da Câmara, 1º Secretário, Vereador
    legislatura_inicio INTEGER NOT NULL,              -- ex: 2021
    legislatura_fim INTEGER NOT NULL,                 -- ex: 2024
    salario_base NUMERIC(12, 2) NOT NULL,             -- Subsídio bruto fixado em lei municipal (R$)
    salario_liquido_medio NUMERIC(12, 2),             -- Salário líquido estimado (R$)
    verba_indenizatoria_media NUMERIC(12, 2) DEFAULT 0, -- Cota para o Exercício da Atividade Parlamentar (CEAP) média mensal
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE DESPESAS DE GABINETE / VERBAS INDENIZATÓRIAS DISCRIMINADAS
CREATE TABLE IF NOT EXISTS gastos_gabinete (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vereador_id UUID NOT NULL REFERENCES vereadores(id) ON DELETE CASCADE,
    municipio_ibge INTEGER NOT NULL REFERENCES municipios(id_ibge) ON DELETE CASCADE,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
    categoria VARCHAR(100) NOT NULL,                  -- Combustíveis, Divulgação Parlamentar, Consultoria Jurídica, Passagens, Locação
    fornecedor_nome VARCHAR(180),
    fornecedor_cnpj_cpf VARCHAR(20),
    numero_documento VARCHAR(80),
    descricao TEXT,
    valor NUMERIC(12, 2) NOT NULL,
    data_emissao DATE,
    url_comprovante_pdf TEXT,                         -- Link para nota fiscal digitalizada
    validado_via_ia BOOLEAN DEFAULT FALSE,            -- Marcador de extração via LLM OCR/PDF
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE BALANÇOS E FINANÇAS PÚBLICAS (ORIGEM: TCE-MS E PORTAIS DE TRANSPARÊNCIA)
CREATE TABLE IF NOT EXISTS financas_anuais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_ibge INTEGER NOT NULL REFERENCES municipios(id_ibge) ON DELETE CASCADE,
    ano_exercicio INTEGER NOT NULL,
    receita_prevista NUMERIC(15, 2) NOT NULL,          -- Lei Orçamentária Anual (LOA)
    receita_realizada NUMERIC(15, 2) NOT NULL,         -- Receita total arrecadada
    despesa_fixada NUMERIC(15, 2) NOT NULL,
    despesa_executada NUMERIC(15, 2) NOT NULL,         -- Despesa liquidada/paga
    divida_ativa NUMERIC(15, 2) NOT NULL DEFAULT 0,    -- Créditos tributários e não tributários inscritos em Dívida Ativa
    divida_consolidada NUMERIC(15, 2) NOT NULL DEFAULT 0, -- Dívida Pública Fundada / Consolidada Líquida
    gasto_legislativo_total NUMERIC(15, 2) NOT NULL,   -- Duodécimo e repasses à Câmara de Vereadores
    indice_transparencia_tce NUMERIC(3, 1),           -- Nota de Transparência atribuída pelo TCE-MS (0.0 a 10.0)
    situacao_fiscal VARCHAR(30) DEFAULT 'Regular',     -- Regular, Alerta, Crítica (baseado em limites da LRF)
    data_consolidacao_tce DATE NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unq_municipio_exercicio UNIQUE (municipio_ibge, ano_exercicio)
);

-- 6. TABELA DE AUDITORIA E LOGS DOS SCRAPERS / CRON JOBS
CREATE TABLE IF NOT EXISTS scrapes_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fonte VARCHAR(50) NOT NULL,                       -- 'TCE_MS_API', 'PORTAL_CAMARA_ASSOMASUL', 'IBGE_API'
    municipio_ibge INTEGER REFERENCES municipios(id_ibge),
    executado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL,                      -- 'SUCESSO', 'FALHA', 'PARCIAL'
    registros_processados INTEGER DEFAULT 0,
    erros_encontrados TEXT,
    duracao_ms INTEGER
);

-- ============================================================================
-- ÍNDICES DE ALTA PERFORMANCE PARA O FRONTEND 3D (CONSULTAS INSTANTÂNEAS)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_municipios_regiao ON municipios(regiao);
CREATE INDEX IF NOT EXISTS idx_vereadores_municipio ON vereadores(municipio_ibge);
CREATE INDEX IF NOT EXISTS idx_gastos_gabinete_vereador ON gastos_gabinete(vereador_id, ano);
CREATE INDEX IF NOT EXISTS idx_gastos_gabinete_categoria ON gastos_gabinete(categoria);
CREATE INDEX IF NOT EXISTS idx_financas_municipio_ano ON financas_anuais(municipio_ibge, ano_exercicio DESC);

-- ============================================================================
-- VIEW MATERIALIZADA: RESUMO RÁPIDO PARA O MAPA 3D (ZERO LATÊNCIA)
-- ============================================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_municipios_mapa_3d AS
SELECT 
    m.id_ibge,
    m.nome,
    m.regiao,
    m.populacao,
    m.latitude,
    m.longitude,
    g.prefeito_nome,
    g.prefeito_partido,
    f.divida_ativa,
    f.divida_consolidada,
    ROUND(f.divida_consolidada / NULLIF(m.populacao, 0), 2) AS divida_por_habitante,
    f.receita_prevista,
    f.receita_realizada,
    f.despesa_executada,
    f.gasto_legislativo_total,
    ROUND(f.gasto_legislativo_total / NULLIF(m.populacao, 0), 2) AS gasto_legislativo_por_habitante,
    f.indice_transparencia_tce,
    f.situacao_fiscal,
    COUNT(v.id) AS total_vereadores,
    ROUND(AVG(v.salario_base), 2) AS salario_medio_vereador,
    ROUND(SUM(v.verba_indenizatoria_media * 12), 2) AS verba_gabinete_anual_estimada
FROM municipios m
LEFT JOIN gestao_executivo g ON g.municipio_ibge = m.id_ibge AND g.mandato_fim >= EXTRACT(YEAR FROM CURRENT_DATE)
LEFT JOIN financas_anuais f ON f.municipio_ibge = m.id_ibge AND f.ano_exercicio = EXTRACT(YEAR FROM CURRENT_DATE) - 1
LEFT JOIN vereadores v ON v.municipio_ibge = m.id_ibge AND v.ativo = TRUE
GROUP BY m.id_ibge, m.nome, m.regiao, m.populacao, m.latitude, m.longitude,
         g.prefeito_nome, g.prefeito_partido, f.divida_ativa, f.divida_consolidada,
         f.receita_prevista, f.receita_realizada, f.despesa_executada,
         f.gasto_legislativo_total, f.indice_transparencia_tce, f.situacao_fiscal;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_municipios_mapa_ibge ON mv_municipios_mapa_3d(id_ibge);
