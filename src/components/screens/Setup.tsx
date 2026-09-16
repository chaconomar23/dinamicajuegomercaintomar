import { Users, ArrowRight } from 'lucide-react';
import { Screen, Button, Card } from '../ui';
import { useGame } from '../../useGame';

export function Setup({ game }: { game: ReturnType<typeof useGame> }) {
  return (
    <Screen className="items-center justify-center">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-5xl font-black text-white mb-12 flex items-center justify-center gap-4">
          <Users className="w-12 h-12 text-emerald-400" />
          Configuración de Equipos
        </h2>
        
        {game.state.teams.length === 0 ? (
          <div className="flex gap-8 justify-center">
            <Button onClick={() => game.setupTeams(2)} className="text-3xl px-12 py-8">
              2 Equipos
            </Button>
            <Button onClick={() => game.setupTeams(3)} className="text-3xl px-12 py-8" variant="accent">
              3 Equipos
            </Button>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            {game.state.teams.map((team, index) => (
              <div key={team.id}>
                <Card className="flex items-center gap-6">
                  <div className="text-3xl font-bold text-slate-500 w-12">#{index + 1}</div>
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => game.updateTeamName(index, e.target.value)}
                    className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-xl px-6 py-4 text-3xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder={`Nombre de Nación ${index + 1}`}
                  />
                </Card>
              </div>
            ))}
            
            <div className="pt-8 flex justify-end">
              <Button onClick={() => game.setPhase('ROUND1_FACTORS')}>
                Continuar a Ronda 1 <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
