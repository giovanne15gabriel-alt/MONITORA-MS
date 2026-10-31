/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InteractiveMSMap } from './components/map/InteractiveMSMap.tsx';
import { MunicipioPanel } from './components/panel/MunicipioPanel.tsx';
import { Header } from './components/layout/Header.tsx';
import { FontesOficiaisModal } from './components/modals/FontesOficiaisModal.tsx';
import { MunicipiosListModal } from './components/modals/MunicipiosListModal.tsx';
import { TceModal } from './components/modals/TceModal.tsx';
import { GovernoMsModal } from './components/modals/GovernoMsModal.tsx';
import { LegislativoModal } from './components/modals/LegislativoModal.tsx';
import { Eleicoes2026Modal } from './components/modals/Eleicoes2026Modal.tsx';
import { MunicipioMS } from './data/municipiosData.ts';

export default function App() {
  const [selectedMunicipio, setSelectedMunicipio] = useState<MunicipioMS | null>(null);
  const [isFontesOpen, setIsFontesOpen] = useState(false);
  const [isQuickListOpen, setIsQuickListOpen] = useState(false);
  const [isTceOpen, setIsTceOpen] = useState(false);
  const [isGovernoOpen, setIsGovernoOpen] = useState(false);
  const [isLegislativoOpen, setIsLegislativoOpen] = useState(false);
  const [isEleicoesOpen, setIsEleicoesOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Header */}
      <Header
        onOpenFontes={() => setIsFontesOpen(true)}
        onResetView={() => setSelectedMunicipio(null)}
        onOpenQuickList={() => setIsQuickListOpen(true)}
        onOpenTce={() => setIsTceOpen(true)}
        onOpenGoverno={() => setIsGovernoOpen(true)}
        onOpenLegislativo={() => setIsLegislativoOpen(true)}
        onOpenEleicoes={() => setIsEleicoesOpen(true)}
      />

      {/* Main Fullscreen Interactive 3D Map of MS */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <InteractiveMSMap
          selectedMunicipio={selectedMunicipio}
          onSelectMunicipio={setSelectedMunicipio}
          onOpenTce={() => setIsTceOpen(true)}
          onOpenGoverno={() => setIsGovernoOpen(true)}
          onOpenLegislativo={() => setIsLegislativoOpen(true)}
          onOpenEleicoes={() => setIsEleicoesOpen(true)}
        />

        {/* Slide-in Side Panel for Selected Municipality */}
        <MunicipioPanel
          municipio={selectedMunicipio}
          onClose={() => setSelectedMunicipio(null)}
        />
      </main>

      {/* Eleições 2026 · Composição 2027–2030 Modal */}
      <Eleicoes2026Modal
        isOpen={isEleicoesOpen}
        onClose={() => setIsEleicoesOpen(false)}
      />

      {/* Tribunal de Contas de MS (TCE-MS) Modal */}
      <TceModal
        isOpen={isTceOpen}
        onClose={() => setIsTceOpen(false)}
      />

      {/* Governo do Estado de MS (Orçamento Real LRF, Secretarias & Obras) Modal */}
      <GovernoMsModal
        isOpen={isGovernoOpen}
        onClose={() => setIsGovernoOpen(false)}
        onOpenEleicoes={() => setIsEleicoesOpen(true)}
      />

      {/* Poder Legislativo de MS (ALEMS · 24 Dep. Estaduais e 8 Dep. Federais) Modal */}
      <LegislativoModal
        isOpen={isLegislativoOpen}
        onClose={() => setIsLegislativoOpen(false)}
        onOpenEleicoes={() => setIsEleicoesOpen(true)}
      />

      {/* Fontes Primárias Oficiais & SEBRAE (PDF e DataSebrae Validado) Modal */}
      <FontesOficiaisModal
        isOpen={isFontesOpen}
        onClose={() => setIsFontesOpen(false)}
      />

      {/* All 79 Municipalities Table/Ranking Modal */}
      <MunicipiosListModal
        isOpen={isQuickListOpen}
        onClose={() => setIsQuickListOpen(false)}
        onSelectMunicipio={(m) => {
          setSelectedMunicipio(m);
        }}
      />
    </div>
  );
}
