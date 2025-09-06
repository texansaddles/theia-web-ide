# Project TODOs

- Vercel deploy: scope install to `examples/browser-only` (done via `vercel.json`).
- Pin Node to 20.x for builds (done in root `package.json`).
- Re-deploy on Vercel and verify `lib/index.html` serves.
- Add scheduler assistant package:
  - Create `packages/scheduler-assistant` (browser UI + common model).
  - Commands: Add Event, Reschedule, Find Conflicts, Summarize Week.
  - Persistence v1: localStorage in browser-only; v2: backend FS.
  - Chat tools: `addEvent`, `updateEvent`, `listEvents`, `findConflicts`.
- Integrate assistant into `examples/browser-only` (add to package deps, rebuild).
- Backend service (Render/Railway):
  - Containerize `examples/browser` and expose WebSockets.
  - Configure CORS and origin, set base URL for frontend.
  - Secrets storage for AI provider.
- AI provider wiring:
  - Use server route for provider keys (OpenAI/Vercel AI) — no secrets client-side.
  - Add minimal API and proxies.
- Docs: quick start for deploy + assistant usage.
