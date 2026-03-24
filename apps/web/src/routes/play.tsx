import { createFileRoute } from "@tanstack/react-router";
import GameShell from "../components/game/game-shell";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  return <GameShell />;
}
