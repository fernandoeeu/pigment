import { calculateMatchScore, generateRandomColor } from "./color";
import {
  DIFFICULTY_TIMES,
  ENDLESS_DECAY,
  ENDLESS_MIN_TIME,
  ENDLESS_START_TIME,
  LIVES_INITIAL,
  LIVES_THRESHOLD,
  STREAK_THRESHOLD,
  SUDDEN_DEATH_THRESHOLD,
} from "./constants";
import type { GameAction, GameState } from "./game-types";

export const initialGameState: GameState = {
  phase: "setup",
  config: null,
  round: 0,
  totalScore: 0,
  lives: LIVES_INITIAL,
  streak: 0,
  bestStreak: 0,
  currentRound: null,
  history: [],
  timeAllowed: ENDLESS_START_TIME,
};

function getTimeForRound(state: GameState): number {
  if (!state.config) return ENDLESS_START_TIME;

  if (state.config.mode === "classic") {
    return DIFFICULTY_TIMES[state.config.difficulty] ?? 3000;
  }

  // Endless: decay each round
  const time = ENDLESS_START_TIME * Math.pow(ENDLESS_DECAY, state.round);
  return Math.max(ENDLESS_MIN_TIME, Math.round(time));
}

function checkGameOver(state: GameState, roundScore: number): boolean {
  if (!state.config) return false;

  switch (state.config.endCondition) {
    case "lives":
      return roundScore < LIVES_THRESHOLD && state.lives <= 1;
    case "sudden-death":
      return roundScore < SUDDEN_DEATH_THRESHOLD;
    case "infinite":
      return false;
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const timeAllowed =
        action.config.mode === "classic"
          ? (DIFFICULTY_TIMES[action.config.difficulty] ?? 3000)
          : ENDLESS_START_TIME;

      return {
        ...initialGameState,
        phase: "memorize",
        config: action.config,
        round: 1,
        timeAllowed,
        currentRound: {
          targetColor: generateRandomColor(
            action.config.colorVisionMode,
          ),
          playerColor: { r: 128, g: 128, b: 128 },
          score: 0,
          timeAllowed,
        },
      };
    }

    case "END_MEMORIZE":
      return { ...state, phase: "guess" };

    case "UPDATE_PLAYER_COLOR": {
      if (!state.currentRound) return state;
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          playerColor: action.color,
        },
      };
    }

    case "SUBMIT_GUESS": {
      if (!state.currentRound) return state;
      const score = calculateMatchScore(
        state.currentRound.targetColor,
        state.currentRound.playerColor,
      );
      return {
        ...state,
        phase: "result",
        currentRound: { ...state.currentRound, score },
      };
    }

    case "NEXT_ROUND": {
      if (!state.currentRound || !state.config) return state;
      const roundScore = state.currentRound.score;

      const newHistory = [
        ...state.history,
        {
          target: state.currentRound.targetColor,
          player: state.currentRound.playerColor,
          score: roundScore,
        },
      ];

      const isGameOver = checkGameOver(state, roundScore);
      if (isGameOver) {
        return {
          ...state,
          phase: "gameover",
          totalScore: state.totalScore + roundScore,
          history: newHistory,
          currentRound: null,
          lives:
            state.config.endCondition === "lives" &&
            roundScore < LIVES_THRESHOLD
              ? state.lives - 1
              : state.lives,
        };
      }

      const lostLife =
        state.config.endCondition === "lives" &&
        roundScore < LIVES_THRESHOLD;

      const streakContinues = roundScore >= STREAK_THRESHOLD;
      const newStreak = streakContinues ? state.streak + 1 : 0;
      const newRound = state.round + 1;

      const nextState: GameState = {
        ...state,
        round: newRound,
        totalScore: state.totalScore + roundScore,
        lives: lostLife ? state.lives - 1 : state.lives,
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        history: newHistory,
      };

      const timeAllowed = getTimeForRound(nextState);

      return {
        ...nextState,
        phase: "memorize",
        timeAllowed,
        currentRound: {
          targetColor: generateRandomColor(
            nextState.config?.colorVisionMode ?? "normal",
          ),
          playerColor: { r: 128, g: 128, b: 128 },
          score: 0,
          timeAllowed,
        },
      };
    }

    case "RESET":
      return initialGameState;

    default:
      return state;
  }
}
