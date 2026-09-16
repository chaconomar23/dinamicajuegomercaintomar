import { motion } from 'motion/react';
import { ArrowRight, Globe, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { EVENTS_CONFIG, PRODUCT_CONFIG } from '../../types';

export function Round3Event({ game }: { game: ReturnType<typeof useGame> }) {
  const event = EVENTS_CONFIG[game.state.currentEvent!];

  return (
    <Screen className="items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="max-w-3xl w-full"
      >
        <div className="mb-8 flex justify-center relative">
          <div className="absolute inset-0 bg-red-500 blur-[100px] opacity-20 rounded-full"></div>
          <Globe className="w-32 h-32 text-red-400 relative z-10 animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-bold text-red-400 uppercase tracking-widest mb-4">¡Noticia de Última Hora!</h2>
        <h1 className="text-7xl font-black text-white mb-8 drop-shadow-lg">{event.title}</h1>
        
        <Card className="text-3xl text-slate-200 leading-relaxed bg-slate-800/80 border-red-500/50 py-12 px-8 mb-12 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
          <p>{event.description}</p>
          <div className="mt-8 flex justify-center gap-6 text-xl">
            <span className="bg-slate-900 px-6 py-2 rounded-full border border-slate-700 text-slate-400">
              Afecta a: <strong className="text-white ml-2">{PRODUCT_CONFIG[event.affectedProduct].name}</strong>
            </span>
            <span className={`px-6 py-2 rounded-full border font-bold flex items-center gap-2 ${
              event.bonus > 0 ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' : 'bg-red-900/30 border-red-500/50 text-red-400'
            }`}>
              {event.bonus > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {event.bonus > 0 ? 'Bonificación de Mercado' : 'Caída de Competitividad'}
            </span>
          </div>
        </Card>
        
        <Button onClick={() => game.startCountdown('ROUND3_DECISION', true)} variant="accent" className="mx-auto text-2xl px-12 py-6">
          Ver Reacción de las Naciones <ArrowRight className="w-8 h-8 ml-2" />
        </Button>
      </motion.div>
    </Screen>
  );
}

export function Round3Decision({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];
  const event = EVENTS_CONFIG[game.state.currentEvent!];

  return (
    <Screen>
      <div className="flex justify-between items-center mb-10 mt-16">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 3: Reacción del Mercado</h2>
          <h1 className="text-6xl font-black text-white">{currentTeam.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 flex-1">
        <Card className="flex flex-col justify-center items-center text-center bg-slate-800/50">
          <AlertTriangle className="w-20 h-20 text-amber-400 mb-6" />
          <h3 className="text-3xl font-bold mb-4">¿Cambio de Estrategia?</h3>
          <p className="text-xl text-slate-400 mb-8">
            El evento mundial afecta a <strong>{PRODUCT_CONFIG[event.affectedProduct].name}</strong>.<br/><br/>
            Actualmente produces <strong>{currentTeam.specialization ? PRODUCT_CONFIG[currentTeam.specialization].name : 'Ninguno'}</strong>.
          </p>
          <div className="text-slate-500 font-bold uppercase text-sm tracking-widest mb-4">
            Puedes cambiar tu producción si usas tu comodín "Cambio de Estrategia".
          </div>
          <div className="bg-slate-900 px-6 py-3 rounded-full border border-slate-700 font-mono text-xl text-amber-400">
            Comodines Disp: {currentTeam.wildcards.CHANGE_STRATEGY}
          </div>
        </Card>

        <Card className="flex flex-col justify-center gap-6 bg-slate-800/50">
          <h3 className="text-2xl font-bold mb-2 text-center text-slate-300">Decisión del Operador</h3>
          <Button 
            onClick={() => {
              if (game.state.currentTeamIndex < game.state.teams.length - 1) {
                game.startCountdown('ROUND3_DECISION');
                game.nextTeamOrPhase('ROUND3_DECISION', 'ROUND3_DECISION');
              } else {
                game.processRound3();
              }
            }}
            className="w-full py-8 text-2xl"
          >
            Mantiene Especialización
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {
              // Simplemente avanzamos. El operador debe usar el Panel para cambiar la especialización primero.
              alert('Usa el Panel del Operador (engranaje inferior derecho) para cambiar la especialización antes de avanzar, y descuenta el comodín si es necesario.');
            }}
            className="w-full py-8 text-2xl border-amber-500 text-amber-400 hover:bg-amber-500/10"
          >
            Desea Cambiar (Usar Panel)
          </Button>
        </Card>
      </div>
    </Screen>
  );
}

export function Round3Results({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen>
      <div className="text-center mb-12 mt-16">
        <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 3: Impacto Mundial</h2>
        <h1 className="text-6xl font-black text-white">Resultados Finales del Evento</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full flex-1">
        {game.state.teams.map((team, i) => {
          const gotBonus = team.score.events > 0;
          const gotPenalty = team.score.events < 0;
          return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.3 }}
            >
              <Card className={`flex flex-col border-l-8 ${
                gotBonus ? 'border-l-emerald-500 bg-emerald-900/10' : 
                gotPenalty ? 'border-l-red-500 bg-red-900/10' : 
                'border-l-slate-500'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-bold text-white">{team.name}</h3>
                  <div className={`text-xl bg-slate-900 px-4 py-1 rounded-full font-mono ${
                    gotBonus ? 'text-emerald-400' : gotPenalty ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {gotBonus ? '+' : ''}{team.score.events} pts
                  </div>
                </div>
                
                <div className="text-lg text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-700/50">
                  {team.consequences.round3}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Button onClick={() => game.setPhase('RANKING')} variant="accent" className="px-12 py-6 text-2xl">
          Ver Ranking Mundial <ArrowRight className="w-8 h-8 ml-2" />
        </Button>
      </div>
    </Screen>
  );
}
