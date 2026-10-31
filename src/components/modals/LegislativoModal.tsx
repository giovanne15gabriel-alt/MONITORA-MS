/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  DEPUTADOS_ESTADUAIS_MS, 
  DEPUTADOS_FEDERAIS_MS, 
  DeputadoEstadual, 
  DeputadoFederal 
} from '../../data/legislativoMsData.ts';
import { formatCurrency, formatNumber } from '../../utils/formatters.ts';
import { 
  X, 
  Landmark, 
  Users, 
  DollarSign, 
  ExternalLink, 
  Search, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Building,
  Flag,
  Instagram
} from 'lucide-react';

interface LegislativoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEleicoes?: () => void;
}

export const LegislativoModal: React.FC<LegislativoModalProps> = ({ isOpen, onClose, onOpenEleicoes }) => {
  const [activeTab, setActiveTab] = useState<'estaduais' | 'federais'>('estaduais');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartido, setSelectedPartido] = useState('todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filters
  const filteredEstaduais = DEPUTADOS_ESTADUAIS_MS.filter(dep => {
    const matchesSearch = dep.nomeUrna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dep.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dep.municipioBase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPartido = selectedPartido === 'todos' || dep.partido === selectedPartido;
    return matchesSearch && matchesPartido;
  });

  const filteredFederais = DEPUTADOS_FEDERAIS_MS.filter(dep => {
    const matchesSearch = dep.nomeUrna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dep.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dep.municipioBase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPartido = selectedPartido === 'todos' || dep.partido === selectedPartido;
    return matchesSearch && matchesPartido;
  });

  const partidosEstaduais = Array.from(new Set(DEPUTADOS_ESTADUAIS_MS.map(d => d.partido)));
  const partidosFederais = Array.from(new Set(DEPUTADOS_FEDERAIS_MS.map(d => d.partido)));

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Poder Legislativo de Mato Grosso do Sul
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Transparência de Mandatos & Gastos
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Assembleia Legislativa de MS (24 Deputados Estaduais) e Bancada de MS na Câmara (8 Deputados Federais)
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
                <span>Ver Eleitos 2026 (Mandato 2027–2030)</span>
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

        {/* Tab Selection & Search Filters */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('estaduais');
                setSelectedPartido('todos');
                setExpandedId(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'estaduais'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Deputados Estaduais (ALEMS · 24)
            </button>
            <button
              onClick={() => {
                setActiveTab('federais');
                setSelectedPartido('todos');
                setExpandedId(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'federais'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              Deputados Federais (Câmara · 8)
            </button>
          </div>

          {/* Search and Partido Filter */}
          <div className="flex items-center gap-2 flex-1 sm:max-w-md">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por deputado, cidade ou partido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <select
              value={selectedPartido}
              onChange={(e) => setSelectedPartido(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500/50"
            >
              <option value="todos">Todos Partidos</option>
              {(activeTab === 'estaduais' ? partidosEstaduais : partidosFederais).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: DEPUTADOS ESTADUAIS (ALEMS) */}
          {activeTab === 'estaduais' && (
            <div className="space-y-4">
              {/* Summary Stats Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Total de Parlamentares:</div>
                  <div className="text-lg font-bold text-white">24 Deputados Estaduais</div>
                  <div className="text-[11px] text-amber-400">Palácio Guaicurus · Parque dos Poderes</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Subsídio Mensal Fixado:</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">R$ 33.006,39/mês</div>
                  <div className="text-[11px] text-slate-400">75% do subsídio dos Deputados Federais</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Cota CEAP (Verba Indenizatória):</div>
                  <div className="text-lg font-mono font-bold text-cyan-300">Até R$ 42.000,00/mês</div>
                  <div className="text-[11px] text-slate-400">Combustível, divulgação, locação de veículos</div>
                </div>
              </div>

              {/* List of State Deputies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredEstaduais.map((dep) => {
                  const isExpanded = expandedId === dep.id;
                  return (
                    <div 
                      key={dep.id} 
                      className={`p-4 bg-slate-950/60 rounded-xl border transition-all ${
                        isExpanded ? 'border-amber-500/50 shadow-lg' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={dep.fotoUrl} 
                            alt={dep.nomeUrna} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700" 
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{dep.nomeUrna}</h4>
                              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-amber-950/80 text-amber-300 border border-amber-800/80">
                                {dep.partido}
                              </span>
                              {dep.cargoMesa && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded bg-blue-950/80 text-blue-300 border border-blue-800/80">
                                  {dep.cargoMesa}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">{dep.nome}</p>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>Base: <strong className="text-slate-200">{dep.municipioBase}</strong></span>
                              <span>·</span>
                              <span>{formatNumber(dep.votos)} votos</span>
                              {dep.instagramUrl && (
                                <>
                                  <span>·</span>
                                  <a
                                    href={dep.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 font-mono"
                                  >
                                    <Instagram className="w-3 h-3 text-pink-400" />
                                    <span>{dep.instagramHandle || 'Instagram'}</span>
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-400">Gasto CEAP no Ano:</div>
                          <div className="text-sm font-mono font-bold text-amber-300">
                            {formatCurrency(dep.totalGastoCeapAno)}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Méd. {formatCurrency(dep.mediaMensalCeap)}/mês
                          </div>
                        </div>
                      </div>

                      {/* Expandable Breakdown Toggle */}
                      <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span>Subsídio: <strong className="text-emerald-400 font-mono">{formatCurrency(dep.subsidioMensal)}</strong></span>
                        </div>

                        <button
                          onClick={() => setExpandedId(isExpanded ? null : dep.id)}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                        >
                          <span>{isExpanded ? 'Ocultar Detalhes' : 'Ver Gastos da Cota'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Expanded Section with Categories */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-900 space-y-3">
                          <div className="text-xs font-semibold text-slate-300">Detalhamento dos Gastos da Cota (CEAP):</div>
                          <div className="space-y-1.5">
                            {dep.gastosCategorias.map((gasto, i) => (
                              <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 truncate max-w-[240px]">{gasto.categoria}</span>
                                <div className="text-right font-mono">
                                  <span className="text-slate-200 font-medium">{formatCurrency(gasto.valor)}</span>
                                  <span className="text-slate-500 ml-1.5 text-[10px]">({gasto.percentual}%)</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1 text-slate-300 border border-slate-800">
                            <div>Localização: <strong className="text-white">{dep.gabinete}</strong></div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Mail className="w-3 h-3 text-amber-400" />
                              <span>{dep.contatoEmail}</span>
                            </div>
                          </div>

                          <a
                            href={dep.linkTransparencia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium pt-1"
                          >
                            <span>Consultar comprovantes fiscais no Portal da ALEMS</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DEPUTADOS FEDERAIS (CÂMARA DOS DEPUTADOS) */}
          {activeTab === 'federais' && (
            <div className="space-y-4">
              {/* Summary Stats Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Bancada Federal de MS:</div>
                  <div className="text-lg font-bold text-white">8 Deputados Federais</div>
                  <div className="text-[11px] text-amber-400">Congresso Nacional · Brasília (DF)</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Subsídio Bruto Mensal:</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">R$ 44.008,52/mês</div>
                  <div className="text-[11px] text-slate-400">Teto Constitucional Federal</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Cota Parlamentar (CEAP MS):</div>
                  <div className="text-lg font-mono font-bold text-cyan-300">R$ 44.757,98/mês</div>
                  <div className="text-[11px] text-slate-400">Passagens aéreas, combustível, divulgação</div>
                </div>
              </div>

              {/* List of Federal Deputies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredFederais.map((dep) => {
                  const isExpanded = expandedId === dep.id;
                  return (
                    <div 
                      key={dep.id} 
                      className={`p-4 bg-slate-950/60 rounded-xl border transition-all ${
                        isExpanded ? 'border-amber-500/50 shadow-lg' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={dep.fotoUrl} 
                            alt={dep.nomeUrna} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700" 
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{dep.nomeUrna}</h4>
                              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-blue-950/80 text-blue-300 border border-blue-800/80">
                                {dep.partido}
                              </span>
                              {dep.cargoLideranca && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded bg-amber-950/80 text-amber-300 border border-amber-800/80">
                                  {dep.cargoLideranca}
                                </span>
                              )}
                              {dep.legislatura && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded bg-purple-950/80 text-purple-300 border border-purple-800/80">
                                  {dep.legislatura}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">{dep.nome}</p>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>Origem: <strong className="text-slate-200">{dep.municipioBase}</strong></span>
                              <span>·</span>
                              <span>{formatNumber(dep.votos)} votos</span>
                              {dep.instagramUrl && (
                                <>
                                  <span>·</span>
                                  <a
                                    href={dep.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 font-mono"
                                  >
                                    <Instagram className="w-3 h-3 text-pink-400" />
                                    <span>{dep.instagramHandle || 'Instagram'}</span>
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-400">Gasto CEAP no Ano:</div>
                          <div className="text-sm font-mono font-bold text-cyan-300">
                            {formatCurrency(dep.totalCeapAno)}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Méd. {formatCurrency(dep.mediaCeapMensal)}/mês
                          </div>
                        </div>
                      </div>

                      {/* Key Indicators */}
                      <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span>Subsídio: <strong className="text-emerald-400 font-mono">{formatCurrency(dep.subsidioMensal)}</strong></span>
                          <span>·</span>
                          <span>Secretários: <strong className="text-slate-200">{dep.secretariosContratados}/25</strong></span>
                        </div>

                        <button
                          onClick={() => setExpandedId(isExpanded ? null : dep.id)}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                        >
                          <span>{isExpanded ? 'Ocultar Detalhes' : 'Ver Gastos da Cota'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Expanded Section with Categories */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-900 space-y-3">
                          <div className="text-xs font-semibold text-slate-300">Detalhamento da Cota Parlamentar (CEAP):</div>
                          <div className="space-y-1.5">
                            {dep.gastosCategorias.map((gasto, i) => (
                              <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 truncate max-w-[240px]">{gasto.categoria}</span>
                                <div className="text-right font-mono">
                                  <span className="text-slate-200 font-medium">{formatCurrency(gasto.valor)}</span>
                                  <span className="text-slate-500 ml-1.5 text-[10px]">({gasto.percentual}%)</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1 text-slate-300 border border-slate-800">
                            <div>Verba de Gabinete Utilizada: <strong className="text-white font-mono">{formatCurrency(dep.verbaGabineteUtilizada)}/mês</strong> (máx. R$ 125.460,00)</div>
                            <div>Gabinete: <strong className="text-white">{dep.gabineteNumero}</strong></div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Mail className="w-3 h-3 text-cyan-400" />
                              <span>{dep.email}</span>
                            </div>
                          </div>

                          <a
                            href={dep.linkCamara}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium pt-1"
                          >
                            <span>Página oficial e notas fiscais na Câmara dos Deputados</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 shrink-0 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Fontes: Portal da Transparência da ALEMS (al.ms.leg.br) & Dados Abertos da Câmara dos Deputados (camara.leg.br)
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://transparencia.al.ms.leg.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              <span>Portal ALEMS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.camara.leg.br/transparencia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              <span>Transparência Câmara</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
