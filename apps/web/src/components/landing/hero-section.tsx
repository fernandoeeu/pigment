import { Button } from "@color-game/ui/components/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { generateRandomColor, rgbToHex } from "../../lib/color";

const CYCLE_INTERVAL = 2500;

export default function HeroSection() {
  const [colors, setColors] = useState(() =>
    Array.from({ length: 5 }, generateRandomColor),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          setColors(Array.from({ length: 5 }, generateRandomColor));
        }
        return next;
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const activeColor = colors[activeIndex];
  const hex = activeColor ? rgbToHex(activeColor) : "#888888";

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4">
      {/* Ambient glow - large blurred color that fills the background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] transition-all duration-[2000ms] ease-in-out"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${hex}, transparent)`,
        }}
      />

      {/* Floating color dots - decorative */}
      <div className="pointer-events-none absolute inset-0">
        {colors.map((c, i) => {
          const cHex = rgbToHex(c);
          return (
            <div
              key={i}
              className="absolute rounded-full opacity-20 blur-sm transition-all duration-[2000ms]"
              style={{
                backgroundColor: cHex,
                width: i === activeIndex ? "12px" : "6px",
                height: i === activeIndex ? "12px" : "6px",
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 15}%`,
                transform: `translateY(${i === activeIndex ? "-8px" : "0"})`,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Active color swatch */}
        <div className="relative">
          <div
            className="absolute inset-0 scale-125 rounded-[2.5rem] opacity-25 blur-3xl transition-all duration-[1500ms]"
            style={{ backgroundColor: hex }}
          />
          <div
            className="relative h-32 w-32 rounded-[2rem] ring-1 ring-white/10 transition-all duration-[1500ms] sm:h-40 sm:w-40"
            style={{ backgroundColor: hex }}
          />
        </div>

        {/* Color dots indicator */}
        <div className="flex items-center gap-2">
          {colors.map((c, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                backgroundColor: rgbToHex(c),
                opacity: i === activeIndex ? 1 : 0.2,
                transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-display text-6xl font-black tracking-tighter text-white sm:text-8xl">
            Pigment
          </h1>
          <p className="font-body max-w-md text-base text-white/40 sm:text-lg">
            See a color. Remember it. Recreate it.
            <br />
            <span className="text-white/60">
              How sharp is your color memory?
            </span>
          </p>
        </div>

        {/* Hex display */}
        <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2">
          <div
            className="h-3 w-3 rounded-full transition-all duration-[1500ms]"
            style={{ backgroundColor: hex }}
          />
          <span className="font-mono text-sm tracking-[0.2em] text-white/40 transition-all duration-[1500ms]">
            {hex}
          </span>
        </div>

        {/* CTA */}
        <Link to="/play">
          <Button
            size="lg"
            className="group rounded-full bg-amber-400 px-10 py-6 font-display text-base font-bold tracking-wide text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_40px_-5px] hover:shadow-amber-400/40"
          >
            Play Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
