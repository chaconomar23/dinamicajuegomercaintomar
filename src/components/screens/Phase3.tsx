import { ArrowRight, Ship, ArrowRightLeft, ShieldQuestion } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { PRODUCT_CONFIG, Product, FACTOR_NAMES } from '../../types';

export function Phase3({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  const handleCommerceSelect = (type: 'export' | 'import', product: Product) => {
    if (type === 'export') {
      game.setCommerce(game.state.currentTeamIndex, product, currentTeam.importProduct as Product);
    } else {
      game.setCommerce(game.state.currentTeamIndex, currentTeam.exportProduct as Product, product);
    }
  };

  const addWildcard = () => {
    if (currentTeam.wildcards < 3) {
      game.setWildcards(game.state.currentTeamIndex, currentTeam.wildcards + 1);
    }
  };

  const removeWildcard = () => {
    if (currentTeam.wildcards > 0) {
      game.setWildcards(game.state.currentTeamIndex, currentTeam.wildcards - 1);
    }
  };

  return (
    <Screen>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Fase 3: Comercio Internacional</h2>
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
      
      <Card className="mt-8 bg-indigo-900/20 border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ShieldQuestion className="w-12 h-12 text-indigo-400" />
          <div>
            <h4 className="text-2xl font-bold text-white mb-1">Comodines de Mercadotecnia</h4>
            <p className="text-slate-400">Responde preguntas para ganar ventajas (+20 pts c/u, max 3)</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={removeWildcard} className="w-12 h-12 rounded-full bg-slate-800 text-3xl font-black hover:bg-slate-700">-</button>
          <div className="text-5xl font-black text-indigo-400 w-12 text-center">{currentTeam.wildcards}</div>
          <button onClick={addWildcard} className="w-12 h-12 rounded-full bg-slate-800 text-3xl font-black hover:bg-slate-700">+</button>
        </div>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={() => game.nextTeam()} 
          disabled={!currentTeam.exportProduct || !currentTeam.importProduct}
        >
          Siguiente <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}
