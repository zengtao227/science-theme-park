# Agent Demand Gate: Mia Playlist Auto Discovery

## 1. Friction Point
- Current user friction: Mia adds a Spotify playlist, but the sync system still requires Tao to add a `PLAYLISTS` entry or handle a warning before it appears in Finamp.
- Who experiences it: Mia waits for the playlist to appear; Tao handles backend configuration or warning triage.
- Why fixed rules or normal automation are insufficient: The current automation only handles playlists already declared in config. It does not discover new Spotify playlists from Mia's account or decide which ones should be mirrored.
- Evidence source: User request on 2026-06-27 describing the desired behavior: Mia's new playlist should appear automatically on her phone without manual backend work.

## 2. Quantified Gap
- Baseline metric: New playlist onboarding requires at least one manual config/edit/redeploy or warning triage step.
- Target metric: 0 manual steps after Mia creates or follows a playlist that matches the sync policy.
- Failure or exit point: Spotify discovery fails, playlist ownership/scope cannot be confirmed, Jellyfin creation fails, XML write fails, or Finamp/Jellyfin refresh does not surface the playlist.
- Acceptable error / misclassification rate: 0 duplicate Jellyfin playlists; 0 unintended public/user playlists synced without matching the selected policy.
- Measurement window: Each cron run, with successful appearance expected within two cron intervals after playlist creation.

## 3. Solution Choice
- Recommended path: non-agent-automation
- Why this path fits current data and change frequency: The task is deterministic API orchestration: discover Spotify playlists, filter by policy, create missing Jellyfin playlists, write XML, refresh Jellyfin, and avoid duplicates on transient failures.
- Why the rejected paths are weaker: Prompt chains or AI agents add unnecessary ambiguity; fine-tuning is irrelevant because no semantic judgment is needed if the playlist inclusion policy is explicit.
- Smallest useful prototype: Add a Spotify discovery step for Mia's account that produces candidate playlists, persists Spotify ID to Jellyfin playlist mapping, creates missing Jellyfin playlists only after a successful discovery response, and populates XML in the same or next cron run.

## 4. Success Preview And Risk Plan
- Success standard: Mia creates or follows an eligible Spotify playlist; within two cron runs it exists in Jellyfin and appears in Finamp without Tao editing config or responding to warnings.
- Pause / kill signal: Any duplicate Jellyfin playlist creation, repeated API failures, or a discovered playlist whose eligibility cannot be determined safely.
- Degraded fallback: Keep the current explicit `PLAYLISTS` config path for pinned/manual playlists and print actionable warnings only for unsafe ambiguity, not normal new playlist onboarding.
- Owner and review cadence: Tao reviews cron logs after the first week and then only on failure alerts.
