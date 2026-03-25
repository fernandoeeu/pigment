export type GameMode = "classic" | "endless";
export type EndCondition = "lives" | "sudden-death" | "infinite";
export type Difficulty = "easy" | "medium" | "hard";
export type GamePhase = "setup" | "memorize" | "guess" | "result" | "gameover";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface GameConfig {
  mode: GameMode;
  endCondition: EndCondition;
  difficulty: Difficulty;
  colorVisionMode: "normal" | "protanopia" | "deuteranopia";
}

export interface RoundState {
  targetColor: RGB;
  playerColor: RGB;
  score: number;
  timeAllowed: number;
}

export interface GameState {
  phase: GamePhase;
  config: GameConfig | null;
  round: number;
  totalScore: number;
  lives: number;
  streak: number;
  bestStreak: number;
  currentRound: RoundState | null;
  history: Array<{ target: RGB; player: RGB; score: number }>;
  timeAllowed: number;
}

export type GameAction =
  | { type: "START_GAME"; config: GameConfig }
  | { type: "START_MEMORIZE" }
  | { type: "END_MEMORIZE" }
  | { type: "UPDATE_PLAYER_COLOR"; color: RGB }
  | { type: "SUBMIT_GUESS" }
  | { type: "NEXT_ROUND" }
  | { type: "RESET" };
