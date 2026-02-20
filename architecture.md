# Salon Management Frontend — Architecture

## Overview

A **React 19** single-page application for managing salon operations. It employs a layered architecture separating API communication, business logic (hooks), and UI components.

**Tech Stack:** React 19 · React Router 7 · Tailwind CSS 4 · Vite 7 · Axios · Framer Motion · Recharts · shadcn/ui · Sonner

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
├── hooks/                # Custom hooks (e.g., useBooking, useDashboard)
├── layout/               # Sidebar, AppLayout, MobileSidebar
├── lib/                  # axios.js (interceptors), utils.js
├── pages/                # Pages & Multi-step booking wizard
└── routes/               # ProtectedRoutes, PublicRoutes
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
| `auth/AuthProvider.jsx` | Implements the provider, handles login/logout logic and session refresh. |
| `auth/useAuth.js` | Custom hook to consume the AuthContext safely. |
| `auth/permissions.js` | Logic for `hasRole` and `hasAnyRole` checks. |
| `lib/axios.js` | Central API client with request/response interceptors for JWT injection and silent refresh. |

### Access Control
- **`ProtectedRoutes`**: Redirects unauthenticated users to `/`.
- **`PublicRoutes`**: Redirects authenticated users to their respective dashboards.
- **`RoleGuard`**: A declarative component that wraps routes or UI elements to enforce RBAC.

---

## Routing & Layout

- **Canonical Routes**: `/bookings` is the main entry for booking management, with aliases supported for legacy paths.
- **AppLayout**: Features a persistent Sidebar (Desktop) and Sheet-based Drawer (Mobile).
- **Page Transitions**: Uses `AnimatePresence` and `PageTransition` (Framer Motion) for smooth route changes.

---

## Data Architecture

### Hooks & API Layer
Custom hooks encapsulate all side effects and state management.

| Hook | Data Source | Feature |
|------|-------------|---------|
| `useDashboard` | `dashboard.api.js` | Admin summary stats. |
| `useBookingTrend`| `analytics.api.js` | Chart data for bookings/revenue. |
| `useBookingForecast`| `analytics.api.js` | 7-day predictive analytics. |
| `useTrendInsights`| (Computed) | Growth metrics and smart alerts. |
| `useStaff` | `staff.api.js` | Staff CRUD and status toggling. |
| `useServices` | `service.api.js` | Service CRUD and cache invalidation. |

### State Management
- **Auth State**: Centralized in `AuthContext`.
- **UI State**: Localized in components or custom hooks.
- **Cache**: Managed manually via hook-level invalidation (e.g., `useServiceStaff`).

---

## Component Architecture

- **UI Primitives**: Built using **shadcn/ui**, leveraging `radix-ui` and `class-variance-authority` (CVA).
- **Theming**: Powered by Tailwind CSS 4 with OKLCH color variables in `index.css`.
- **Charts**: Interactive time-series data visualization using **Recharts**.
- **Forms**: Controlled components with validation and loading states (e.g., `ServiceForm`, `SignupForm`).

---

## Build & Tooling

- **Bundler**: Vite 7 with path aliases (`@/`).
- **Styling**: Tailwind CSS 4 (CSS-first configuration).
- **Linting**: ESLint with React-specific plugins.
- **Deployment**: Production build via `npm run build` targeting a standard static hosting environment.
