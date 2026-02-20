# Salon Management Frontend

A modern, role-based salon management web application built with **React 19** and **Vite 7**. It provides a complete platform for salon operations — bookings, services, staff management, and analytics — serving three distinct user roles: **Salon Admins**, **Staff**, and **Customers**.

## Features

### For Salon Admins
- **Dashboard** — Real-time stats, booking/revenue trend charts, leaderboards, and recent bookings.
- **Booking Forecast** — Predictive analytics for the next 7 days using historical trends.
- **Salon Management** — Create and edit salon profile.
- **Service Management** — Full CRUD for services with active/inactive toggling.
- **Staff Management** — Add staff, assign services, and manage staff status.
- **Booking Management** — Searchable, filterable list of all bookings with status management.
- **Analytics** — Time-series booking/revenue trends, smart alerts for spikes/drops, and CSV export.

### For Staff
- **Staff Dashboard** — Today's schedule, stats summary, and next-up booking highlight.
- **Booking Actions** — Mark bookings as completed or no-show.

### For Customers
- **Public Salon Marketplace** — Browse and explore salons and their services.
- **Multi-Step Booking Wizard** — Select service → pick staff & date → choose time slot → confirm.
- **Personal Dashboard** — View upcoming and past bookings, manage profile.

### General
- **Role-Based Access Control** — Routes and UI adapt based on user role.
- **Responsive Design** — Collapsible desktop sidebar, mobile drawer navigation.
- **Page Transitions** — Smooth fade + slide animations between routes via Framer Motion.
- **Light/Dark Mode** — Full theme support via OKLCH color space and CSS variables.
- **Toast Notifications** — Instant feedback via Sonner.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Bundler** | Vite 7 |
| **Routing** | React Router 7 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui (Radix UI + CVA) |
| **HTTP Client** | Axios |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Toasts** | Sonner |

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (or your preferred package manager)
- A running instance of the Salon Management **backend API** (defaults to `http://localhost:8080`)

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/            # API layer — axios wrappers per domain
├── auth/           # Auth Context, Provider, and useAuth hook
├── components/
│   ├── admin/      # Admin dashboard & analytics
│   ├── bookings/   # Booking cards & list components
│   ├── common/     # Shared layout primitives (PageWrapper, etc.)
│   ├── home/       # Dashboard widgets (Charts, Stats)
│   ├── ui/         # shadcn/ui primitives
│   └── ...         # Feature-specific components
├── config/         # Navigation & role-based route config
├── hooks/          # Custom hooks — data fetching & business logic
├── layout/         # App shell — Sidebar, Mobile Drawer
├── lib/            # Axios instance & utility helpers
├── pages/          # Route-level page components
└── routes/         # Protected and Public route guards
```

## Authentication

The app uses **JWT-based authentication**:
- **Access tokens** stored in React state for security.
- **Refresh tokens** handled via httpOnly cookies for automatic session restoration.
- **Axios interceptors** manage transparent token refresh and 401 error handling.
