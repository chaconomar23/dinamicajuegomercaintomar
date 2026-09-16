import { useGame } from './useGame';
import { Home } from './components/screens/Home';
import { Setup } from './components/screens/Setup';
import { Countdown } from './components/screens/Countdown';
import { Round1Factors, Round1Decision, Round1Results } from './components/screens/Round1';
import { Round2Commerce, Round2Results, Negotiation } from './components/screens/Round2';
import { Round3Event, Round3Decision, Round3Results } from './components/screens/Round3';
import { Ranking } from './components/screens/Ranking';
import { Conclusion } from './components/screens/Conclusion';
import { HUD } from './components/HUD';
import { OperatorPanel } from './components/OperatorPanel';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const game = useGame();

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden font-sans">
      <HUD game={game} />
      <OperatorPanel game={game} />
      <AnimatePresence mode="wait">
        {game.state.phase === 'HOME' && <div key="home"><Home game={game} /></div>}
        {game.state.phase === 'SETUP' && <div key="setup"><Setup game={game} /></div>}
        {game.state.phase === 'ROUND1_FACTORS' && <div key="r1f"><Round1Factors game={game} /></div>}
        {game.state.phase === 'COUNTDOWN' && <div key="countdown"><Countdown game={game} /></div>}
        {game.state.phase === 'ROUND1_DECISION' && <div key="r1d"><Round1Decision game={game} /></div>}
        {game.state.phase === 'ROUND1_RESULTS' && <div key="r1r"><Round1Results game={game} /></div>}
        {game.state.phase === 'ROUND2_COMMERCE' && <div key="r2c"><Round2Commerce game={game} /></div>}
        {game.state.phase === 'ROUND2_RESULTS' && <div key="r2r"><Round2Results game={game} /></div>}
        {game.state.phase === 'NEGOTIATION' && <div key="neg"><Negotiation game={game} /></div>}
        {game.state.phase === 'ROUND3_EVENT' && <div key="r3e"><Round3Event game={game} /></div>}
        {game.state.phase === 'ROUND3_DECISION' && <div key="r3d"><Round3Decision game={game} /></div>}
        {game.state.phase === 'ROUND3_RESULTS' && <div key="r3r"><Round3Results game={game} /></div>}
        {game.state.phase === 'RANKING' && <div key="ranking"><Ranking game={game} /></div>}
        {game.state.phase === 'CONCLUSION' && <div key="conclusion"><Conclusion game={game} /></div>}
      </AnimatePresence>
    </div>
  );
}


