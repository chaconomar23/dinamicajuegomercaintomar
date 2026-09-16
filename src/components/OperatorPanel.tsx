import { useState } from 'react';
import { Settings, Plus, Minus, Zap, Eye, RefreshCw, MessageSquareText } from 'lucide-react';
import { useGame } from '../useGame';
import { WILDCARD_CONFIG, WildcardType } from '../types';

export function OperatorPanel({ game }: { game: ReturnType<typeof useGame> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);

  if (game.state.phase === 'HOME' || game.state.phase === 'SETUP') return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500 transition-all z-50 shadow-2xl"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-slate-800 p-4 border-b border-slate-700 font-bold text-white flex justify-between items-center">
            <span>Panel del Operador</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              {game.state.teams.map((t, i) => (
                <button 
                  key={t.id} 
                  onClick={() => setSelectedTeam(i)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-colors ${selectedTeam === i ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  T{i+1}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Sumar Puntos</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => game.awardPoints(selectedTeam, 'justification', 25)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg border border-slate-700 text-sm">
                    Justificación +25
                  </button>
                  <button onClick={() => game.awardPoints(selectedTeam, 'negotiation', 50)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg border border-slate-700 text-sm">
                    Negociación +50
                  </button>
                  <button onClick={() => game.awardPoints(selectedTeam, 'total', 10)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg border border-slate-700 text-sm">
                    Libre +10
                  </button>
                  <button onClick={() => game.awardPoints(selectedTeam, 'total', -10)} className="bg-slate-800 hover:bg-red-900/50 text-slate-300 py-2 rounded-lg border border-slate-700 text-sm">
                    Libre -10
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Dar Comodín (Gana Pregunta)</h4>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.entries(WILDCARD_CONFIG) as [WildcardType, typeof WILDCARD_CONFIG[WildcardType]][]).map(([key, config]) => (
                    <div key={key} className="flex justify-between items-center bg-slate-800 p-2 rounded-lg border border-slate-700">
                      <span className="text-sm font-bold text-slate-300">{config.name} ({game.state.teams[selectedTeam].wildcards[key]})</span>
                      <div className="flex gap-2">
                        <button onClick={() => game.useWildcard(selectedTeam, key)} className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center hover:bg-red-900/50 text-white">-</button>
                        <button onClick={() => game.awardWildcard(selectedTeam, key, 1)} className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center hover:bg-emerald-600 text-white">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
