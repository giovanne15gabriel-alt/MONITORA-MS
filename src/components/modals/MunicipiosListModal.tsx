/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MunicipioMS, MUNICIPIOS_DATA } from '../../data/municipiosData.ts';
import { formatCompactCurrency, formatNumber } from '../../utils/formatters.ts';
import { X, Search, ArrowUpDown, ChevronRight, TrendingUp } from 'lucide-react';

interface MunicipiosListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMunicipio: (municipio: MunicipioMS) => void;
}

type SortField = 'populacao' | 'divida' | 'orcamento' | 'nota' | 'nome';

export const MunicipiosListModal: React.FC<MunicipiosListModalProps> = ({
  isOpen,
  onClose,
  onSelectMunicipio
}) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('populacao');
  const [selectedRegiao, setSelectedRegiao] = useState<string>('todas');

  if (!isOpen) return null;

  const regioes = Array.from(new Set(MUNICIPIOS_DATA.map(m => m.regiao)));

  const filtered = useMemo(() => {
    return MUNICIPIOS_DATA.filter(m => {
      const matchSearch = m.nome.toLowerCase().includes(search.toLowerCase()) ||
                          m.prefeito.nome.toLowerCase().includes(search.toLowerCase());
      const matchRegiao = selectedRegiao === 'todas' || m.regiao === selectedRegiao;
      return matchSearch && matchRegiao;
    }).sort((a, b) => {
      if (sortField === 'populacao') return b.populacao - a.populacao;
      if (sortField === 'divida') return b.financas.dividaConsolidada - a.financas.dividaConsolidada;
      if (sortField === 'orcamento') return b.financas.receitaPrevista - a.financas.receitaPrevista;
      if (sortField === 'nota') return b.financas.indiceTransparenciaTCE - a.financas.indiceTransparenciaTCE;
      return a.nome.localeCompare(b.nome);
    });
  }, [search, sortField, selectedRegiao]);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Os 79 Municípios de Mato Grosso do Sul
            </h3>
            <p className="text-xs text-slate-400">
              Dados consolidados do TCE-MS, IBGE e Câmaras Municipais
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Filters */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/30 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar município ou prefeito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedRegiao}
              onChange={(e) => setSelectedRegiao(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="todas">Todas as Microrregiões</option>
              {regioes.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="populacao">Maior População</option>
              <option value="orcamento">Maior Orçamento</option>
              <option value="divida">Maior Dívida Pública</option>
              <option value="nota">Maior Nota TCE-MS</option>
              <option value="nome">Nome Alfabético</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-950/80 sticky top-0 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Município</th>
                <th className="px-4 py-3">Prefeito(a)</th>
                <th className="px-4 py-3 text-right">População</th>
                <th className="px-4 py-3 text-right">Dívida Consolidada</th>
                <th className="px-4 py-3 text-right">Orçamento</th>
                <th className="px-4 py-3 text-right">Nota TCE</th>
                <th className="px-4 py-3 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((m) => (
                <tr
                  key={m.ibge}
                  onClick={() => {
                    onSelectMunicipio(m);
                    onClose();
                  }}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-3">
                    <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.regiaoCor }} />
                      <span>{m.nome}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 ml-4.5">{m.regiao}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-300">{m.prefeito.nome}</div>
                    <div className="text-[11px] text-slate-500">{m.prefeito.partido}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-300">
                    {formatNumber(m.populacao)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-amber-300">
                    {formatCompactCurrency(m.financas.dividaConsolidada)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-400">
                    {formatCompactCurrency(m.financas.receitaPrevista)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-cyan-400">
                    {m.financas.indiceTransparenciaTCE.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      Ver 3D <ChevronRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
