import { Factory, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { PRODUCT_CONFIG, Product, FACTOR_NAMES } from '../../types';

export function Phase2({ game }: { game: ReturnType<typeof useGame> }) {
  const currentTeam = game.state.teams[game.state.currentTeamIndex];

  const handleSelectProduct = (product: Product) => {
    game.setSpecialization(game.state.currentTeamIndex, product);
  };

  const selectedProductConfig = currentTeam.specialization ? PRODUCT_CONFIG[currentTeam.specialization] : null;
  const isCorrectChoice = selectedProductConfig?.intensiveFactor === currentTeam.abundantFactor;

  return (
    <Screen>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-2">Fase 2: Especialización</h2>
          <h1 className="text-6xl font-black text-white">{currentTeam.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-amber-400 bg-amber-900/30 px-6 py-2 rounded-xl border border-amber-500/30">
            Abundancia: {FACTOR_NAMES[currentTeam.abundantFactor]}
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
                  Intensivo en: <span className="text-emerald-300">{FACTOR_NAMES[config.intensiveFactor]}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="col-span-4">
          <Card className="h-full flex flex-col">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Factory className="w-8 h-8 text-emerald-400" /> Decisión
            </h3>
            
            {!currentTeam.specialization ? (
              <div className="flex-1 flex items-center justify-center text-center text-slate-500 text-2xl font-medium">
                Selecciona un producto para producir.
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-8">
                  <div className="text-xl text-slate-400 mb-2">Has elegido producir</div>
                  <div className="text-4xl font-black text-white">{PRODUCT_CONFIG[currentTeam.specialization].name}</div>
                </div>

                {isCorrectChoice ? (
                  <div className="bg-emerald-900/30 border border-emerald-500/50 p-6 rounded-xl mt-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold text-center text-emerald-300 mb-2">¡Excelente Decisión!</h4>
                    <p className="text-lg text-slate-300 text-center">
                      Estás aprovechando tu factor abundante ({FACTOR_NAMES[currentTeam.abundantFactor]}).
                      Esto te dará una ventaja comparativa.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-xl mt-auto">
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold text-center text-red-300 mb-2">Decisión Ineficiente</h4>
                    <p className="text-lg text-slate-300 text-center">
                      Estás utilizando un factor que no es abundante en tu país. 
                      Tu producción será costosa y menos competitiva.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => game.nextTeam()} disabled={!currentTeam.specialization}>
          Siguiente <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </Screen>
  );
}
