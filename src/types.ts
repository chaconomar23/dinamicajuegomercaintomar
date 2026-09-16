export type Factor = 'LABOR' | 'CAPITAL' | 'LAND' | 'RESOURCES';
export type Product = 'TEXTILES' | 'MACHINERY' | 'AGRICULTURE' | 'ELECTRONICS' | 'WOOD_MINING';
export type GamePhase = 
  | 'HOME' 
  | 'SETUP' 
  | 'ROUND1_FACTORS' 
  | 'COUNTDOWN'
  | 'ROUND1_DECISION' 
  | 'ROUND1_RESULTS' 
  | 'ROUND2_COMMERCE' 
  | 'ROUND2_RESULTS' 
  | 'NEGOTIATION' 
  | 'ROUND3_EVENT' 
  | 'ROUND3_DECISION' 
  | 'ROUND3_RESULTS' 
  | 'RANKING' 
  | 'CONCLUSION';

export type WildcardType = 'CHANGE_STRATEGY' | 'MARKET_INFO' | 'BOOST' | 'NEGOTIATOR';

export type EventType = 'DEMAND_TEXTILES' | 'DEMAND_MACHINERY' | 'AGRICULTURE_BOOST' | 'RESOURCES_BOOST';

export interface Factors {
  LABOR: number;
  CAPITAL: number;
  LAND: number;
  RESOURCES: number;
}

export interface Wildcards {
  CHANGE_STRATEGY: number;
  MARKET_INFO: number;
  BOOST: number;
  NEGOTIATOR: number;
}

export interface TeamScore {
  specialization: number;
  production: number;
  export: number;
  import: number;
  negotiation: number;
  justification: number;
  wildcards: number;
  events: number;
  total: number;
}

export interface TeamStats {
  production: number;
  exports: number;
  imports: number;
  competitiveness: number;
}

export interface Team {
  id: string;
  name: string;
  factors: Factors;
  abundantFactor: Factor;
  scarceFactor: Factor;
  specialization: Product | null;
  exportProduct: Product | null;
  importProduct: Product | null;
  wildcards: Wildcards;
  score: TeamScore;
  stats: TeamStats;
  consequences: {
    round1: string;
    round2: string;
    round3: string;
  };
}

export interface GameState {
  phase: GamePhase;
  countdownTarget: GamePhase | null;
  teams: Team[];
  currentTeamIndex: number;
  currentEvent: EventType | null;
}

export const PRODUCT_CONFIG: Record<Product, { name: string; intensiveFactor: Factor }> = {
  TEXTILES: { name: 'Textiles', intensiveFactor: 'LABOR' },
  MACHINERY: { name: 'Maquinaria', intensiveFactor: 'CAPITAL' },
  AGRICULTURE: { name: 'Agricultura', intensiveFactor: 'LAND' },
  ELECTRONICS: { name: 'Electrónica', intensiveFactor: 'CAPITAL' },
  WOOD_MINING: { name: 'Madera y Minería', intensiveFactor: 'RESOURCES' },
};

export const FACTOR_NAMES: Record<Factor, string> = {
  LABOR: 'Mano de Obra',
  CAPITAL: 'Capital',
  LAND: 'Tierra',
  RESOURCES: 'Recursos Naturales',
};

export const WILDCARD_CONFIG: Record<WildcardType, { name: string; description: string }> = {
  CHANGE_STRATEGY: { name: 'Cambio de Estrategia', description: 'Permite cambiar la especialización una vez.' },
  MARKET_INFO: { name: 'Info de Mercado', description: 'Permite conocer una pista sobre el próximo evento.' },
  BOOST: { name: 'Impulso', description: 'Da una pequeña bonificación de producción.' },
  NEGOTIATOR: { name: 'Negociador', description: 'Da una ventaja pequeña en una negociación.' },
};

export const EVENTS_CONFIG: Record<EventType, { title: string; description: string; affectedProduct: Product; bonus: number }> = {
  DEMAND_TEXTILES: { title: 'Auge de la Moda', description: 'Aumenta la demanda mundial de textiles.', affectedProduct: 'TEXTILES', bonus: 50 },
  DEMAND_MACHINERY: { title: 'Crisis Industrial', description: 'La demanda de maquinaria disminuye (afecta competitividad).', affectedProduct: 'MACHINERY', bonus: -30 },
  AGRICULTURE_BOOST: { title: 'Escasez Alimentaria', description: 'La agricultura se vuelve más rentable.', affectedProduct: 'AGRICULTURE', bonus: 50 },
  RESOURCES_BOOST: { title: 'Fiebre de Minerales', description: 'Aumenta la demanda de recursos naturales.', affectedProduct: 'WOOD_MINING', bonus: 50 },
};

