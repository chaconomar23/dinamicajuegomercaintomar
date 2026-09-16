import { BookOpen, RefreshCw, ArrowDown } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';

export function Conclusion({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen className="justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8" />
            Lección Aprendida
          </h2>
          <h1 className="text-5xl font-black text-white drop-shadow-lg">Teoría de Heckscher-Ohlin</h1>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <Card className="text-center bg-emerald-900/20 border-emerald-500/30">
            <div className="text-2xl font-bold text-emerald-400 mb-6 bg-emerald-900/50 py-3 rounded-xl border border-emerald-500/30">EL CAMINO AL ÉXITO</div>
            
            <div className="space-y-4 text-xl font-bold text-white flex flex-col items-center">
              <div className="bg-slate-800 w-full py-4 rounded-lg border border-slate-700">FACTOR ABUNDANTE</div>
              <ArrowDown className="w-6 h-6 text-emerald-500" />
              <div className="bg-slate-800 w-full py-4 rounded-lg border border-slate-700 text-slate-300">PRODUCTO INTENSIVO</div>
              <ArrowDown className="w-6 h-6 text-emerald-500" />
              <div className="bg-emerald-900/50 w-full py-4 rounded-lg border border-emerald-500/50 text-emerald-400">ESPECIALIZACIÓN</div>
              <ArrowDown className="w-6 h-6 text-emerald-500" />
              <div className="bg-emerald-600 w-full py-4 rounded-lg text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">EXPORTACIÓN</div>
            </div>
          </Card>

          <Card className="text-center bg-amber-900/20 border-amber-500/30 flex flex-col">
            <div className="text-2xl font-bold text-amber-400 mb-6 bg-amber-900/50 py-3 rounded-xl border border-amber-500/30">CÓMO COMPENSAR</div>
            
            <div className="space-y-4 text-xl font-bold text-white flex flex-col items-center flex-1 justify-center">
              <div className="bg-slate-800 w-full py-4 rounded-lg border border-slate-700">FACTOR RELATIVAMENTE ESCASO</div>
              <ArrowDown className="w-6 h-6 text-amber-500" />
              <div className="bg-amber-600 w-full py-4 rounded-lg text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]">IMPORTACIÓN</div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => game.resetGame()} variant="secondary" className="mx-auto">
            <RefreshCw className="w-6 h-6" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </Screen>
  );
}
