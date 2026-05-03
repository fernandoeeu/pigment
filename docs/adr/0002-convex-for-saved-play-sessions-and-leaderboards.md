# Convex for saved play sessions and leaderboards

Pigment will use Convex as the source of truth for Saved Play Sessions and real-time leaderboards. The existing Drizzle/Turso package is scaffold residue: its schema is empty and no app flow imports `@color-game/db`, so using Convex for this slice does not conflict with existing product data.

## Considered Options

- **Convex** — picked because the leaderboard needs real-time reads and mutations around saved play history.
- **Drizzle/Turso** — rejected for this slice because it is not currently part of the app's runtime behavior and would require adding a real-time layer separately.
- **Hybrid Convex + Drizzle/Turso** — rejected for the first ranking slice because it would split ownership of Saved Play Sessions before there is any existing relational data to preserve.

## Consequences

- Saved Play Sessions, leaderboard aggregates, and player ranking reads live in Convex.
- Drizzle/Turso can be removed in this slice or left as temporary scaffold cleanup, but it should not become the persistence path for rankings unless this decision is revisited.
