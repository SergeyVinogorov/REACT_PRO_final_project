# REACT_PRO_final_project_base — Final Project Improvements

This repository contains the base project + refactoring and additions to satisfy the final checklist:

## What was done (by tasks)

### 1) Architecture and structure
- Added `src/features/` layer and started moving feature logic there:
  - `features/auth` (SignInForm, SignUpForm)
  - `features/search` (Search + URL query params + debounce + Redux filter)
  - `features/cart` (business hook `useAddToCart`)
- Added commonly reused UI components in `src/shared/ui`:
  - `Button`, `Input`, `Loader`
- Reduced prop-chains by keeping feature logic close to feature modules.

### 2) Render optimizations
- `CardList` memoized (`React.memo`) and product-card list is memoized via `useMemo`.
- `Card` uses `useMemo` for derived `isProductInCart` and `useCallback` for add-to-cart handler, and is wrapped in `React.memo`.

> Profiler note (fill with your findings):  
> - Hotspot component(s): ____________________  
> - What changed after memoization: ____________________

### 3) React Portal modal (accessibility)
- Added `<div id="modal-root"></div>` to `public/index.html`
- Implemented `shared/ui/Modal` via `createPortal`
- Close handlers:
  - ESC
  - Overlay click
  - Close button ✕
- Focus handling:
  - Focus goes to ✕ on open
  - Focus returns to trigger on close
- Demo route: `/demo`

### 4) useRef real usage
- `features/refExamples/ClickTimer` stores state in `useRef` (no re-render) and logs to console.
- SignIn form autofocus implemented with `useRef` (email field).

### 5) Alternative build (Vite + SWC)
- Added `vite.config.ts` and root `index.html` for Vite build.
- Scripts:
  - `npm run dev:vite`
  - `npm run build:vite` -> outputs to `dist-vite/`
  - `npm run compare:builds` -> prints time & size to fill below.

**Build comparison (fill after running compare script):**
- Webpack time: ____ ms, size: ____ MB
- Vite time: ____ ms, size: ____ MB
- Short conclusion: ____________________

### 6) React 19 hooks (examples)
- Added `src/features/react19Examples` with:
  - `FormWithAsyncSave` (useActionState)
  - `TodoListOptimistic` (useOptimistic + transition)

> If your current React version is 18, upgrade `react`/`react-dom` to 19 to run these examples.

## Folder structure
- `src/shared` — UI + utilities + store + API
- `src/features` — feature modules (search, cart, react19Examples, refExamples)
- `src/pages` — route pages
- `src/widgets` — page composition blocks (header/footer/forms/lists)

## Demo
- Portal modal + useRef demo page: `http://localhost:3000/demo` (webpack) or `http://localhost:5173/demo` (vite)
- Screenshots/GIFs to add:
  - Modal portal (open + close)
  - React 19 form / optimistic UI
  - Profiler hotspot (before/after)

## Commands
### Webpack
- Dev: `npm run start` (or your existing dev script)
- Prod: `npm run build`

### Vite (alternative)
- Dev: `npm run dev:vite`
- Build: `npm run build:vite`
- Compare builds: `npm run compare:builds`
