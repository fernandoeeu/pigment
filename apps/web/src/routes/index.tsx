import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "../components/landing/hero-section";
import HowItWorks from "../components/landing/how-it-works";
import ModesSection from "../components/landing/modes-section";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="overflow-y-auto">
      <HeroSection />
      <div className="mx-auto max-w-5xl">
        <HowItWorks />
        <ModesSection />
      </div>
      {/* Footer */}
      <footer className="flex items-center justify-center border-t border-white/5 py-8">
        <span className="font-body text-xs text-white/20">
          Pigment — A color memory game
        </span>
      </footer>
    </div>
  );
}
