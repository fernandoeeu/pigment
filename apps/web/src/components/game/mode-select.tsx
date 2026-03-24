import { Button } from "@color-game/ui/components/button";
import { cn } from "@color-game/ui/lib/utils";
import {
  Clock,
  Heart,
  Infinity,
  Skull,
  Timer,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type {
  Difficulty,
  EndCondition,
  GameConfig,
  GameMode,
} from "../../lib/game-types";

interface ModeSelectProps {
  onStart: (config: GameConfig) => void;
}

const modes: Array<{
  id: GameMode;
  label: string;
  desc: string;
  icon: typeof Clock;
}> = [
  {
    id: "classic",
    label: "Classic",
    desc: "Pick your difficulty. Fixed time per round.",
    icon: Clock,
  },
  {
    id: "endless",
    label: "Endless",
    desc: "Time shrinks each round. How far can you go?",
    icon: TrendingUp,
  },
];

const endConditions: Array<{
  id: EndCondition;
  label: string;
  desc: string;
  icon: typeof Heart;
}> = [
  { id: "lives", label: "3 Lives", desc: "Miss badly, lose a life", icon: Heart },
  { id: "sudden-death", label: "Sudden Death", desc: "One bad miss, it's over", icon: Skull },
  { id: "infinite", label: "Infinite", desc: "No game over. Chase high scores", icon: Infinity },
];

const difficulties: Array<{
  id: Difficulty;
  label: string;
  time: string;
}> = [
  { id: "easy", label: "Easy", time: "5s" },
  { id: "medium", label: "Medium", time: "3s" },
  { id: "hard", label: "Hard", time: "1.5s" },
];

export default function ModeSelect({ onStart }: ModeSelectProps) {
  const [mode, setMode] = useState<GameMode>("classic");
  const [endCondition, setEndCondition] = useState<EndCondition>("lives");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">
          Choose Your Mode
        </h2>
        <p className="font-body mt-1 text-sm text-white/40">
          How do you want to play?
        </p>
      </div>

      {/* Game Mode */}
      <div className="grid w-full grid-cols-2 gap-3">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "group relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200",
              mode === m.id
                ? "border-amber-400/50 bg-amber-400/5 shadow-[0_0_20px_-5px] shadow-amber-400/20"
                : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
            )}
          >
            <m.icon
              className={cn(
                "h-5 w-5 transition-colors",
                mode === m.id ? "text-amber-400" : "text-white/30",
              )}
            />
            <div>
              <span
                className={cn(
                  "font-display text-sm font-semibold",
                  mode === m.id ? "text-white" : "text-white/60",
                )}
              >
                {m.label}
              </span>
              <p className="font-body mt-0.5 text-xs text-white/30">
                {m.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Difficulty (Classic only) */}
      {mode === "classic" && (
        <div className="flex w-full flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="font-body text-xs tracking-widest text-white/40 uppercase">
            Difficulty
          </span>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-center transition-all duration-200",
                  difficulty === d.id
                    ? "border-amber-400/50 bg-amber-400/5"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15",
                )}
              >
                <span
                  className={cn(
                    "font-display block text-sm font-semibold",
                    difficulty === d.id ? "text-white" : "text-white/50",
                  )}
                >
                  {d.label}
                </span>
                <span className="font-mono text-xs text-white/30">
                  {d.time}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* End Condition */}
      <div className="flex w-full flex-col gap-2">
        <span className="font-body text-xs tracking-widest text-white/40 uppercase">
          End Condition
        </span>
        <div className="grid grid-cols-3 gap-2">
          {endConditions.map((ec) => (
            <button
              key={ec.id}
              type="button"
              onClick={() => setEndCondition(ec.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 transition-all duration-200",
                endCondition === ec.id
                  ? "border-amber-400/50 bg-amber-400/5"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15",
              )}
            >
              <ec.icon
                className={cn(
                  "h-4 w-4",
                  endCondition === ec.id ? "text-amber-400" : "text-white/30",
                )}
              />
              <span
                className={cn(
                  "font-display text-xs font-semibold",
                  endCondition === ec.id ? "text-white" : "text-white/50",
                )}
              >
                {ec.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <Button
        size="lg"
        onClick={() => onStart({ mode, endCondition, difficulty })}
        className="w-full rounded-xl bg-amber-400 py-6 font-display text-base font-bold tracking-wide text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_30px_-5px] hover:shadow-amber-400/40"
      >
        Start Game
      </Button>
    </div>
  );
}
