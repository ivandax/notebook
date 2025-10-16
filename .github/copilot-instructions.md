## Project snapshot

- Stack: React + TypeScript + Vite. Project alias: `@` -> `./src` (see `vite.config.ts`).
- Auth + backend: Supabase client in `src/supabaseClient.ts`. Env vars expected: `VITE_API_KEY` and `VITE_SUPABASE_PROJECT_ID`.
- State: lightweight global state using `zustand` in `src/state/sessionStore.ts`.
- Services: thin wrappers around Supabase in `src/services/*` (e.g. `auth.ts`, `user_profiles.ts`).
- UI: Tailwind CSS utility classes throughout (`src/components`, `src/views`) and `sonner` for toasts.

## Where to start (for agents editing code)

- To run locally: use the package scripts in `package.json`: `dev` (vite), `build` (tsc -b && vite build), `lint` (eslint).
- Editing auth or user data: update `src/services/auth.ts` and `src/services/user_profiles.ts`. They return `{ data, error }` or `error` objects and rely on `src/supabaseClient.ts`.
- Hook that wires session lifecycle: `src/hooks/use-supabase-client.ts`. It calls `supabase.auth.getSession()` and subscribes to `onAuthStateChange` and sets the zustand store via exported setters like `setSession` and `setUserProfile`.

## Conventions & patterns unique to this repo

- Import alias: always prefer `@/path/to/file` instead of long relative paths.
- Services return Supabase results directly (do not convert errors to thrown exceptions). Follow existing pattern: return `{ data, error }` or `error` and let the caller handle UI/toasts.
- Global session store: prefer using exported setters from `src/state/sessionStore.ts` (e.g. `setSession`, `setUserProfile`) rather than calling `useSessionStore.setState` inline.
- Date display: views format `created_at` using `new Date(...).toLocaleString()` (see `src/views/settings.tsx`). Keep UI logic minimal in services and business logic in services/hooks.

## Key files to reference when changing features

- `src/supabaseClient.ts` — single Supabase client creation; update env usages here.
- `src/services/auth.ts` — signUp/signIn/signOut/reset helpers. Example: `signOut()` calls `supabase.auth.signOut()` and returns `{ error }`.
- `src/services/user_profiles.ts` — queries `profiles` table using `.from('profiles')...single()` and logs on error.
- `src/hooks/use-supabase-client.ts` — session initialization + profile fetch logic. When changing session flow, update this hook.
- `src/state/sessionStore.ts` — zustand store shape: `session`, `isLoadingSession`, `userProfile`. Use exported setters: `setSession`, `setIsLoadingSession`, `setUserProfile`.
- `src/views/*.tsx` — UI consumes the store via `useSessionStore` (example: `src/views/settings.tsx` uses `userProfile` and calls `signOut`).

## Build & developer workflow notes

- Typical dev run: `npm run dev` (or `yarn dev`). Build: `npm run build`.
- Linting: `npm run lint` uses ESLint and the project includes `vite-plugin-eslint` and `vite-plugin-checker` in `vite.config.ts`.
- Supabase local development: repository contains `supabase/` with migrations. The README contains guidance to run local Supabase (e.g., `yarn supabase start`, `yarn supabase db reset`, `yarn supabase migration new ...`). When modifying DB schema add a migration under `supabase/migrations`.

## Editing guidelines for common tasks (concrete examples)

- Add or update an auth flow (password reset, email redirect):
  - Update `src/services/auth.ts` to change redirect URLs or Supabase options (see `emailRedirectTo` / `redirectTo`).
  - Ensure `VITE_*` env values are set for the running environment; update `src/supabaseClient.ts` if you need different host logic.

- Fetching/storing user profile:
  - `useSupabaseClient` calls `getUserProfile(session.user.id)`; if you add fields to `profiles`, update `domain/users.ts` types and `user_profiles.ts` select clauses.

- Handling UI state after auth changes:
  - Use `setSession(session)` and `setUserProfile(profile)` exported from `src/state/sessionStore.ts`. Do not directly mutate store shape from components.

## What not to change lightly

- `src/supabaseClient.ts`: single client instance used across services. Recreating the client or changing the base URL impacts all services.
- `useSupabaseClient` hook: it both initializes the session and subscribes to auth changes. Removing its side effects requires replacing where it is mounted (usually near app root).

## Examples of useful quick edits for agents

- Small fix: If a service currently `console.error` on failure (see `src/services/user_profiles.ts`), prefer returning `null` and the error to the caller rather than throwing.
- Adding a new page: create a new file in `src/views/`, wire it into the router (see `src/views/root.tsx` or existing routing patterns), and import styles via `@/index.css` as used elsewhere.

## Where to look for more context

- `README.md` (project-level development notes, supabase local commands, and migration hints).
- `vite.config.ts` (alias + plugin list). 
- `package.json` scripts.

If anything above is unclear or you want additional examples (like common PR changes or a small unit test scaffold), say which area to expand and I will iterate.
