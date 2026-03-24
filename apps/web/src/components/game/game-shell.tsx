import { useCountdown } from "../../hooks/use-countdown";
import { useGame } from "../../hooks/use-game";
import ColorInput from "./color-input";
import GameHUD from "./game-hud";
import GameOver from "./game-over";
import ModeSelect from "./mode-select";
import RoundDisplay from "./round-display";
import RoundResult from "./round-result";

export default function GameShell() {
  const {
    state,
    startGame,
    endMemorize,
    updatePlayerColor,
    submitGuess,
    nextRound,
    reset,
  } = useGame();

  const { progress } = useCountdown(
    state.timeAllowed,
    endMemorize,
    state.phase === "memorize",
  );

  return (
    <div className="relative flex h-full flex-col items-center px-4 py-6">
      {/* HUD - visible during gameplay */}
      {state.phase !== "setup" && state.phase !== "gameover" && (
        <div className="w-full max-w-md">
          <GameHUD
            state={state}
            timerProgress={progress}
            showTimer={state.phase === "memorize"}
          />
        </div>
      )}

      {/* Phase content */}
      <div className="flex flex-1 items-center justify-center py-6">
        {state.phase === "setup" && <ModeSelect onStart={startGame} />}

        {state.phase === "memorize" && state.currentRound && (
          <RoundDisplay color={state.currentRound.targetColor} />
        )}

        {state.phase === "guess" && state.currentRound && (
          <ColorInput
            color={state.currentRound.playerColor}
            onChange={updatePlayerColor}
            onSubmit={submitGuess}
          />
        )}

        {state.phase === "result" && state.currentRound && (
          <RoundResult
            targetColor={state.currentRound.targetColor}
            playerColor={state.currentRound.playerColor}
            score={state.currentRound.score}
            streak={state.streak}
            onNext={nextRound}
          />
        )}

        {state.phase === "gameover" && (
          <GameOver state={state} onPlayAgain={reset} />
        )}
      </div>
    </div>
  );
}
