# Clerk as auth provider

Pigment needs sign-in/sign-out for the Player Account (see `CONTEXT.md`). We picked Clerk over self-hosted alternatives because the goal is to ship the auth slice fast — managed user management, prebuilt UI components, OAuth out of the box, zero ops. Speed of integration outweighs vendor lock-in and cost at this stage.

## Considered Options

- **Clerk** — managed. Official `@clerk/tanstack-react-start` SDK with SSR + `clerkMiddleware`, prebuilt `<SignIn/>` / `<SignUp/>` / `<UserButton/>`, free tier covers slice 1. **Picked.**
- **Better Auth** — free, self-hosted, native TanStack Start integration, owns its schema in Drizzle. Rejected: more setup (email provider, OAuth callback wiring, session storage). The cost saving doesn't justify the slower path right now.
- **Lucia** — minimal session library, fully owned. Rejected: too low-level for slice 1; we would still need to build sign-in UI from scratch.

## Consequences

- Identity for Player Account is hosted by Clerk. Future DB tables that reference a Player Account will store `clerk_user_id` (string) as the foreign key.
- Migrating off Clerk later means re-implementing the `/sign-in/$` and `/sign-up/$` routes, swapping `<UserButton/>` in the header, and introducing local schema for users + sessions.
- Slice 1 does not persist anything in the local DB. A Player Account exists only in Clerk until a slice that needs to save data introduces a `player_account` table via lazy upsert.
