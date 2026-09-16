import { Trophy, ArrowRight, Medal, Sparkles } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { motion } from 'motion/react';
import { WildcardType } from '../../types';

export function Ranking({ game }: { game: ReturnType<typeof useGame> }) {
  const { teams } = game.state;

  const countTotalWildcards = (team: any): number => {
    return Number(Object.values(team.wildcards).reduce((a: any, b: any) => a + b, 0));
  };

  return (
    <Screen>
      <div className="text-center mb-12 mt-16">
        <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8" />
          Resultados Finales
        </h2>
        <h1 className="text-6xl font-black text-white drop-shadow-lg">RANKING MUNDIAL</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full flex-1">
        {teams.map((team, index) => {
          const isWinner = index === 0;
          return (
            <motion.div
              key={team.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className={`relative overflow-hidden ${
                isWinner ? 'bg-gradient-to-r from-amber-900/40 to-emerald-900/40 border-amber-500/50' : ''
              }`}>
                {isWinner && (
                  <div className="absolute top-0 right-0 p-4">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </div>
                )}
                
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-900 rounded-full border-2 border-slate-700 shrink-0">
                    {index === 0 && <Medal className="w-8 h-8 text-amber-400" />}
                    {index === 1 && <Medal className="w-8 h-8 text-slate-300" />}
                    {index === 2 && <Medal className="w-8 h-8 text-amber-700" />}
                    {index > 2 && <span className="text-2xl font-bold text-slate-500">{index + 1}</span>}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-4xl font-black mb-2 ${isWinner ? 'text-amber-400' : 'text-white'}`}>
                      {team.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                      <div className="bg-slate-900/50 px-3 py-1 rounded-md">Esp: <span className="text-emerald-400">+{team.score.specialization}</span></div>
                      <div className="bg-slate-900/50 px-3 py-1 rounded-md">Prod: <span className="text-emerald-400">+{team.score.production}</span></div>
                      <div className="bg-slate-900/50 px-3 py-1 rounded-md">Exp: <span className="text-emerald-400">+{team.score.export}</span></div>
                      <div className="bg-slate-900/50 px-3 py-1 rounded-md">Imp: <span className="text-emerald-400">+{team.score.import}</span></div>
                      {team.score.negotiation > 0 && <div className="bg-slate-900/50 px-3 py-1 rounded-md">Negociación: <span className="text-indigo-400">+{team.score.negotiation}</span></div>}
                      {team.score.events !== 0 && <div className="bg-slate-900/50 px-3 py-1 rounded-md">Eventos: <span className={team.score.events > 0 ? 'text-emerald-400' : 'text-red-400'}>{team.score.events > 0 ? '+' : ''}{team.score.events}</span></div>}
                      {countTotalWildcards(team) > 0 && (
                        <div className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-md border border-indigo-500/30">
                          Comodines ganados: {countTotalWildcards(team)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-6xl font-black text-white">{team.score.total}</div>
                    <div className="text-slate-400 uppercase tracking-widest text-sm font-bold">Puntos</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center mb-8">
        <Button onClick={() => game.setPhase('CONCLUSION')} className="px-12">
          Ver Conclusión <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </Screen>
  );
}

