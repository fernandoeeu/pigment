import { Button } from "@color-game/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

const modes = [
  {
    icon: Clock,
    title: "Classic",
    desc: "Choose your difficulty — Easy (5s), Medium (3s), or Hard (1.5s). Fixed time each round. Perfect for learning.",
    features: ["Pick your pace", "3 difficulty levels", "Consistent challenge"],
    accent: "border-violet-400/20 hover:border-violet-400/40",
    iconColor: "text-violet-400",
    glow: "group-hover:shadow-violet-400/10",
  },
  {
    icon: TrendingUp,
    title: "Endless",
    desc: "Start with 5 seconds — but each round gets faster. The time shrinks until you can barely blink. How far can you go?",
    features: ["Increasing pressure", "Time decays 15%/round", "Ultimate test"],
    accent: "border-amber-400/20 hover:border-amber-400/40",
    iconColor: "text-amber-400",
    glow: "group-hover:shadow-amber-400/10",
  },
];

export default function ModesSection() {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-24">
      <div className="text-center">
        <span className="font-body text-xs tracking-[0.3em] text-white/30 uppercase">
          Game Modes
        </span>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pick your challenge
        </h2>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className={`group flex flex-col gap-5 rounded-2xl border bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] shadow-[0_0_30px_-10px] shadow-transparent ${mode.accent} ${mode.glow}`}
          >
            <div className="flex items-center gap-3">
              <mode.icon className={`h-5 w-5 ${mode.iconColor}`} />
              <h3 className="font-display text-lg font-bold text-white">
                {mode.title}
              </h3>
            </div>
            <p className="font-body text-sm leading-relaxed text-white/40">
              {mode.desc}
            </p>
            <ul className="flex flex-col gap-1.5">
              {mode.features.map((f) => (
                <li
                  key={f}
                  className="font-body flex items-center gap-2 text-xs text-white/30"
                >
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link to="/play">
        <Button
          variant="outline"
          size="lg"
          className="group rounded-full border-white/10 px-8 py-5 font-display text-sm font-semibold text-white/60 transition-all hover:border-white/20 hover:text-white"
        >
          Start Playing
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </section>
  );
}
