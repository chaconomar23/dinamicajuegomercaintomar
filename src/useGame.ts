import { useState, useCallback } from 'react';
import { GameState, GamePhase, Team, Factor, Product, Factors, PRODUCT_CONFIG, WildcardType, EventType, EVENTS_CONFIG, FACTOR_NAMES, TeamScore } from './types';

const INITIAL_FACTORS: Factors = { LABOR: 50, CAPITAL: 50, LAND: 50, RESOURCES: 50 };

const calculateAbundantAndScarce = (factors: Factors): { abundant: Factor; scarce: Factor } => {
  const entries = Object.entries(factors) as [Factor, number][];
  let max = entries[0];
  let min = entries[0];
  for (const entry of entries) {
    if (entry[1] > max[1]) max = entry;
    if (entry[1] < min[1]) min = entry;
  }
  return { abundant: max[0], scarce: min[0] };
};

const INITIAL_TEAM_STATE = {
  factors: { ...INITIAL_FACTORS },
  abundantFactor: 'LABOR' as Factor,
  scarceFactor: 'CAPITAL' as Factor,
  specialization: null,
  exportProduct: null,
  importProduct: null,
  wildcards: { CHANGE_STRATEGY: 0, MARKET_INFO: 0, BOOST: 0, NEGOTIATOR: 0 },
  score: { specialization: 0, production: 0, export: 0, import: 0, negotiation: 0, justification: 0, wildcards: 0, events: 0, total: 0 },
  stats: { production: 10, exports: 0, imports: 0, competitiveness: 50 },
  consequences: { round1: '', round2: '', round3: '' }
};

export function useGame() {
  const [state, setState] = useState<GameState>({
    phase: 'HOME',
    countdownTarget: null,
    teams: [],
    currentTeamIndex: 0,
    currentEvent: null,
  });

  const setPhase = (phase: GamePhase) => setState((s) => ({ ...s, phase }));

  const startCountdown = (target: GamePhase, resetTeam: boolean = false) => {
    setState(s => ({ ...s, phase: 'COUNTDOWN', countdownTarget: target, currentTeamIndex: resetTeam ? 0 : s.currentTeamIndex }));
  };

  const setupTeams = (teamCount: number) => {
    const newTeams: Team[] = Array.from({ length: teamCount }).map((_, i) => ({
      id: `team-${i + 1}`,
      name: `Nación ${i + 1}`,
      ...INITIAL_TEAM_STATE
    }));
    setState({ phase: 'SETUP', countdownTarget: null, teams: newTeams, currentTeamIndex: 0, currentEvent: null });
  };

  const updateTeamName = (index: number, name: string) => {
    setState((s) => {
      const teams = [...s.teams];
      teams[index] = { ...teams[index], name };
      return { ...s, teams };
    });
  };

  const randomizeFactors = (teamIndex: number) => {
    setState((s) => {
      const teams = [...s.teams];
      const newFactors: Factors = {
        LABOR: Math.floor(Math.random() * 81) + 20,
        CAPITAL: Math.floor(Math.random() * 81) + 20,
        LAND: Math.floor(Math.random() * 81) + 20,
        RESOURCES: Math.floor(Math.random() * 81) + 20,
      };
      const { abundant, scarce } = calculateAbundantAndScarce(newFactors);
      teams[teamIndex] = { ...teams[teamIndex], factors: newFactors, abundantFactor: abundant, scarceFactor: scarce };
      return { ...s, teams };
    });
  };

  const nextTeamOrPhase = (currentPhase: GamePhase, nextPhase: GamePhase) => {
    setState(s => {
      if (s.currentTeamIndex < s.teams.length - 1) {
        return { ...s, currentTeamIndex: s.currentTeamIndex + 1 };
      }
      return { ...s, phase: nextPhase, currentTeamIndex: 0 };
    });
  };

  const setSpecialization = (teamIndex: number, product: Product) => {
    setState((s) => {
      const teams = [...s.teams];
      teams[teamIndex] = { ...teams[teamIndex], specialization: product };
      return { ...s, teams };
    });
  };

  const setCommerce = (teamIndex: number, exportProduct: Product, importProduct: Product) => {
    setState((s) => {
      const teams = [...s.teams];
      teams[teamIndex] = { ...teams[teamIndex], exportProduct, importProduct };
      return { ...s, teams };
    });
  };

  const processRound1 = () => {
    setState(s => {
      const teams = s.teams.map(team => {
        if (!team.specialization) return team;
        const config = PRODUCT_CONFIG[team.specialization];
        let specScore = 0;
        let prodScore = 0;
        let prodStat = team.stats.production;
        let compStat = team.stats.competitiveness;
        let msg = '';

        if (config.intensiveFactor === team.abundantFactor) {
          specScore = 100;
          prodScore = 50;
          prodStat += 50;
          compStat += 20;
          msg = `¡Excelente decisión! Tu país tiene abundancia relativa de ${FACTOR_NAMES[team.abundantFactor]}. ${config.name} aprovecha mejor este recurso, logrando alta eficiencia y bajos costos.`;
        } else if (config.intensiveFactor === team.scarceFactor) {
          prodStat -= 5;
          compStat -= 15;
          msg = `Decisión arriesgada. Tu país tiene poco ${FACTOR_NAMES[config.intensiveFactor]}. Elegir ${config.name} aumenta excesivamente el costo de producción por la escasez del recurso.`;
        } else {
          prodScore = 25;
          prodStat += 15;
          compStat += 5;
          msg = `Decisión intermedia. Estás utilizando un factor que no es tu mayor fortaleza, logrando una producción moderada.`;
        }

        return {
          ...team,
          score: { ...team.score, specialization: specScore, production: prodScore, total: team.score.total + specScore + prodScore },
          stats: { ...team.stats, production: prodStat, competitiveness: compStat },
          consequences: { ...team.consequences, round1: msg }
        };
      }).sort((a, b) => b.score.total - a.score.total);
      return { ...s, teams, phase: 'ROUND1_RESULTS', currentTeamIndex: 0 };
    });
  };

  const processRound2 = () => {
    setState(s => {
      const teams = s.teams.map(team => {
        let expScore = 0;
        let impScore = 0;
        let expStat = team.stats.exports;
        let impStat = team.stats.imports;
        let compStat = team.stats.competitiveness;
        let msg = '';

        if (team.exportProduct) {
          if (PRODUCT_CONFIG[team.exportProduct].intensiveFactor === team.abundantFactor) {
            expScore = 100;
            expStat += 40;
            compStat += 15;
            msg += `Exportar ${PRODUCT_CONFIG[team.exportProduct].name} es estratégico: aprovechas tu factor abundante para ser competitivo a nivel mundial. `;
          } else {
            expStat += 10;
            msg += `Exportar ${PRODUCT_CONFIG[team.exportProduct].name} no maximiza tu ventaja comparativa. `;
          }
        }

        if (team.importProduct) {
          if (PRODUCT_CONFIG[team.importProduct].intensiveFactor === team.scarceFactor) {
            impScore = 75;
            impStat += 40;
            compStat += 10;
            msg += `Importar ${PRODUCT_CONFIG[team.importProduct].name} es inteligente: evitas gastar recursos en tu factor más escaso, obteniéndolo del exterior.`;
          } else {
            impStat += 15;
            msg += `La importación elegida no suple tu mayor debilidad estructural.`;
          }
        }

        return {
          ...team,
          score: { ...team.score, export: expScore, import: impScore, total: team.score.total + expScore + impScore },
          stats: { ...team.stats, exports: expStat, imports: impStat, competitiveness: compStat },
          consequences: { ...team.consequences, round2: msg }
        };
      }).sort((a, b) => b.score.total - a.score.total);
      return { ...s, teams, phase: 'ROUND2_RESULTS', currentTeamIndex: 0 };
    });
  };

  const triggerEvent = () => {
    const eventKeys = Object.keys(EVENTS_CONFIG) as EventType[];
    const randomEvent = eventKeys[Math.floor(Math.random() * eventKeys.length)];
    setState(s => ({ ...s, currentEvent: randomEvent, phase: 'ROUND3_EVENT' }));
  };

  const processRound3 = () => {
    setState(s => {
      if (!s.currentEvent) return { ...s, phase: 'ROUND3_RESULTS' };
      const eventConfig = EVENTS_CONFIG[s.currentEvent];
      
      const teams = s.teams.map(team => {
        let evScore = 0;
        let compStat = team.stats.competitiveness;
        let msg = '';

        if (team.specialization === eventConfig.affectedProduct) {
          evScore = eventConfig.bonus;
          compStat += (eventConfig.bonus > 0 ? 20 : -20);
          msg = eventConfig.bonus > 0 
            ? `¡Te beneficiaste enormemente del evento mundial! Tu industria de ${PRODUCT_CONFIG[team.specialization].name} florece.`
            : `El evento mundial golpeó duramente a tu industria principal. Has perdido competitividad.`;
        } else {
          msg = `Tu economía se mantuvo estable frente al evento mundial.`;
        }

        return {
          ...team,
          score: { ...team.score, events: evScore, total: team.score.total + evScore },
          stats: { ...team.stats, competitiveness: compStat },
          consequences: { ...team.consequences, round3: msg }
        };
      }).sort((a, b) => b.score.total - a.score.total);
      return { ...s, teams, phase: 'ROUND3_RESULTS', currentTeamIndex: 0 };
    });
  };

  // Operator Actions
  const awardPoints = (teamIndex: number, category: keyof TeamScore, amount: number) => {
    setState(s => {
      const teams = [...s.teams];
      const currentVal = teams[teamIndex].score[category];
      teams[teamIndex].score = { ...teams[teamIndex].score, [category]: currentVal + amount, total: teams[teamIndex].score.total + amount };
      teams.sort((a, b) => b.score.total - a.score.total);
      return { ...s, teams };
    });
  };

  const awardWildcard = (teamIndex: number, type: WildcardType, amount: number = 1) => {
    setState(s => {
      const teams = [...s.teams];
      teams[teamIndex].wildcards[type] += amount;
      return { ...s, teams };
    });
  };

  const useWildcard = (teamIndex: number, type: WildcardType) => {
    setState(s => {
      const teams = [...s.teams];
      if (teams[teamIndex].wildcards[type] > 0) {
        teams[teamIndex].wildcards[type] -= 1;
        if (type === 'BOOST') {
          teams[teamIndex].stats.production += 15;
          teams[teamIndex].score.total += 20; // Some small base points
        }
      }
      return { ...s, teams };
    });
  };

  const resetGame = () => setState({ phase: 'HOME', countdownTarget: null, teams: [], currentTeamIndex: 0, currentEvent: null });

  return {
    state, setPhase, startCountdown, setupTeams, updateTeamName, randomizeFactors, nextTeamOrPhase,
    setSpecialization, setCommerce, processRound1, processRound2, triggerEvent, processRound3,
    awardPoints, awardWildcard, useWildcard, resetGame,
  };
}

