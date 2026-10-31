/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TCE_MS_DATA, ConselheiroTCE } from '../../data/tceMsData.ts';
import { formatCurrency, formatCompactCurrency, formatNumber } from '../../utils/formatters.ts';
import { 
  X, 
  Landmark, 
  Users, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  DollarSign,
  Briefcase,
  Award,
  ChevronRight,
  PieChart,
  Scale
} from 'lucide-react';

interface TceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TceModal: React.FC<TceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'conselheiros' | 'orcamento' | 'servidores'>('conselheiros');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Tribunal de Contas do Estado de Mato Grosso do Sul (TCE-MS)
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Dados Abertos 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Órgão de controle externo dos 79 municípios e do Governo de MS · Sede no Parque dos Poderes
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

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/30 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('conselheiros')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'conselheiros'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Corpo Deliberativo (Conselheiros & MPC)
          </button>
          <button
            onClick={() => setActiveTab('orcamento')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'orcamento'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            Gastos & Orçamento Anual (R$ 384,5 mi)
          </button>
          <button
            onClick={() => setActiveTab('servidores')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'servidores'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Quadro de Servidores & Custos
          </button>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CONSELHEIROS & MPC */}
          {activeTab === 'conselheiros' && (
            <div className="space-y-6">
              {/* Executive Summary Card */}
              <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-400">Presidente do TCE-MS:</div>
                  <div className="text-base font-bold text-white mt-0.5">{TCE_MS_DATA.presidente}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Ex-deputado e ex-presidente da ALEMS</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Subsídio Mensal do Conselheiro:</div>
                  <div className="text-lg font-mono font-bold text-amber-300 mt-0.5">
                    {formatCurrency(TCE_MS_DATA.conselheiros[0].subsidioBruto)}
                    <span className="text-xs font-normal text-slate-400">/mês</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Equiparado ao teto constitucional (Desembargador TJMS)
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Custo Anual do Órgão por Habitante:</div>
                  <div className="text-lg font-mono font-bold text-cyan-300 mt-0.5">
                    R$ {TCE_MS_DATA.custoPorHabitanteMS.toFixed(2)}
                    <span className="text-xs font-normal text-slate-400">/cidadão/ano</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">População: ~2,83 milhões de habitantes no MS</div>
                </div>
              </div>

              {/* Councilors Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Composição do Pleno do TCE-MS (Conselheiros Titulares e Substitutos)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {TCE_MS_DATA.conselheiros.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 bg-slate-950/50 hover:bg-slate-950/80 rounded-xl border border-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">
                            {c.nome.charAt(0)}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{c.nome}</h5>
                            <span className="text-[11px] font-medium text-amber-400 block">{c.cargo}</span>
                            <span className="text-[10px] text-slate-500">Posse em: {c.dataPosse}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">Subsídio Bruto</div>
                          <div className="text-sm font-mono font-bold text-slate-100">
                            {formatCurrency(c.subsidioBruto)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Líquido ~ {formatCurrency(c.subsidioLiquidoMedio)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-900 text-[11px] text-slate-400">
                        <p>{c.biografiaBreve}</p>
                        <div className="mt-1 text-[10px] text-slate-500">Formação: {c.formacao}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MPC (Ministério Público de Contas) */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Ministério Público de Contas (MPC / MS)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {TCE_MS_DATA.procuradoresMPC.map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">{p.nome}</div>
                        <div className="text-slate-400 text-[11px]">{p.cargo}</div>
                      </div>
                      <div className="font-mono text-cyan-300 font-bold">
                        {formatCurrency(p.subsidioBruto)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORÇAMENTO & GASTOS */}
          {activeTab === 'orcamento' && (
            <div className="space-y-6">
              {/* Total Budget Card */}
              <div className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Orçamento Anual Consolidado do TCE-MS:</span>
                    <div className="text-3xl font-mono font-bold text-amber-300 mt-1">
                      {formatCurrency(TCE_MS_DATA.orcamentoTotalAnual)}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Fonte de custeio: Duodécimo constitucional repassado mensalmente pelo Tesouro do Estado de MS.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                    <div className="text-2xl font-mono font-bold text-red-400">74,2%</div>
                    <div className="text-[11px] text-slate-400">Destinado a Pessoal</div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-red-500 h-full" style={{ width: '74.2%' }} title="Folha de Pagamento: 74,2%" />
                    <div className="bg-cyan-500 h-full" style={{ width: '11.0%' }} title="Tecnologia & Sistemas: 11,0%" />
                    <div className="bg-amber-500 h-full" style={{ width: '9.0%' }} title="Custeio Geral: 9,0%" />
                    <div className="bg-emerald-500 h-full" style={{ width: '5.8%' }} title="Demais Despesas: 5,8%" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Folha (74,2%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500" /> TI & e-Contas (11%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Custeio Predial (9%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Outros (5,8%)</span>
                  </div>
                </div>
              </div>

              {/* Expense Categories Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Discriminação Detalhada das Despesas do Tribunal
                </h4>

                <div className="space-y-2.5">
                  {TCE_MS_DATA.distribuicaoDespesas.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm font-bold text-white">{item.categoria}</span>
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-amber-300">
                            {formatCurrency(item.valorAnual)}
                          </span>
                          <span className="text-xs text-slate-400 ml-2">({item.percentual}%)</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{item.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVIDORES & FISCALIZAÇÃO */}
          {activeTab === 'servidores' && (
            <div className="space-y-6">
              {/* Personnel Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-white">
                    {TCE_MS_DATA.totalServidores.efetivosConcursados}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Efetivos Concursados</div>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-amber-300">
                    {TCE_MS_DATA.totalServidores.comissionados}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Cargos em Comissão</div>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-cyan-300">
                    {TCE_MS_DATA.totalServidores.auditoresSubstitutos}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Auditores Substitutos</div>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-purple-300">
                    {TCE_MS_DATA.totalServidores.procuradoresMPC}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Procuradores MPC</div>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold font-mono text-emerald-300">
                    {TCE_MS_DATA.totalServidores.estagiarios}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Estagiários</div>
                </div>
              </div>

              {/* Fiscal Action Indicators */}
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Balanço das Ações de Fiscalização (Ano em Curso)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Prestações de Contas Analisadas:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {formatNumber(TCE_MS_DATA.indicadoresFiscalizacao.prestacoesContasAnalisadas)} processos
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Municípios Sob Jurisdição Ativa:</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">79 municípios</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Multas Aplicadas por Irregularidades:</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      R$ {TCE_MS_DATA.indicadoresFiscalizacao.multasImputadasAnoMilhoes.toFixed(1)} milhões
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Valores Preservados / Impugnações:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      R$ {TCE_MS_DATA.indicadoresFiscalizacao.impugnacoesPreservadasMilhoes.toFixed(1)} milhões
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Links */}
        <footer className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 shrink-0 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Fonte: Portal da Transparência do Tribunal de Contas de Mato Grosso do Sul
          </div>
          <div className="flex items-center gap-2">
            <a
              href={TCE_MS_DATA.portalTransparenciaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium"
            >
              <span>Acessar Portal do TCE-MS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
