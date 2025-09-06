# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Lerna. Key folders:
  - `packages/*`: Theia extension packages (code in `src/{browser,node,common}`).
  - `dev-packages/*`: Tooling and shared developer utilities.
  - `examples/*`: Runnable apps (`browser`, `browser-only`, `electron`, `playwright`).
  - `configs/`: Shared ESLint, TS, NYC configs. `scripts/`: build/test utilities.
  - `sample-plugins/*/*`: Example VS Code/Theia plugins.
- Tests live beside sources as `*.spec.ts` (e.g., `packages/<pkg>/src/common/foo.spec.ts`).

## Build, Test, and Development Commands
- `npm ci` or `npm install`: Install workspace deps (Node ≥ 20).
- `npm run build`: Compile all packages and example applications.
- `npm run start:browser` | `start:electron`: Run example apps locally.
- `npm test`: Run Theia package tests, Electron tests, and Browser tests.
- `npm run test:theia` | `test:browser` | `test:electron`: Scope tests.
- `npm run watch`: Rebuild and run browser/electron in watch mode.
- `npm run lint` | `lint:fix`: Lint all packages; auto-fix issues.
- `npm run clean`: Clean caches and package outputs.

## Coding Style & Naming Conventions
- TypeScript-first. Follow ESLint configs in `configs/*.eslintrc.json`.
- Indentation per `.editorconfig`: 4 spaces for `*.{ts,tsx,js,md}`, 2 for `*.{json,yml}`.
- File names: kebab-case; tests use `*.spec.ts`.
- Organize code by runtime: `src/browser`, `src/node`, `src/common`.
- Prefer explicit types; avoid `any`. Run `npm run lint` before committing.

## Testing Guidelines
- Frameworks: Mocha + Chai (with `electron-mocha` where relevant).
- Coverage via NYC (`configs/nyc.json`, reports: `html`, `lcov`).
- Place unit tests next to code; name with `.spec.ts`.
- Keep tests deterministic; avoid timing flakiness and network calls.

## Commit & Pull Request Guidelines
- Use Conventional Commit style when possible: `feat(scope): message`, `fix(scope): message`, `chore: message`. Keep subject imperative and concise.
- Include context: linked issues, rationale, and for UI changes, screenshots.
- PRs must pass CI (build, lint, tests). Update docs and changelog entries when applicable.

## Security & Configuration Tips
- Review `SECURITY.md`. Never commit secrets.
- Native deps use `node-gyp`; ensure platform build tools are available.
- License checks: `npm run license:check` (or `:review`).
