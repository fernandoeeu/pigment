import { Eye, Palette, Target } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "See",
    desc: "A random color appears for a few seconds. Study it carefully.",
    accent: "text-violet-400",
    glow: "shadow-violet-400/20",
  },
  {
    icon: Palette,
    title: "Recreate",
    desc: "Use RGB sliders and hex input to rebuild the color from memory.",
    accent: "text-cyan-400",
    glow: "shadow-cyan-400/20",
  },
  {
    icon: Target,
    title: "Score",
    desc: "Get scored on accuracy. Build streaks and chase your best.",
    accent: "text-amber-400",
    glow: "shadow-amber-400/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-24">
      <div className="text-center">
        <span className="font-body text-xs tracking-[0.3em] text-white/30 uppercase">
          How it works
        </span>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Three simple steps
        </h2>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 shadow-[0_0_20px_-5px] transition-all duration-300 group-hover:scale-110 ${step.glow}`}
            >
              <step.icon className={`h-5 w-5 ${step.accent}`} />
            </div>
            <div>
              <h3
                className={`font-display text-lg font-bold ${step.accent}`}
              >
                {step.title}
              </h3>
              <p className="font-body mt-1 text-sm leading-relaxed text-white/40">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
