# Project knowledge

Salon Management Frontend — a React 19 SPA for salon operations (bookings, services, staff, analytics) with three user roles: Salon Admin, Staff, Customer.

## Quickstart
- Setup: `npm install` then create `.env` with `VITE_API_BASE_URL=http://localhost:8080`
- Dev: `npm run dev` (Vite dev server at localhost:5173)
- Build: `npm run build`
- Lint: `npm run lint`
- Preview: `npm run preview`
- No test framework is configured.

## Tech Stack
React 19 · Vite 7 · React Router 7 · Tailwind CSS 4 · shadcn/ui (New York style, JSX, no RSC) · Axios · Recharts · Framer Motion · Lucide React · Sonner (toasts)

## Architecture
- `src/api/` — Thin axios wrappers per domain. Two styles coexist: object-based (`salonApi.getMySalon()`) and named exports (`fetchBookings()`).
- `src/auth/` — AuthContext (JWT in-memory + httpOnly refresh cookies), RoleGuard, permission helpers. Roles: `ROLE_SALON_ADMIN`, `ROLE_STAFF`, `ROLE_USER`.
- `src/components/ui/` — shadcn/ui primitives (Radix UI + CVA). Add new ones via `npx shadcn@latest add <component>`.
- `src/components/{domain}/` — Feature components per domain (admin, bookings, staff, services, home, user).
- `src/components/common/` — Shared layout primitives (PageWrapper, PageHeader, PageTransition, EmptyStateCard, ConfirmActionDialog).
- `src/hooks/` — All data fetching in custom hooks. Pattern: `useState` + `useEffect` with `status` state machine (`loading | ok | error | forbidden | not_found`). No global state library.
- `src/pages/` — Route-level page components. `pages/bookings/` has a 3-step booking wizard.
- `src/layout/` — App shell with collapsible sidebar (desktop) and sheet drawer (mobile).
- `src/lib/axios.js` — Shared axios instance with auth interceptors and token refresh coordination.
- `src/config/navigation.js` — Nav items with role-based filtering.
- Path alias: `@/` → `./src/` (configured in both `vite.config.js` and `jsconfig.json`).

## Conventions
- **Language:** JavaScript (JSX), not TypeScript.
- **Styling:** Tailwind CSS 4 with CSS-first config (no `tailwind.config.js`). Theme tokens via CSS custom properties in `src/index.css` using oklch colors. Light/dark mode via `.dark` class.
- **Components:** Use shadcn/ui primitives from `components/ui/`. Use `cn()` from `@/lib/utils` for conditional class merging.
- **Data fetching:** Encapsulate in custom hooks in `src/hooks/`. Follow the existing `status` state machine pattern.
- **API layer:** One file per domain in `src/api/`. Use the shared axios instance from `@/lib/axios`.
- **Routing:** Role-guarded via `RoleGuard` component. Public routes redirect authenticated users.
- **Animations:** Framer Motion for page transitions, `tw-animate-css` for utility animations.
- **Linting:** ESLint with react-hooks and react-refresh plugins. Unused vars error except capitalized/underscore-prefixed.
- **No TypeScript** — the project uses plain JS/JSX throughout.
- **No test framework** — no Jest, Vitest, or similar is configured.
