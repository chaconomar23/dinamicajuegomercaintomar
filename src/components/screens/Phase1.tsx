import { motion } from 'motion/react';
import { Settings, ArrowRight, Dices, Info } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { FACTOR_NAMES } from '../../types';

export function Phase1({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  return (
    <Screen>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Fase 1: Dotación de Factores</h2>
          <h1 className="text-6xl font-black text-white">{currentTeam.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-xl text-slate-400">Equipo {game.state.currentTeamIndex + 1} de {game.state.teams.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 flex-1">
        <Card className="flex flex-col justify-center items-center text-center">
          <Settings className="w-24 h-24 text-slate-600 mb-8" />
          <h3 className="text-4xl font-bold mb-4">Descubre tus recursos</h3>
          <p className="text-xl text-slate-400 mb-12">
            Cada nación tiene diferentes niveles de factores de producción. 
            Haz clic en "Analizar País" para revelar tu dotación.
          </p>
          <Button onClick={() => game.randomizeFactors(game.state.currentTeamIndex)} className="text-2xl px-8 py-6 w-full">
            <Dices className="w-8 h-8" />
            Analizar País
          </Button>
        </Card>

        <Card className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-8 text-center">Factores de Producción</h3>
          
          <div className="space-y-8">
            {Object.entries(currentTeam.factors).map(([factor, value]) => {
              const isAbundant = factor === currentTeam.abundantFactor;
              return (
                <div key={factor}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-2xl font-bold ${isAbundant ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {FACTOR_NAMES[factor as keyof typeof FACTOR_NAMES]}
                      {isAbundant && <span className="ml-3 text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider">Abundante</span>}
                    </span>
                    <span className="text-2xl font-mono">{value}</span>
                  </div>
                  <div className="h-6 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${isAbundant ? 'bg-emerald-500' : 'bg-slate-500'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 bg-slate-900/50 p-6 rounded-xl border border-slate-700 flex items-start gap-4">
            <Info className="w-8 h-8 text-amber-400 shrink-0" />
            <p className="text-xl text-slate-300">
              Observa bien. Tu nación tiene abundancia relativa en <strong className="text-white">{FACTOR_NAMES[currentTeam.abundantFactor]}</strong>. 
              Según Heckscher-Ohlin, deberías especializarte en un producto intensivo en este factor.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => game.nextTeam()}>
          Siguiente <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}
