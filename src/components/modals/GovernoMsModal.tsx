/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GOVERNO_MS_DATA, SecretariaEstadual, ObraEstadual } from '../../data/governoMsData.ts';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters.ts';
import { 
  X, 
  Building2, 
  Users, 
  TrendingUp, 
  HardHat, 
  ShieldCheck, 
  ExternalLink, 
  Clock,
  Scale,
  FileCheck
} from 'lucide-react';

interface GovernoMsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEleicoes?: () => void;
}

export const GovernoMsModal: React.FC<GovernoMsModalProps> = ({ isOpen, onClose, onOpenEleicoes }) => {
  const [activeTab, setActiveTab] = useState<'orcamento' | 'secretarias' | 'obras'>('orcamento');

  if (!isOpen) return null;

  const { governador, viceGovernador, orcamentoGeralEstado, indicadoresLRF, decomposicaoOrcamento, secretarias, obrasEstruturantes } = GOVERNO_MS_DATA;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Governo do Estado de Mato Grosso do Sul (MS)
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Exercício Fiscal 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Poder Executivo Estadual · Governador Eduardo Riedel (PSDB) & Barbosinha (PP)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenEleicoes && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEleicoes();
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg border border-cyan-400/30 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Eleitos 2026 (2027–2030)</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/30 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orcamento')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'orcamento'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Orçamento & Responsabilidade Fiscal (LRF)
          </button>
          <button
            onClick={() => setActiveTab('secretarias')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'secretarias'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Secretarias Estaduais & Orçamentos
          </button>
          <button
            onClick={() => setActiveTab('obras')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'obras'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            Grandes Obras Estruturantes
          </button>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ORÇAMENTO & FISCAL */}
          {activeTab === 'orcamento' && (
            <div className="space-y-6">
              {/* Governor Leadership Card */}
              <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xl shadow-lg shrink-0">
                    ER
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Governador de MS</div>
                    <h4 className="text-lg font-bold text-white">{governador.nome} ({governador.partido})</h4>
                    <p className="text-xs text-slate-400">Mandato: {governador.mandato} · Remuneração: {formatCurrency(governador.salarioBruto)}/mês</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-xl shadow-lg shrink-0">
                    JB
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vice-Governador de MS</div>
                    <h4 className="text-lg font-bold text-white">{viceGovernador.nome} ({viceGovernador.partido})</h4>
                    <p className="text-xs text-slate-400">Remuneração: {formatCurrency(viceGovernador.salarioBruto)}/mês</p>
                  </div>
                </div>
              </div>

              {/* Verified LRF & Fiscal Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-400" />
                      Auditoria Fiscal: Limites da Lei de Responsabilidade Fiscal (LRF)
                    </h4>
                    <p className="text-xs text-slate-400">Dados oficiais apurados pelo RGF / SEFAZ-MS e auditados pelo TCE-MS</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Situação Fiscal Regular
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {indicadoresLRF.map((ind, i) => (
                    <div key={i} className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[11px] font-mono text-cyan-400">{ind.baseLegal}</span>
                          <h5 className="font-bold text-white text-sm mt-0.5">{ind.titulo}</h5>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                          {ind.status}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-mono font-extrabold text-white">
                          {ind.percentual}%
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {ind.valorFormatado} da RCL
                        </div>
                      </div>

                      {/* Visual Limit Meter */}
                      <div className="space-y-1.5 pt-1">
                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${(ind.percentual / ind.limiteLegal) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                          <span>Real: <strong className="text-slate-200">{ind.percentual}%</strong></span>
                          <span>Prudencial: {ind.limitePrudencial}%</span>
                          <span>Teto Legal LRF: <strong className="text-amber-400">{ind.limiteLegal}%</strong></span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 pt-1 border-t border-slate-900 leading-relaxed">
                        {ind.explicacao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOA Budget Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-blue-400" />
                      Composição Geral do Orçamento Anual (LOA)
                    </h4>
                    <p className="text-xs text-slate-400">Total Fixado: {formatCompactCurrency(orcamentoGeralEstado)} (Exercício 2026)</p>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4">
                  <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full" style={{ width: '48.6%' }} title="Pessoal e Encargos (48,6%)" />
                    <div className="bg-amber-500 h-full" style={{ width: '36.1%' }} title="Custeio e Manutenção (36,1%)" />
                    <div className="bg-emerald-500 h-full" style={{ width: '15.3%' }} title="Investimentos e Obras (15,3%)" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {decomposicaoOrcamento.map((cat, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`} />
                          <span className="text-xs font-bold text-slate-200">{cat.categoria}</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-white">
                          {formatCompactCurrency(cat.valor)}
                          <span className="text-xs font-normal text-slate-400 ml-1.5 font-sans">({cat.percentual}%)</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{cat.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECRETARIAS ESTADUAIS */}
          {activeTab === 'secretarias' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Secretarias de Estado & Repasses Orçamentários</h4>
                  <p className="text-xs text-slate-400">Distribuição do orçamento estadual por pasta ministerial em MS</p>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  Total Alocado: {formatCompactCurrency(orcamentoGeralEstado)}
                </div>
              </div>

              <div className="space-y-3">
                {secretarias.map((sec) => (
                  <div key={sec.sigla} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-blue-950/80 text-blue-300 rounded border border-blue-800/60">
                            {sec.sigla}
                          </span>
                          <h5 className="text-sm font-bold text-white">{sec.nome}</h5>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Secretário Titular: <strong className="text-slate-200">{sec.secretario}</strong></p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base font-mono font-bold text-cyan-300">
                          {formatCurrency(sec.orcamentoAnual)}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {sec.participacaoPercentual}% do orçamento total
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-500">Principais projetos:</span>
                      {sec.principaisProjetos.map((proj, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OBRAS ESTRUTURANTES */}
          {activeTab === 'obras' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">Grandes Obras de Infraestrutura em Andamento em MS</h4>
                  <p className="text-xs text-slate-400">Monitoramento oficial de investimentos públicos no Estado</p>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-right">
                  <div className="text-xs text-slate-400">Volume Total em Obras:</div>
                  <div className="text-base font-mono font-bold text-emerald-400">
                    {formatCompactCurrency(GOVERNO_MS_DATA.investimentoTotalObras)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {obrasEstruturantes.map((obra) => (
                  <div key={obra.id} className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            obra.status === 'Fase Final' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                              : 'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}>
                            {obra.status}
                          </span>
                          <span className="text-xs text-slate-400">{obra.secretariaResponsavel}</span>
                        </div>
                        <h5 className="text-base font-bold text-white mt-1">{obra.titulo}</h5>
                        <div className="text-xs text-cyan-400 flex items-center gap-1 mt-0.5">
                          <span>Localização:</span>
                          <strong>{obra.municipios}</strong>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-lg font-mono font-bold text-emerald-300">
                          {formatCurrency(obra.investimentoTotal)}
                        </div>
                        <div className="text-[11px] text-slate-400">Previsão: {obra.prazoEstimado}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{obra.descricao}</p>

                    {/* Progress Bar */}
                    <div className="pt-2 border-t border-slate-900 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          Estágio de Execução Física:
                        </span>
                        <span className="font-mono font-bold text-cyan-400">{obra.percentualConclusao}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${obra.percentualConclusao}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 shrink-0 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Fontes: SEFAZ-MS (RGF), LOA Estadual, Tesouro Nacional e Agesul
          </div>
          <div className="flex items-center gap-2">
            <a
              href={GOVERNO_MS_DATA.painelObrasUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
            >
              <span>Painel de Obras da Agesul</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
