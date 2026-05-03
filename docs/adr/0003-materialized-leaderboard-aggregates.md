# Materialized leaderboard aggregates

Pigment will preserve every Saved Play Session, but leaderboard reads will use materialized per-player aggregates scoped by Ruleset and rules version. This keeps Top Score and Total Score leaderboards real-time and index-friendly without recalculating ranking from the full saved-session history on every query.

## Considered Options

- **Materialized aggregates** — picked because leaderboards are a read-heavy, real-time surface and need stable ranking fields per Player Account.
- **Compute from Saved Play Sessions on every read** — rejected because it couples public leaderboard latency to unbounded history growth.

## Consequences

- Saving a ranked Play Session updates both the immutable session history and the Player Account's aggregate for that Ruleset.
- Aggregate bugs must be handled with a future rebuild path from Saved Play Sessions, since the saved history remains the source for reconstruction.
