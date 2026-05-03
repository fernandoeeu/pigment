import { Show, SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import SettingsDialog from "./settings-dialog";

export default function Header() {
  const links = [
    { to: "/", label: "Pigment" },
    { to: "/play", label: "Play" },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <nav className="flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-display text-sm font-semibold text-white/50 transition-colors hover:text-white [&.active]:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button
                type="button"
                className="font-display cursor-pointer text-sm font-semibold text-white/50 transition-colors hover:text-white"
              >
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <SettingsDialog />
        </div>
      </div>
      <hr className="border-white/5" />
    </div>
  );
}
