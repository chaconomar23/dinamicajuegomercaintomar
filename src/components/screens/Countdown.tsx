import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Screen, Button } from '../ui';
import { useGame } from '../../useGame';
import { motion } from 'motion/react';

export function Countdown({ game }: { game: ReturnType<typeof useGame> }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (game.state.countdownTarget) {
        game.setPhase(game.state.countdownTarget);
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, game]);

  const skip = () => {
    if (game.state.countdownTarget) game.setPhase(game.state.countdownTarget);
  };

  return (
    <Screen className="items-center justify-center text-center">
      <motion.div
        key={timeLeft}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className={`text-[15rem] font-black leading-none drop-shadow-2xl ${timeLeft <= 3 ? 'text-red-500' : 'text-emerald-400'}`}>
          {timeLeft}
        </div>
      </motion.div>
      <h2 className="text-5xl font-bold text-white mb-12 flex items-center gap-4">
        <Clock className="w-12 h-12" /> Preparando Decisión...
      </h2>
      <Button onClick={skip} variant="outline" className="opacity-50 hover:opacity-100 text-lg py-2">
        Saltar Temporizador
      </Button>
    </Screen>
  );
}
