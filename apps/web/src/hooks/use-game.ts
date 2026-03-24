import { useReducer } from "react";
import { gameReducer, initialGameState } from "../lib/game-reducer";
import type { GameConfig, RGB } from "../lib/game-types";

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return {
    state,
    startGame: (config: GameConfig) =>
      dispatch({ type: "START_GAME", config }),
    endMemorize: () => dispatch({ type: "END_MEMORIZE" }),
    updatePlayerColor: (color: RGB) =>
      dispatch({ type: "UPDATE_PLAYER_COLOR", color }),
    submitGuess: () => dispatch({ type: "SUBMIT_GUESS" }),
    nextRound: () => dispatch({ type: "NEXT_ROUND" }),
    reset: () => dispatch({ type: "RESET" }),
  };
}
