import { motion } from 'motion/react';
import { ArrowRight, Ship, ArrowRightLeft, Handshake } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { PRODUCT_CONFIG, Product, FACTOR_NAMES } from '../../types';

export function Round2Commerce({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  const handleCommerceSelect = (type: 'export' | 'import', product: Product) => {
    if (type === 'export') {
      game.setCommerce(game.state.currentTeamIndex, product, currentTeam.importProduct as Product);
    } else {
      game.setCommerce(game.state.currentTeamIndex, currentTeam.exportProduct as Product, product);
    }
  };

  return (
    <Screen>
      <div className="flex justify-between items-center mb-10 mt-16">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 2: Comercio Internacional</h2>
          <h1 className="text-6xl font-black text-white">{currentTeam.name}</h1>
        </div>
        <div className="flex gap-4">
          <div className="text-xl font-bold text-emerald-400 bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-500/30">
            Abundante: {FACTOR_NAMES[currentTeam.abundantFactor]}
          </div>
          <div className="text-xl font-bold text-red-400 bg-red-900/30 px-4 py-2 rounded-xl border border-red-500/30">
            Escaso: {FACTOR_NAMES[currentTeam.scarceFactor]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <Card>
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Ship className="w-8 h-8 text-emerald-400" /> Exportación
          </h3>
          <p className="text-lg text-slate-400 mb-6">¿Qué producto vas a vender al mundo?</p>
          
          <div className="space-y-3">
            {(Object.entries(PRODUCT_CONFIG) as [Product, typeof PRODUCT_CONFIG[Product]][]).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleCommerceSelect('export', key)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                  currentTeam.exportProduct === key 
                    ? 'bg-emerald-900/40 border-emerald-500 text-white' 
                    : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl font-bold">{config.name}</span>
                <span className="text-sm uppercase tracking-wider">{FACTOR_NAMES[config.intensiveFactor]}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-amber-400" /> Importación
          </h3>
          <p className="text-lg text-slate-400 mb-6">¿Qué producto necesitas comprar?</p>
          
          <div className="space-y-3">
            {(Object.entries(PRODUCT_CONFIG) as [Product, typeof PRODUCT_CONFIG[Product]][]).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleCommerceSelect('import', key)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                  currentTeam.importProduct === key 
                    ? 'bg-amber-900/40 border-amber-500 text-white' 
                    : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl font-bold">{config.name}</span>
                <span className="text-sm uppercase tracking-wider">{FACTOR_NAMES[config.intensiveFactor]}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={() => {
            if (game.state.currentTeamIndex < game.state.teams.length - 1) {
              game.startCountdown('ROUND2_COMMERCE');
              game.nextTeamOrPhase('ROUND2_COMMERCE', 'ROUND2_COMMERCE');
            } else {
              game.processRound2();
            }
          }} 
          disabled={!currentTeam.exportProduct || !currentTeam.importProduct}
        >
          {game.state.currentTeamIndex < game.state.teams.length - 1 ? 'Siguiente Equipo' : 'Ver Consecuencias'} <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}

export function Round2Results({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen>
      <div className="text-center mb-12 mt-16">
        <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Ronda 2: Consecuencias del Comercio</h2>
        <h1 className="text-6xl font-black text-white">Mercado Global</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full flex-1">
        {game.state.teams.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <Card className="flex flex-col border-l-8 border-l-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold text-white">{team.name}</h3>
                <div className="text-xl bg-slate-900 px-4 py-1 rounded-full font-mono text-blue-400">
                  +{team.score.export + team.score.import} pts
                </div>
              </div>
              
              <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <div className="bg-emerald-900/30 px-4 py-2 rounded-lg border border-emerald-500/30 flex justify-between">
                    <span className="text-slate-400 text-sm">Exp:</span>
                    <span className="font-bold text-emerald-400">{team.exportProduct ? PRODUCT_CONFIG[team.exportProduct].name : 'Ninguno'}</span>
                  </div>
                  <div className="bg-amber-900/30 px-4 py-2 rounded-lg border border-amber-500/30 flex justify-between">
                    <span className="text-slate-400 text-sm">Imp:</span>
                    <span className="font-bold text-amber-400">{team.importProduct ? PRODUCT_CONFIG[team.importProduct].name : 'Ninguno'}</span>
                  </div>
                </div>
                
                <div className="flex-1 text-lg text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl">
                  {team.consequences.round2}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => game.setPhase('NEGOTIATION')}>
          Mesa de Negociación <Handshake className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </Screen>
  );
}

export function Negotiation({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen className="items-center justify-center">
      <div className="text-center mb-12 mt-16 max-w-4xl">
        <div className="flex justify-center mb-6">
          <Handshake className="w-24 h-24 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-4">Fase Libre</h2>
        <h1 className="text-6xl font-black text-white mb-8">Negociación Internacional</h1>
        
        <Card className="text-xl text-slate-300 leading-relaxed bg-slate-800 border-slate-700">
          <p className="mb-4">
            Los equipos tienen <strong>2 minutos</strong> para proponer intercambios comerciales entre ellos.
          </p>
          <ul className="text-left space-y-2 mb-6 inline-block">
            <li>• "Te doy X comodines por Y puntos."</li>
            <li>• "Te apoyo en el mercado a cambio de tu especialización."</li>
            <li>• Usa tu comodín <strong>Negociador</strong> para obtener ventaja.</li>
          </ul>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">
            El operador registrará los puntos u objetos intercambiados.
          </p>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={() => { game.triggerEvent(); }} className="px-12 py-6 text-2xl">
          Continuar al Evento Mundial <ArrowRight className="w-8 h-8 ml-2" />
        </Button>
      </div>
    </Screen>
  );
}
