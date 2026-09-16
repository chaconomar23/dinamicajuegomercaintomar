import { motion } from 'motion/react';
import { Settings, ArrowRight, Dices, Info, Factory, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { FACTOR_NAMES, PRODUCT_CONFIG, Product } from '../../types';

export function Round1Factors({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  return (
    <Screen>
      <div className="flex justify-between items-center mb-12 mt-16">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 1: Análisis de Factores</h2>
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
            Haz clic para revelar tu dotación nacional.
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
              const isScarce = factor === currentTeam.scarceFactor;
              return (
                <div key={factor}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-2xl font-bold ${isAbundant ? 'text-emerald-400' : isScarce ? 'text-red-400' : 'text-slate-300'}`}>
                      {FACTOR_NAMES[factor as keyof typeof FACTOR_NAMES]}
                      {isAbundant && <span className="ml-3 text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider">Abundante</span>}
                      {isScarce && <span className="ml-3 text-sm bg-red-500/20 text-red-300 px-3 py-1 rounded-full uppercase tracking-wider">Escaso</span>}
                    </span>
                    <span className="text-2xl font-mono">{value}</span>
                  </div>
                  <div className="h-6 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${isAbundant ? 'bg-emerald-500' : isScarce ? 'bg-red-500' : 'bg-slate-500'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => {
          if (game.state.currentTeamIndex < game.state.teams.length - 1) {
            game.nextTeamOrPhase('ROUND1_FACTORS', 'ROUND1_FACTORS');
          } else {
            game.startCountdown('ROUND1_DECISION', true);
          }
        }}>
          Siguiente <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}

export function Round1Decision({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  const handleSelectProduct = (product: Product) => {
    game.setSpecialization(game.state.currentTeamIndex, product);
  };

  return (
    <Screen>
      <div className="flex justify-between items-center mb-10 mt-16">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 1: Especialización</h2>
          <h1 className="text-6xl font-black text-white">{currentTeam.name}</h1>
        </div>
        <div className="flex gap-4">
          <div className="text-2xl font-bold text-emerald-400 bg-emerald-900/30 px-6 py-2 rounded-xl border border-emerald-500/30">
            Abundancia: {FACTOR_NAMES[currentTeam.abundantFactor]}
          </div>
          <div className="text-2xl font-bold text-red-400 bg-red-900/30 px-6 py-2 rounded-xl border border-red-500/30">
            Escasez: {FACTOR_NAMES[currentTeam.scarceFactor]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-8 grid grid-cols-2 gap-4">
          {(Object.entries(PRODUCT_CONFIG) as [Product, typeof PRODUCT_CONFIG[Product]][]).map(([key, config]) => {
            const isSelected = currentTeam.specialization === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectProduct(key)}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  isSelected 
                    ? 'bg-emerald-900/40 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="text-3xl font-bold mb-2 text-white">{config.name}</div>
                <div className="text-xl text-slate-400">
                  Intensivo en: <span className="text-emerald-300 font-bold">{FACTOR_NAMES[config.intensiveFactor]}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="col-span-4">
          <Card className="h-full flex flex-col justify-center items-center text-center">
            <Factory className="w-16 h-16 text-slate-600 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Decisión Estratégica</h3>
            <p className="text-lg text-slate-400 mb-8">
              Elige qué producto fabricará tu nación. Considera tu dotación de factores para maximizar la eficiencia.
            </p>
            {currentTeam.specialization && (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full">
                <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Has elegido producir</div>
                <div className="text-3xl font-black text-white">{PRODUCT_CONFIG[currentTeam.specialization].name}</div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={() => {
            if (game.state.currentTeamIndex < game.state.teams.length - 1) {
              game.startCountdown('ROUND1_DECISION');
              game.nextTeamOrPhase('ROUND1_DECISION', 'ROUND1_DECISION'); // advance team
            } else {
              game.processRound1();
            }
          }} 
          disabled={!currentTeam.specialization}
        >
          {game.state.currentTeamIndex < game.state.teams.length - 1 ? 'Siguiente Equipo' : 'Ver Consecuencias'} <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}

export function Round1Results({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen>
      <div className="text-center mb-12 mt-16">
        <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 1: Consecuencias Económicas</h2>
        <h1 className="text-6xl font-black text-white">Resultados de Especialización</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full flex-1">
        {game.state.teams.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <Card className="flex flex-col border-l-8 border-l-emerald-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold text-white">{team.name}</h3>
                <div className="text-xl bg-slate-900 px-4 py-1 rounded-full font-mono text-emerald-400">
                  +{team.score.specialization + team.score.production} pts
                </div>
              </div>
              
              <div className="flex gap-8 items-center">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 min-w-[200px]">
                  <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Produciendo</div>
                  <div className="text-2xl font-black text-white">{team.specialization ? PRODUCT_CONFIG[team.specialization].name : 'Ninguno'}</div>
                </div>
                
                <div className="flex-1 text-lg text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl">
                  {team.consequences.round1}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => game.startCountdown('ROUND2_COMMERCE', true)}>
          Siguiente Ronda <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </Screen>
  );
}
