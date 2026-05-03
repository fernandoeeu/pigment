# Pigment

Pigment is a color memory game where people try to recreate a color after seeing it briefly. This context captures the product language around play, identity, and saved progress.

## Language

**Player**:
A person who plays Pigment, whether signed in or anonymous.
_Avoid_: User, visitor

**Player Account**:
A signed-in identity for a Player.
_Avoid_: Account, user account, Clerk user

**Display Name**:
The public name shown for a Player Account in leaderboards and saved results.
_Avoid_: Email, username, Clerk ID

**Play Session**:
A continuous run of gameplay that may happen before or after a Player signs in.
_Avoid_: Run, session, auth session

**Saved Play Session**:
A completed Play Session preserved with its settings, rounds, and outcome for future analysis.
_Avoid_: Result row, score record

**Run History**:
The private list of a Player Account's Saved Play Sessions.
_Avoid_: Leaderboard, activity feed

**Round Snapshot**:
The preserved target, guess, score, and timing context for one round inside a Saved Play Session.
_Avoid_: Input telemetry, event log

**Game Mode**:
The selected way of playing that changes a Play Session's progression or pressure.
_Avoid_: Category, leaderboard type

**Ruleset**:
The complete competitive grouping for a Play Session, combining game mode, end condition, and difficulty when difficulty applies.
_Avoid_: Mode, category

**Leaderboard**:
An ordered view of Player Accounts within exactly one Ruleset.
_Avoid_: Global ranking

**Leaderboard Standing**:
The current competitive state of one Player Account within one Ruleset.
_Avoid_: Stats, aggregate row

**Top Score Leaderboard**:
A Leaderboard ordered by each Player Account's best Saved Play Session within a Ruleset.
_Avoid_: Best runs list

**Personal Best**:
A Player Account's best Saved Play Session within a Ruleset.
_Avoid_: Top projection, record row

**Total Score Leaderboard**:
A Leaderboard ordered by each Player Account's accumulated Score across Saved Play Sessions within a Ruleset.
_Avoid_: Global total

**Score**:
The numeric result earned by a Player during a Play Session.
_Avoid_: Points total, match percent

## Relationships

- A **Player** may play without a **Player Account**
- A **Player Account** belongs to exactly one signed-in **Player**
- A **Player Account** has one public **Display Name**
- A **Play Session** may be anonymous or associated with one **Player Account**
- A **Play Session** that began anonymously may save its final result to a **Player Account** after sign-in, without reconstructing earlier anonymous round history
- A **Saved Play Session** belongs to exactly one **Player Account**
- A **Saved Play Session** contains one or more **Round Snapshots**
- A **Saved Play Session** is played under exactly one **Ruleset**
- A **Run History** belongs to exactly one **Player Account**
- A **Run History** contains all **Saved Play Sessions** for that **Player Account**
- A **Ruleset** includes exactly one **Game Mode**
- A **Leaderboard** ranks **Player Accounts** within exactly one **Ruleset**
- A **Leaderboard Standing** belongs to exactly one **Player Account** and one **Ruleset**
- A **Leaderboard Standing** exists only after the Player Account saves at least one ranked Play Session for that Ruleset.
- A **Top Score Leaderboard** uses one best **Saved Play Session** per **Player Account**
- A **Personal Best** belongs to exactly one **Player Account** and one **Ruleset**
- A **Total Score Leaderboard** uses all **Saved Play Sessions** for each **Player Account**
- A **Score** belongs to exactly one **Saved Play Session**

## Example Dialogue

> **Dev:** "Should a **Player** need a **Player Account** before starting a **Play Session**?"
> **Domain expert:** "No. The first auth slice only needs sign-in and sign-out to work; gameplay stays public and does not save results yet."

## Flagged Ambiguities

- "Auth" should not mean mandatory access control for the whole game. Resolved: authentication is optional for play; the first auth slice is only login/logout.
- "Link anonymous play" should not mean retroactive identity merging. Resolved: sign-in can save the current or future result, but anonymous round history is not reconstructed as account history.
- Anonymous play does not create leaderboard entries. Resolved: a **Play Session** only becomes a **Saved Play Session** when it is saved to a **Player Account**.
- "ranking" is resolved as **Leaderboard**, an ordered player-facing view, not the full historical list of **Saved Play Sessions**.
- "top" and "accumulated" are separate leaderboard views. Resolved: use **Top Score Leaderboard** for best performance and **Total Score Leaderboard** for accumulated performance.
- Accumulated ranking is not global. Resolved: **Total Score Leaderboard** is scoped to one **Ruleset**, just like **Top Score Leaderboard**.
- The first **Total Score Leaderboard** is all-time, not weekly or monthly.
- Saving "everything from the run" means saving **Round Snapshots**. It does not mean recording every input movement or interaction event.
- Saving is automatic at Game Over for a signed-in **Player Account**. Anonymous play can only become a **Saved Play Session** after sign-in.
- The same **Play Session** must not produce more than one **Saved Play Session** for the same **Player Account**.
- **Top Score Leaderboard** ties are broken by more rounds, then better streak, then earlier saved result.
- A **Personal Best** is replaced only when a newer Saved Play Session beats it by Top Score Leaderboard ordering.
- **Total Score Leaderboard** ties are broken by better average score, then better top score, then fewer saved sessions.
- Color vision mode is saved for analysis but does not define a **Ruleset**.
- The first leaderboard surface appears both after Game Over for the current **Ruleset** and in a dedicated leaderboard view.
- Leaderboards show **Display Name**, never email or internal identity.
- Leaderboards use the current **Display Name**; a **Saved Play Session** preserves the **Display Name** used when it was saved.
- **Run History** is private to the signed-in **Player Account** and is separate from public leaderboards.
- **Saved Play Sessions** are append-only for the Player Account in the first design.
- Infinite play does not create **Saved Play Sessions** or leaderboard entries until it has an explicit finish condition.
- The first ranked **Rulesets** are Classic with Lives or Sudden Death by difficulty, and Endless with Lives or Sudden Death without difficulty.
- Signing in from Game Over can save the current anonymous **Play Session** only; older anonymous history is not migrated.
- After signing in to save from Game Over, the Player returns to Game Over with saved status and current Ruleset ranking context.
- Public leaderboards are visible to anonymous Players; creating **Saved Play Sessions** requires a **Player Account**.
- There is no global competitive leaderboard across Rulesets in the first design.
- Game Over shows the Player Account's current rank for the Ruleset even when it is outside the public top list.
- Game Over ranking feedback uses the **Top Score Leaderboard**; **Total Score Leaderboard** lives in the dedicated leaderboard view.
- **Total Score Leaderboard** includes every ranked **Saved Play Session** for the Player Account within the Ruleset, not only personal records.
- Every ranked **Saved Play Session** updates **Total Score Leaderboard**; **Top Score Leaderboard** updates only when the session improves the Player Account's best result for the Ruleset.
- The first design has no unranked, moderation, or admin removal state for **Saved Play Sessions**.
- Abandoned Play Sessions do not become **Saved Play Sessions**; only a ranked Game Over can be saved.
- A **Saved Play Session** preserves why the Play Session ended.
- A **Saved Play Session** preserves the game rules version used to produce its Score.
- Competitive leaderboards only compare Saved Play Sessions from the current score-affecting rules version, including both Top Score and Total Score views.
- The first **Saved Play Session** design does not preserve device or browser metadata.
- Leaderboard views update in real time when Saved Play Sessions change the visible Ruleset ranking.
- Game Over distinguishes saved status from whether the Saved Play Session improved the Player Account's Top Score.
- Game Over can describe a Top Score improvement as a new **Personal Best**.
- A failed save can be retried while the current Game Over remains in memory; the first design has no offline save queue.
- The first leaderboard display is score-first and does not show secondary metrics such as rounds, streak, play count, or average score in each row.
- The dedicated leaderboard view exposes Ruleset selection so Players can choose which competitive grouping they are viewing.
- The Top Score and Total Score toggle belongs to the dedicated leaderboard view, not Game Over.
- **Run History** is supported by the saved data model but does not need a first-version UI.
- Individual **Saved Play Sessions** do not have public share URLs in the first design.
- Game Over empty states explain that ranking starts after saving a ranked Play Session to a Player Account.
- "run" is informal language for **Play Session**. Use **Saved Play Session** when discussing persisted history.
- "mode of game" is resolved as **Ruleset** for competitive ranking; the code's `mode`, `difficulty`, and `endCondition` are not interchangeable for leaderboard comparison.
