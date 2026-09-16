import { Globe2, Play } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';
import { motion } from 'motion/react';

export function Home({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen className="items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full"></div>
            <Globe2 className="w-32 h-32 text-emerald-400 relative z-10" />
          </div>
        </div>
        
        <h1 className="text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
          WORLD <span className="text-emerald-400">TRADE</span>
        </h1>
        <h2 className="text-3xl font-bold text-slate-400 mb-12 tracking-wide uppercase">
          El Desafío de las Naciones
        </h2>
        
        <Card className="mb-12 text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto border-emerald-900/50">
          <p>
            Comprende la <strong>Teoría de Heckscher-Ohlin</strong> liderando una nación.
            Descubre tu factor abundante, especialízate y comercia estratégicamente para alcanzar la prosperidad.
          </p>
        </Card>
        
        <Button onClick={() => game.setPhase('SETUP')} className="mx-auto text-3xl px-12 py-6">
          <Play className="w-8 h-8" />
          Comenzar Simulación
        </Button>
      </motion.div>
    </Screen>
  );
}
