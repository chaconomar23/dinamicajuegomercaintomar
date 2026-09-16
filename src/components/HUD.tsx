import { Trophy, TrendingUp, ShieldAlert, ArrowDownUp } from 'lucide-react';
import { useGame } from '../useGame';
import { motion, AnimatePresence } from 'motion/react';

export function HUD({ game }: { game: ReturnType<typeof useGame> }) {
  if (game.state.phase === 'HOME' || game.state.phase === 'SETUP' || game.state.phase === 'CONCLUSION') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-24 bg-slate-900/90 border-b border-slate-700/50 backdrop-blur-md z-40 px-6 flex items-center justify-center gap-6 shadow-2xl">
      <AnimatePresence>
        {game.state.teams.map((team, index) => {
          const isWinner = index === 0 && game.state.phase.includes('RESULT');
          return (
            <motion.div
              layout
              key={team.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex-1 max-w-sm flex flex-col bg-slate-800/80 border ${isWinner ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-slate-700'} rounded-xl px-4 py-2 transition-all`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-lg text-white truncate">{team.name}</span>
                <span className={`text-2xl font-black ${isWinner ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {team.score.total} pts
                </span>
              </div>
              
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <div className="flex flex-col items-center">
                  <span className="uppercase text-[10px] text-slate-500">Prod</span>
                  <span className="text-slate-200">{team.stats.production}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="uppercase text-[10px] text-slate-500">Exp</span>
                  <span className="text-emerald-300">{team.stats.exports}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="uppercase text-[10px] text-slate-500">Imp</span>
                  <span className="text-amber-300">{team.stats.imports}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="uppercase text-[10px] text-slate-500">Comp</span>
                  <span className="text-indigo-300">{team.stats.competitiveness}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
