<!-- .github/copilot-instructions.md - Project-specific guidance for AI coding agents -->
# Copilot / AI agent instructions for `guitarist` (final-project)

This file gives concise, discoverable facts about the codebase so an AI coding agent can be productive immediately.

- Project type: React app scaffolded with Vite (see `package.json`, `vite.config.js`). Dev server: `npm run dev`.
- Main entry: `src/main.jsx` -> `src/App.jsx`. Routes are defined with `react-router-dom` in `App.jsx`.

- Major folders:
  - `src/assets/pages/` — page components (e.g., `home.jsx`, `about.jsx`, `chords/`, `tuner/`).
  - `src/components/` — shared UI (e.g., `header.jsx`, `footer.jsx`, `MainMenu/`, `lessonMenu/`).
  - `src/assets/pages/tuner/` — contains the tuner feature: `tuner.jsx`, `micAccess.jsx`, styles.

- Important libraries/dependencies:
  - `react` / `react-dom` / `react-router-dom` (v7) — routing and UI.
  - `vite` — dev server and build pipeline.
  - `@mui/material` — used for occasional UI (see `Home`/buttons).
  - `pitchfinder` — pitch-detection used by `MicAccess` (AMDF algorithm).

- Architecture & data flow (big picture):
  - Routing is client-side. `App.jsx` registers routes for pages under `src/assets/pages`.
  - The Tuner feature is implemented as a page component (`tuner.jsx`) that embeds `MicAccess`.
    - `MicAccess` requests microphone access, creates an AudioContext, and uses `pitchfinder` to detect pitch.
    - `MicAccess` calls the `onData(pitch)` callback when a pitch is found. `tuner.jsx` consumes that pitch and computes "cents".
  - Components prefer small, single-responsibility files (see `LessonMenu`, `MainMenu`). Expect simple props-based patterns.

- Project-specific conventions and patterns:
  - File naming: JSX components use lower/upper-case mixed filenames (`home.jsx`, `mainManu.jsx`); follow existing patterns when adding files.
  - CSS modules are not used; styles are regular `.css` files imported by components (e.g., `tuner.css`, `lessonMenu.css`, `mainMenu.css`).
  - Minimal state management: local component state (useState/useEffect). No global store present.
  - Non-English (Hebrew) inline comments exist in some files; preserve or translate carefully when touching those lines.
  - Use prop callbacks for communication from children -> parent (example: `MicAccess` uses `onListeningChange` and `onData`).

- Common code patterns to follow when editing:
  - For audio work, keep all AudioContext and stream cleanup in `stop` functions and call `.close()` / `.getTracks().forEach(track.stop())` to avoid dangling hardware handles (see `micAccess.jsx`).
  - When adding routes, update `App.jsx` and add the page under `src/assets/pages/`.
  - Use `useEffect` with proper cleanup for intervals/timeouts (see `tuner.jsx` pattern).

- Build, run, and lint commands (developer workflows):
  - Dev server (HMR): `npm run dev` (Vite) — default port 5173.
  - Build for production: `npm run build`.
  - Preview production build: `npm run preview`.
  - Lint: `npm run lint` (ESLint configured). Running lint after edits is recommended.

- Integration points & gotchas:
  - Microphone access: `MicAccess` uses `navigator.mediaDevices.getUserMedia`. Running in insecure contexts (file://) or without HTTPS may block access; use `npm run dev` or a preview build.
  - `AudioContext.createScriptProcessor` is used — this API is deprecated in some browsers; be conservative when refactoring audio code.
  - `pitchfinder` returns `undefined` when no pitch is detected; callers check for a truthy pitch before using it.
  - Asset imports: images and fonts are imported via relative paths (see `index.css` font-face and `tuner.jsx` image import). Keep paths consistent.

- Files to inspect for context when changing behavior:
  - `src/assets/pages/tuner/micAccess.jsx` — microphone/audio lifecycle and pitch detection.
  - `src/assets/pages/tuner/tuner.jsx` — tuning logic, conversion to cents, UI for tuner.
  - `src/App.jsx` and `src/main.jsx` — app wiring and routing.
  - `package.json`, `vite.config.js` — run/build scripts and plugins.

- Example edits the agent can do safely:
  - Add a new page: create `src/assets/pages/<name>.jsx`, add route in `App.jsx`, and add a CSS file if needed.
  - Improve pitch smoothing: modify `tuner.jsx` to average recent pitches (notes array) and update the display.
  - Replace `createScriptProcessor` with AudioWorklet (advanced) — only if tests/manual check confirm mic still works across Chrome/Firefox.

If anything here is unclear or you want broader edits (tests, CI, refactors), tell me which area to expand and I'll iterate.
