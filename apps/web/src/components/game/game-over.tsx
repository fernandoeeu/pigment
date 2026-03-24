import { Button } from "@color-game/ui/components/button";
import { Link } from "@tanstack/react-router";
import { RotateCcw, Trophy } from "lucide-react";
import type { GameState } from "../../lib/game-types";
import { useTickingNumber } from "../../hooks/use-ticking-number";

interface GameOverProps {
  state: GameState;
  onPlayAgain: () => void;
}

export default function GameOver({ state, onPlayAgain }: GameOverProps) {
  const tickedTotal = useTickingNumber(state.totalScore, 2000, true);
  const avgScore =
    state.history.length > 0
      ? Math.round(
          state.history.reduce((sum, h) => sum + h.score, 0) /
            state.history.length,
        )
      : 0;
  const tickedAvg = useTickingNumber(avgScore, 1500, true);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-700">
      <Trophy className="h-12 w-12 text-amber-400" />

      <div className="text-center">
        <h2 className="font-display text-3xl font-black tracking-tight text-white">
          Game Over
        </h2>
        <p className="font-body mt-1 text-sm text-white/40">
          {state.round} round{state.round !== 1 ? "s" : ""} played
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid w-full max-w-xs grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Total Score
          </span>
          <span className="font-display text-3xl font-black tabular-nums text-amber-400">
            {tickedTotal}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Avg Match
          </span>
          <span className="font-display text-3xl font-black tabular-nums text-white/80">
            {tickedAvg}%
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Best Streak
          </span>
          <span className="font-display text-3xl font-black tabular-nums text-orange-400">
            {state.bestStreak}x
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Best Round
          </span>
          <span className="font-display text-3xl font-black tabular-nums text-emerald-400">
            {state.history.length > 0
              ? Math.max(...state.history.map((h) => h.score))
              : 0}
            %
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button
          size="lg"
          onClick={onPlayAgain}
          className="w-full rounded-xl bg-amber-400 py-6 font-display text-base font-bold tracking-wide text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_30px_-5px] hover:shadow-amber-400/40"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
        <Link to="/">
          <Button
            variant="ghost"
            size="lg"
            className="w-full rounded-xl py-5 font-display text-sm text-white/40 hover:text-white/60"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
