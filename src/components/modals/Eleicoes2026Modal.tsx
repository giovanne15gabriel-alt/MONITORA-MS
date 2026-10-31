/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ELEICOES_2026_MS, EleitoCargo } from '../../data/eleicoes2026Data.ts';
import { formatCurrency, formatNumber } from '../../utils/formatters.ts';
import { 
  X, 
  Vote, 
  Landmark, 
  Users, 
  Building2, 
  ShieldCheck, 
  Search, 
  ExternalLink,
  Award,
  ChevronRight,
  TrendingUp,
  FileText,
  Calendar,
  Sparkles,
  Instagram
} from 'lucide-react';

interface Eleicoes2026ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Eleicoes2026Modal: React.FC<Eleicoes2026ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'governo' | 'senado' | 'federais' | 'estaduais'>('governo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartido, setSelectedPartido] = useState('todos');

  if (!isOpen) return null;

  const data = ELEICOES_2026_MS;

  // Filtered lists
  const filteredEstaduais = data.deputadosEstaduaisEleitos.filter(dep => {
    const matchSearch = dep.nomeUrna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        dep.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        dep.municipioBase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPartido = selectedPartido === 'todos' || dep.partido.includes(selectedPartido);
    return matchSearch && matchPartido;
  });

  const filteredFederais = data.deputadosFederaisEleitos.filter(dep => {
    const matchSearch = dep.nomeUrna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        dep.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        dep.municipioBase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPartido = selectedPartido === 'todos' || dep.partido.includes(selectedPartido);
    return matchSearch && matchPartido;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Eleições 2026 · Composição dos Eleitos (2027–2030)
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                  Mato Grosso do Sul
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Resultado Oficial TSE: Governo do Estado, Senado Federal, Bancada Federal (8 Deputados) e ALEMS (24 Deputados)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Electoral Stats Bar */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400">Eleitorado Apto MS:</span>{' '}
              <strong className="text-white font-mono">{formatNumber(data.aptosVotarMS)}</strong>
            </div>
            <div>
              <span className="text-slate-400">Comparecimento:</span>{' '}
              <strong className="text-emerald-400 font-mono">{data.comparecimentoPercentual}%</strong>
            </div>
            <div>
              <span className="text-slate-400">Abstenção:</span>{' '}
              <strong className="text-amber-400 font-mono">{data.abstencaoPercentual}%</strong>
            </div>
            <div>
              <span className="text-slate-400">Mandato:</span>{' '}
              <strong className="text-cyan-400 font-mono">{data.mandato}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Fontes:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">TSE DivulgaCand</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">ALEMS</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">Câmara dos Deputados</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 bg-slate-900/50 flex gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('governo')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'governo'
                ? 'bg-slate-800 text-cyan-400 border-cyan-400 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Governo do Estado (2027–2030)</span>
          </button>

          <button
            onClick={() => setActiveTab('senado')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'senado'
                ? 'bg-slate-800 text-cyan-400 border-cyan-400 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Senado Federal (2 Senadores Eleitos)</span>
          </button>

          <button
            onClick={() => setActiveTab('federais')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'federais'
                ? 'bg-slate-800 text-cyan-400 border-cyan-400 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Câmara dos Deputados (8 Federais de MS)</span>
          </button>

          <button
            onClick={() => setActiveTab('estaduais')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'estaduais'
                ? 'bg-slate-800 text-cyan-400 border-cyan-400 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ALEMS (24 Deputados Estaduais)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: GOVERNO DO ESTADO */}
          {activeTab === 'governo' && (
            <div className="space-y-6">
              {/* Governor & Vice Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Governador */}
                <div className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/80 rounded-xl space-y-4 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                        Governador Eleito · Mandato 2027–2030
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">
                        {data.governoEleito.governador.nomeUrna}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {data.governoEleito.governador.nome} · {data.governoEleito.governador.partido} (Nº {data.governoEleito.governador.numero})
                      </p>
                      {data.governoEleito.governador.instagramUrl && (
                        <a
                          href={data.governoEleito.governador.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900/60 border border-pink-500/40 text-pink-300 hover:text-white text-xs font-semibold transition-all shadow-sm mt-2"
                        >
                          <Instagram className="w-3.5 h-3.5 text-pink-400" />
                          <span>{data.governoEleito.governador.instagramHandle}</span>
                        </a>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-emerald-400 font-mono">
                        {data.governoEleito.percentualVotos}%
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {formatNumber(data.governoEleito.governador.votos)} votos válidos
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    {data.governoEleito.governador.perfil}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Base Municipal:</span>
                      <span className="font-semibold text-slate-200">{data.governoEleito.governador.municipioBase}</span>
                    </div>
                    <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Orçamento Previsto (LOA 2027):</span>
                      <span className="font-semibold text-cyan-400 font-mono">
                        {formatCurrency(data.governoEleito.orcamentoPrevisto2027)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Principais Bandeiras de Gestão 2027–2030</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {data.governoEleito.governador.principaisBandeiras.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vice-Governador & Coligação */}
                <div className="space-y-5">
                  <div className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/80 rounded-xl space-y-4 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800/50">
                          Vice-Governador Eleito
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">
                          {data.governoEleito.viceGovernador.nomeUrna}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          {data.governoEleito.viceGovernador.nome} · {data.governoEleito.viceGovernador.partido}
                        </p>
                        {data.governoEleito.viceGovernador.instagramUrl && (
                          <a
                            href={data.governoEleito.viceGovernador.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900/60 border border-pink-500/40 text-pink-300 hover:text-white text-xs font-semibold transition-all shadow-sm mt-2"
                          >
                            <Instagram className="w-3.5 h-3.5 text-pink-400" />
                            <span>{data.governoEleito.viceGovernador.instagramHandle}</span>
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-300">
                          {data.governoEleito.viceGovernador.municipioBase}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      {data.governoEleito.viceGovernador.perfil}
                    </p>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 mb-2">Compromissos Estratégicos:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {data.governoEleito.viceGovernador.principaisBandeiras.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Coligação & Metas */}
                  <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                    <div className="text-xs font-semibold text-slate-300">
                      Coligação Majoritária Vitoriosa:
                    </div>
                    <div className="text-xs font-mono text-cyan-300 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-900/50">
                      {data.governoEleito.coligacao}
                    </div>

                    <div className="pt-2 text-xs text-slate-300">
                      <div className="font-semibold text-slate-200 mb-2">Metas Fiscais e de Investimento para MS:</div>
                      <ul className="space-y-1 text-slate-400">
                        {data.governoEleito.principaisMetas.map((m, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: SENADO FEDERAL */}
          {activeTab === 'senado' && (
            <div className="space-y-6">
              <div className="p-4 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-xs text-slate-300 flex items-center gap-3">
                <Landmark className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <strong>Renovação de 2/3 do Senado Federal (Eleições 2026):</strong> Em 2026, o estado de Mato Grosso do Sul elegeu 2 representantes para mandatos de 8 anos (2027 a 2035), que se somam ao senador com mandato em curso até 2030.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.senadoresEleitos.map((sen) => (
                  <div 
                    key={sen.id}
                    className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/80 rounded-xl space-y-4 shadow-lg hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/50">
                          Senador(a) da República Eleito(a)
                        </span>
                        <h3 className="text-xl font-bold text-white mt-2">{sen.nomeUrna}</h3>
                        <p className="text-xs text-slate-400 font-mono">
                          {sen.nome} · {sen.partido} (Nº {sen.numero})
                        </p>
                        {sen.instagramUrl && (
                          <a
                            href={sen.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 font-mono mt-1.5"
                          >
                            <Instagram className="w-3.5 h-3.5" />
                            <span>{sen.instagramHandle || '@instagram'}</span>
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-400 font-mono">
                          {sen.percentualValidos}%
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {formatNumber(sen.votos)} votos
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      {sen.perfil}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Município Base:</span>
                        <span className="font-semibold text-slate-200">{sen.municipioBase}</span>
                      </div>
                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Bens Declarados TSE:</span>
                        <span className="font-semibold text-slate-200 font-mono">{formatCurrency(sen.declaracaoBens)}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 mb-2">Bandeiras no Congresso Nacional:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {sen.principaisBandeiras.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BANCADA FEDERAL (8 DEPUTADOS) */}
          {activeTab === 'federais' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Os 8 Deputados Federais eleitos que representarão Mato Grosso do Sul na 58ª Legislatura da Câmara dos Deputados (2027–2030).
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar por nome ou cidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredFederais.map((dep, idx) => (
                  <div
                    key={dep.id}
                    className="p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl space-y-3 flex flex-col justify-between shadow transition-all hover:border-cyan-500/40"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold border border-cyan-800/50">
                          #{idx + 1} Mais Votado
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-semibold">
                          {dep.partido}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight">{dep.nomeUrna}</h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{dep.nome}</p>
                      {dep.instagramUrl && (
                        <a
                          href={dep.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-pink-400 hover:text-pink-300 font-mono mt-1"
                        >
                          <Instagram className="w-3 h-3 text-pink-400" />
                          <span>{dep.instagramHandle || '@instagram'}</span>
                        </a>
                      )}
                      <p className="text-[11px] text-slate-400 mt-1">Base: <strong className="text-slate-200">{dep.municipioBase}</strong></p>

                      <div className="my-2.5 p-2 bg-slate-950/70 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400 text-[11px]">Votos Válidos:</span>
                        <span className="font-bold text-emerald-400 font-mono">{formatNumber(dep.votos)} ({dep.percentualValidos}%)</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                        {dep.perfil}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Pautas em Brasília:</div>
                      <ul className="text-[11px] text-slate-300 space-y-1">
                        {dep.principaisBandeiras.slice(0, 2).map((b, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                            <span className="truncate">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ALEMS (24 DEPUTADOS ESTADUAIS) */}
          {activeTab === 'estaduais' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Os 24 Deputados Estaduais eleitos para a 13ª Legislatura da Assembleia Legislativa de MS (ALEMS), com posse em 1º de fevereiro de 2027.
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar por parlamentar ou município..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEstaduais.map((dep, idx) => (
                  <div
                    key={dep.id}
                    className="p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl space-y-3 shadow transition-all hover:border-cyan-500/40 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono font-bold">
                          Cadeira #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-semibold border border-cyan-800/50">
                          {dep.partido} (Nº {dep.numero})
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white tracking-tight">{dep.nomeUrna}</h4>
                      <p className="text-xs text-slate-400 font-mono">{dep.nome}</p>
                      
                      <div className="flex items-center justify-between text-xs mt-2 text-slate-300">
                        <span>Base Principal:</span>
                        <strong className="text-cyan-300">{dep.municipioBase}</strong>
                      </div>

                      <div className="my-2 p-2 bg-slate-950/70 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400 text-[11px]">Votação:</span>
                        <span className="font-bold text-emerald-400 font-mono">{formatNumber(dep.votos)} ({dep.percentualValidos}%)</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {dep.perfil}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Destaques da Atuação:</div>
                      <div className="text-[11px] text-slate-300 truncate">
                        • {dep.principaisBandeiras[0]}
                      </div>
                      {dep.principaisBandeiras[1] && (
                        <div className="text-[11px] text-slate-400 truncate">
                          • {dep.principaisBandeiras[1]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dados Oficiais Eleitorais de Mato Grosso do Sul sincronizados via Tribunal Superior Eleitoral (TSE)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
