# Salon Management Frontend — Architecture

## Overview

A **React 19** single-page application for managing salon operations. It employs a layered architecture separating API communication, business logic (hooks), and UI components, with first‑class support for **role-based access control**, **subscriptions/billing**, and **super admin observability**.

**Tech Stack:** React 19 · React Router 7 · Tailwind CSS 4 · Vite 7 · Axios · Framer Motion · Recharts · shadcn/ui · Sonner · Lucide Icons

---

## Directory Structure

```
src/
├── api/                  # API layer — thin axios wrappers
├── auth/                 # AuthContext, AuthProvider, useAuth.js, permissions.js
├── components/
│   ├── admin/            # Admin analytics & dashboard components
│   ├── bookings/         # Booking list & card components
│   ├── common/           # PageWrapper, ForbiddenState, ConfirmDialog
│   ├── home/             # Reusable dashboard widgets
│   ├── ui/               # shadcn/ui primitives & variants
│   └── ...               # Feature-specific UI
├── hooks/                # Custom hooks (e.g., useBooking, useDashboard, useSubscription, useAuditLogs)
├── layout/               # Sidebar, AppLayout, MobileSidebar
├── lib/                  # axios.js (interceptors), utils.js
├── pages/                # Pages, public marketplace, multi-step booking wizard, super admin views
└── routes/               # ProtectedRoutes, PublicRoutes, Role-based guards
```

---

## Application Bootstrap

```
index.html
  └── src/main.jsx
        └── <BrowserRouter>
              └── <AuthProvider>        ← src/auth/AuthProvider.jsx
                    └── <App />         ← src/App.jsx
```

The `AuthProvider` manages global auth state and bridges it to the `axios` instance via `injectAuth`. It handles session restoration on startup.

---

## Authentication & Authorization

### Key Files

| File | Purpose |
|------|---------|
| `auth/AuthContext.js` | Defines the React context for authentication. |
| `auth/AuthProvider.jsx` | Implements the provider, handles login/logout logic and session refresh, bridges auth to axios interceptors. |
| `auth/useAuth.js` | Custom hook to consume the AuthContext safely. |
| `auth/permissions.js` | Logic for `hasRole` and `hasAnyRole` checks. |
| `lib/axios.js` | Central API client with request/response interceptors for JWT injection, silent refresh, and logout on unrecoverable auth errors. |

### Access Control
- **`ProtectedRoutes`**: Wraps all authenticated routes and redirects unauthenticated users to `/`.
- **`PublicRoutes`**: Wraps marketing/auth routes and redirects authenticated users to their respective dashboards.
- **`RoleGuard`**: Declarative component that wraps routes or UI elements to enforce RBAC.
- **Navigation Filtering**: `config/navigation.js` defines `NAV_ITEMS` with `roles` and `excludeRoles` so the sidebar only renders entries the current user can access.

---

## Routing & Layout

- **Entry Routes**:
  - `/` → `Landing` (public marketing page).
  - `/login`, `/signup` → auth flows.
  - Authenticated routes are nested under `ProtectedRoutes` and `AppLayout`.
- **Role-Specific Areas**:
  - `/home` — dashboard for admins, staff, and customers.
  - `/salon`, `/services`, `/staff`, `/billing` — salon admin back office.
  - `/bookings` — shared booking module (list, details, and admin‑only creation).
  - `/salons` — public salon marketplace and booking entrypoint.
  - `/superadmin`, `/superadmin/audits` — super admin billing and audit views.
- **AppLayout**: Features a persistent Sidebar (desktop) and Sheet-based Drawer (mobile) plus global banners (e.g. subscription lifecycle) and upgrade modal.
- **Page Transitions**: Uses `AnimatePresence` + `PageTransition` (Framer Motion) to animate route changes.

---

## Data Architecture

### Hooks & API Layer
Custom hooks encapsulate all side effects and state management. Each hook talks to a focused `api/*.api.js` module or computes data from other hooks.

| Hook | Data Source | Feature |
|------|-------------|---------|
| `useDashboard` | `dashboard.api.js` | Admin summary stats. |
| `useBookingTrend`| `analytics.api.js` | Chart data for bookings/revenue. |
| `useBookingForecast`| `analytics.api.js` | 7‑day predictive analytics. |
| `useTrendInsights`| (Computed) | Growth metrics and smart alerts. |
| `useStaff` | `staff.api.js` | Staff CRUD and status toggling. |
| `useServices` | `service.api.js` | Service CRUD and cache invalidation. |
| `useSalon`, `useSalonServices`, `usePublicSalons`, `useSalonDetails` | `salon.api.js` | Salon profile and marketplace data. |
| `useBooking`, `useBookingForecast`, `useBookingTrend` | `booking.api.js`, `analytics.api.js` | Booking CRUD and analytics. |
| `useSubscription` | `subscription.api.js` | Current subscription plan and status. |
| `useAuditLogs` | audit endpoints | Super admin audit log reporting. |

### State Management
- **Auth State**: Centralized in `AuthContext` and surfaced via `useAuth`.
- **UI & View State**: Localized in components or custom hooks (e.g. filters, modals, wizards).
- **Server State / Cache**: Managed manually via hook‑level invalidation (re‑calling hooks on important mutations) rather than a global cache like React Query.

---

## Component Architecture

- **UI Primitives**: Built using **shadcn/ui**, leveraging `radix-ui` and `class-variance-authority` (CVA).
- **Theming**: Powered by Tailwind CSS 4 with OKLCH color variables in `index.css` and support for light/dark mode.
- **Charts**: Interactive time‑series data visualization using **Recharts** for home and admin dashboards.
- **Forms**: Controlled components with validation and loading states (e.g., `ServiceForm`, `SignupForm`, `StaffForm`).
- **Feedback**: Toast notifications via **Sonner** for success/error states across the app.

---

## Subscriptions, Billing & Paywall

- **Subscription Data**:
  - `useSubscription` + `subscription.api.js` provide the current plan, status, and trial information.
  - `LifecycleBanner` surfaces lifecycle events (trial, expiring, past due) globally in `AppLayout`.
- **Upgrade Flow**:
  - Feature‑gated components dispatch a custom `paywall` event on `window` with metadata about the blocked feature.
  - `AppLayout` listens for this event and opens `UpgradeModal`, passing along the paywall metadata.
  - `UpgradeModal` integrates with the billing/checkout flow (e.g. `/billing`, `/fake-success`) to upgrade the subscription.
- **Super Admin Billing View**:
  - `SuperAdminDashboard` calls `/api/admin/billing/metrics` to display aggregate subscription KPIs (active subscriptions, churn, plan distribution, conversions).

---

## Auditing & Super Admin Observability

- **Audit Data**:
  - `useAuditLogs` loads audit events for recent activity, a specific salon, an action, or a date range using specialized admin endpoints.
  - The hook normalizes status into `"loading" | "success" | "error"` for simple UI branching.
- **Audit Dashboard**:
  - `AuditDashboard` (super admin) consumes `useAuditLogs` and provides filtering/reporting views over audit events.
  - Routes under `/superadmin` are restricted to `ROLE_SUPER_ADMIN` via `RoleGuard`.

---

## Build & Tooling

- **Bundler**: Vite 7 with path aliases (`@/`).
- **Styling**: Tailwind CSS 4 (CSS-first configuration).
- **Linting**: ESLint with React-specific plugins.
- **Deployment**: Production build via `npm run build` targeting a standard static hosting environment.
