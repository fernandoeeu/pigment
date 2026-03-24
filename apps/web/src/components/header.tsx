import { Link } from "@tanstack/react-router";

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
      </div>
      <hr className="border-white/5" />
    </div>
  );
}
