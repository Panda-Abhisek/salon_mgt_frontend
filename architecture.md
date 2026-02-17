# Salon Management Frontend — Architecture

## Overview

A **React 19** single-page application for managing salon operations — bookings, services, staff, and analytics. It serves three distinct user roles (**Salon Admin**, **Staff**, **User/Customer**) with role-based routing, dashboards, and a public salon marketplace.

**Tech Stack:** React 19 · React Router 7 · Tailwind CSS 4 · Vite 7 · Axios · Framer Motion · Recharts · shadcn/ui (Radix UI) · Sonner (toasts)

---

## Directory Structure

```
src/
├── api/                  # API layer — thin axios wrappers per domain
├── auth/                 # Auth context, role guards, permission helpers
├── components/
│   ├── admin/            # Admin dashboard components
│   ├── bookings/         # Booking card components
│   ├── common/           # Shared layout primitives (PageWrapper, PageHeader, etc.)
│   ├── home/             # Home page widgets (StatCard, TrendChart, Leaderboard)
│   ├── salon/            # Salon-specific components (skeletons)
│   ├── services/         # Service CRUD components (ServiceCard, ServiceForm)
│   ├── staff/            # Staff CRUD components (StaffCard, StaffForm, AssignServicesDialog)
│   ├── ui/               # shadcn/ui primitives (Button, Card, Dialog, Sheet, etc.)
│   └── user/             # User/customer dashboard
├── config/               # Navigation config (NAV_ITEMS with role-based filtering)
├── hooks/                # Custom hooks — data fetching & business logic
├── layout/               # App shell — Sidebar, MobileSidebar, AppLayout
├── lib/                  # Utilities — axios instance, cn() helper
├── pages/                # Route-level page components
│   ├── bookings/         # Booking flow (NewBooking wizard, BookingList, BookingDetails)
│   │   ├── steps/        # Multi-step booking wizard sub-components
│   │   └── utils/        # Slot-building utilities
│   └── public/           # Public marketplace pages (SalonList, SalonDetails)
└── routes/               # Route guards (ProtectedRoutes, PublicRoutes)
```

---

## Application Bootstrap

```
index.html
  └── src/main.jsx
        └── <BrowserRouter>
              └── <AuthProvider>        ← global auth state
                    └── <App />         ← route definitions
```

**`main.jsx`** mounts the app inside `BrowserRouter` and `AuthProvider`. The `AuthProvider` attempts a silent session restore via refresh token on startup (setting `initializing = true` until complete). `App.jsx` shows a skeleton until initialization finishes.

---

## Authentication & Authorization

### Auth Flow

| Step | Description |
|------|-------------|
| **Login** | `POST /api/auth/login` → receives `accessToken` → fetches user via `GET /api/auth/me` |
| **Session Restore** | On mount, `POST /api/auth/refresh` → new `accessToken` → `GET /api/auth/me` |
| **Token Refresh** | Axios response interceptor catches `401` → calls `/api/auth/refresh` → retries original request |
| **Logout** | `POST /api/auth/logout` → clears in-memory state |

### Key Files

| File | Purpose |
|------|---------|
| `auth/AuthContext.jsx` | React context providing `user`, `login()`, `logout()`, `hasRole()`, `hasAnyRole()`, `isAuthenticated`, `initializing` |
| `auth/permissions.js` | Pure functions `hasRole(user, role)` and `hasAnyRole(user, roles)` |
| `auth/RoleGuard.jsx` | Inline route guard — renders children if user has required role, otherwise shows `ForbiddenStateCard` |
| `auth/roleUtils.js` | `getPrimaryRole(hasRole)` — maps to `ADMIN`, `STAFF`, `USER`, or `GUEST` |

### Axios Integration (`lib/axios.js`)

- Creates an axios instance with `baseURL` from `VITE_API_BASE_URL` (defaults to `http://localhost:8080`)
- `withCredentials: true` for cookie-based refresh tokens
- **Request interceptor:** Attaches `Bearer <accessToken>` header
- **Response interceptor:** On `401`, coordinates a single refresh attempt across concurrent requests using a shared `refreshPromise`, then retries. Logs out on refresh failure.
- Auth functions are injected via `injectAuth()` from `AuthContext` (avoids circular imports)

### Roles

| Role | Access |
|------|--------|
| `ROLE_SALON_ADMIN` | Full salon management — salon CRUD, services, staff, bookings, analytics |
| `ROLE_STAFF` | Staff dashboard, today's bookings, complete/no-show actions |
| `ROLE_USER` | Public marketplace, book appointments, manage own bookings |

---

## Routing

### Route Structure (`App.jsx`)

```
<Routes>
  ── PublicRoutes (redirects authenticated users)
  │   ├── /              → Landing
  │   ├── /login         → Login
  │   └── /signup        → Signup
  │
  ── ProtectedRoutes (redirects unauthenticated users)
      └── AppLayout (sidebar + main content)
          ├── /salons                → SalonList (marketplace)
          ├── /salons/:salonId       → SalonDetails
          ├── /salons/:salonId/book  → NewBooking (marketplace flow)  [USER, ADMIN]
          ├── /home                  → Home (role-based dashboard)     [ADMIN, STAFF, USER]
          ├── /me                    → Me (profile)
          ├── /bookings              → BookingList                    [USER, STAFF, ADMIN]
          ├── /bookings/new          → NewBooking (admin flow)        [ADMIN]
          ├── /bookings/:bookingId   → BookingDetails
          ├── /salon                 → Salon (manage own salon)       [ADMIN]
          ├── /services              → Services                      [ADMIN]
          └── /staff                 → Staff                         [ADMIN]
```

### Route Guards

- **`PublicRoutes`**: If authenticated, redirects admins/staff → `/home`, users → `/salons`
- **`ProtectedRoutes`**: If not authenticated, redirects → `/`
- **`RoleGuard`**: Inline component wrapping specific routes; shows `ForbiddenStateCard` if role mismatch

---

## Layout System

### `AppLayout.jsx`

```
┌──────────────────────────────────────────┐
│  ┌──────────┐  ┌───────────────────────┐ │
│  │          │  │ MobileSidebar (md:-)  │ │
│  │ Sidebar  │  ├───────────────────────┤ │
│  │ (md:+)   │  │ PageHeader            │ │
│  │          │  │ (breadcrumbs)         │ │
│  │          │  ├───────────────────────┤ │
│  │          │  │ AnimatePresence       │ │
│  │          │  │   └── PageTransition  │ │
│  │          │  │         └── <Outlet/> │ │
│  └──────────┘  └───────────────────────┘ │
└──────────────────────────────────────────┘
```

- **Desktop**: Collapsible sidebar (`w-64` ↔ `w-16`) with navigation, profile, and logout
- **Mobile**: Sheet-based drawer triggered by hamburger menu, auto-closes on route change
- **Page transitions**: Framer Motion fade + slide animations via `PageTransition`
- **Breadcrumbs**: Auto-generated from `NAV_ITEMS` config via `useBreadcrumbs` hook

### Navigation Config (`config/navigation.js`)

Each nav item specifies `label`, `path`, `icon`, `roles`, and optional `excludeRoles`. The sidebar filters items based on the current user's roles.

---

## Data Architecture

### API Layer (`src/api/`)

Thin wrapper functions around the shared axios instance. Each file corresponds to a backend domain:

| File | Endpoints |
|------|-----------|
| `auth.api.js` | `POST /api/auth/register`, `POST /api/auth/login` |
| `salon.api.js` | `GET/POST/PUT /api/salons/me`, `GET /api/public/salons/**` |
| `service.api.js` | `GET/POST/PUT /api/salons/services/**`, toggle activate/deactivate |
| `staff.api.js` | `GET/POST /api/salons/staff/**`, activate/deactivate |
| `booking.api.js` | `GET/POST /api/bookings/**`, availability, cancel, complete, no-show |
| `dashboard.api.js` | `GET /api/bookings/dashboard/admin` |
| `staffDashboard.api.js` | `GET /api/bookings/today` |
| `analytics.api.js` | `GET /api/analytics/bookings/trend`, revenue trend, leaderboards |
| `home.api.js` | `GET /api/salons/me` (salon existence check) |

Two API styles coexist:
- **Object-based** (`salonApi.getMySalon()`, `serviceApi.getAll()`) — used for CRUD-heavy domains
- **Named exports** (`fetchBookings()`, `createBooking()`) — used for action-oriented APIs

### Custom Hooks (`src/hooks/`)

All data fetching is encapsulated in hooks following a consistent pattern:

```js
const [data, setData] = useState(null);
const [status, setStatus] = useState("loading"); // loading | ok | error | forbidden | not_found

useEffect(() => { load(); }, [deps]);

return { data, status, ...mutations };
```

| Hook | Purpose |
|------|---------|
| `useSalon` | Salon CRUD with `status` state machine (`loading`, `ok`, `not_found`, `forbidden`, `error`) |
| `useServices` | Service list + create/update/toggle operations |
| `useServiceStaff` | Cached staff-per-service map with invalidation |
| `useStaff` | Staff list + add/toggle status |
| `useBooking` | Single booking detail + cancel/complete/noShow actions |
| `useHome` | Salon existence check for home page routing |
| `useDashboard` | Admin dashboard summary stats |
| `useStaffDashboard` | Staff's today bookings + derived stats (via `useMemo`) |
| `useUserDashboard` | Customer's upcoming/past bookings |
| `useBookingTrend` | Time-series analytics (bookings or revenue) |
| `useTrendInsights` | Derived analytics — peak day, growth %, alerts (pure `useMemo` computation) |
| `useLeaderboards` | Top staff & services rankings |
| `usePublicSalons` | Public salon marketplace list |
| `useSalonDetails` | Public salon detail + services |
| `useSalonServices` | Public services for a specific salon |
| `useBreadcrumbs` | Breadcrumb generation from `NAV_ITEMS` + current path |

### State Management

- **No global state library** — all state is managed via React Context (`AuthContext`) and local component/hook state
- **In-memory auth tokens** — access token stored in React state (not localStorage), refresh token handled via httpOnly cookies
- **Cache invalidation** — manual via `invalidate()` / `invalidateAll()` functions in hooks like `useServiceStaff`

---

## Component Architecture

### Component Categories

| Category | Location | Examples |
|----------|----------|---------|
| **Pages** | `pages/` | `Home`, `Login`, `Salon`, `Services`, `Staff`, `BookingList` |
| **Feature Components** | `components/{domain}/` | `AdminDashboard`, `StaffDashboard`, `UserDashboard`, `ServiceCard`, `StaffCard` |
| **Common Components** | `components/common/` | `PageWrapper`, `PageHeader`, `PageTransition`, `EmptyStateCard`, `ForbiddenStateCard`, `ConfirmActionDialog` |
| **UI Primitives** | `components/ui/` | `Button`, `Card`, `Dialog`, `Sheet`, `Input`, `Badge`, `Skeleton`, `Checkbox`, `Separator` |

### UI Component Library

Built with **shadcn/ui** (New York style) using:
- **Radix UI** for accessible, unstyled primitives
- **class-variance-authority (CVA)** for variant-based styling
- **Tailwind CSS 4** with CSS custom properties for theming (light/dark via oklch colors)
- **`cn()` utility** (`clsx` + `tailwind-merge`) for conditional class merging

---

## Key Feature Flows

### Multi-Step Booking Wizard (`pages/bookings/NewBooking.jsx`)

A 3-step wizard that works in both **admin mode** and **marketplace mode**:

```
Step 1: SelectServiceStep   → Pick a service
Step 2: SelectStaffDateStep → Pick staff member + date
Step 3: SelectSlotStep      → Pick available time slot → Confirm
```

- **Admin mode** (`/bookings/new`): Uses `useServices` (private salon services)
- **Marketplace mode** (`/salons/:salonId/book`): Uses `useSalonServices` (public API)
- Availability is fetched per staff+service+date combination
- Slots are computed client-side via `slotUtils.js`

### Role-Based Home Page (`pages/Home.jsx`)

The home page renders different dashboards based on `getPrimaryRole()`:

| Role | Dashboard | Data Source |
|------|-----------|-------------|
| **ADMIN** | `AdminDashboard` — stats, booking trend chart, revenue analytics, leaderboards, recent bookings | `useDashboard`, `useBookingTrend`, `useTrendInsights`, `useLeaderboards` |
| **STAFF** | `StaffDashboard` — today's stats, next booking highlight, today's booking list | `useStaffDashboard` |
| **USER** | `UserDashboard` — next booking, upcoming list, past bookings | `useUserDashboard` |

### Admin Analytics

- **Booking/Revenue Trend Chart**: Time-series visualization with preset ranges (7D, 30D, 90D) or custom date ranges
- **Trend Insights**: Computed metrics — peak day, growth %, density (per day), smart alerts for spikes/drops
- **Leaderboards**: Top staff and top services by booking count
- **CSV Export**: Client-side CSV generation from trend data

---

## Styling & Theming

- **Tailwind CSS 4** with `@tailwindcss/vite` plugin (no `tailwind.config.js` — uses CSS-first configuration)
- **CSS custom properties** for all design tokens (colors, radii) defined in `index.css`
- **Light/Dark mode** support via `.dark` class variant (using `oklch` color space)
- **Animation**: `tw-animate-css` for utility animations + Framer Motion for page transitions
- **Responsive**: Mobile-first with `sm:` / `md:` / `lg:` / `xl:` breakpoints

---

## Build & Tooling

| Tool | Config | Purpose |
|------|--------|---------|
| **Vite 7** | `vite.config.js` | Dev server, HMR, production build |
| **ESLint** | `eslint.config.js` | Linting with React Hooks + React Refresh plugins |
| **Path aliases** | `jsconfig.json` + `vite.config.js` | `@/` → `./src/` |
| **shadcn/ui** | `components.json` | Component generation config (New York style, no RSC, JSX) |

### Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

---

## Backend API Contract

The frontend expects a **REST API** at `VITE_API_BASE_URL` (default: `http://localhost:8080`) with:

- **JWT-based auth** with access tokens (in-memory) and refresh tokens (httpOnly cookies)
- **Role-based authorization** (`ROLE_SALON_ADMIN`, `ROLE_STAFF`, `ROLE_USER`)
- **Paginated responses** for listings (`{ content, totalPages, totalElements }`)
- **RESTful resource paths**: `/api/salons/`, `/api/salons/services/`, `/api/salons/staff/`, `/api/bookings/`, `/api/analytics/`, `/api/public/`

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐  │
│  │   Pages      │──▶│  Hooks       │──▶│  API Layer  │──┼──▶ Backend REST API
│  │  (Routes)    │   │  (State +    │   │  (Axios)    │  │    (localhost:8080)
│  │             │   │   Logic)     │   │             │  │
│  └──────┬──────┘   └──────────────┘   └─────────────┘  │
│         │                                               │
│         ▼                                               │
│  ┌─────────────┐   ┌──────────────┐                     │
│  │  Feature     │   │  UI          │                     │
│  │  Components  │──▶│  Primitives  │                     │
│  │  (domain)    │   │  (shadcn/ui) │                     │
│  └─────────────┘   └──────────────┘                     │
│         │                                               │
│         ▼                                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Auth Context (JWT tokens, role checks, guards) │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Layout Shell (Sidebar + PageTransition + Outlet)│    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
