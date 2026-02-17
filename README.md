# Salon Management Frontend

A modern, role-based salon management web application built with **React 19** and **Vite 7**. It provides a complete platform for salon operations — bookings, services, staff management, and analytics — serving three distinct user roles: **Salon Admins**, **Staff**, and **Customers**.

## Features

### For Salon Admins
- **Dashboard** — Real-time stats, booking/revenue trend charts, leaderboards, and recent bookings
- **Salon Management** — Create and edit salon profile
- **Service Management** — Full CRUD for services with activate/deactivate toggling
- **Staff Management** — Add staff, assign services, and manage staff status
- **Booking Management** — View all bookings, create bookings on behalf of customers, and manage booking status
- **Analytics** — Time-series booking/revenue trends, peak day detection, growth metrics, CSV export

### For Staff
- **Staff Dashboard** — Today's schedule, stats summary, and next-up booking highlight
- **Booking Actions** — Mark bookings as completed or no-show

### For Customers
- **Public Salon Marketplace** — Browse and explore salons and their services
- **Multi-Step Booking Wizard** — Select service → pick staff & date → choose time slot → confirm
- **Personal Dashboard** — View upcoming and past bookings, cancel appointments

### General
- **Role-Based Access Control** — Routes and UI adapt based on user role
- **Responsive Design** — Collapsible desktop sidebar, mobile drawer navigation
- **Page Transitions** — Smooth fade + slide animations between routes
- **Light/Dark Mode** — Full theme support via CSS custom properties
- **Toast Notifications** — Feedback for all user actions via Sonner

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
| **Linting** | ESLint |

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (or your preferred package manager)
- A running instance of the Salon Management **backend API** (defaults to `http://localhost:8080`)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd salon_mgt_frontend
   ```

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

   The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project Structure

```
src/
├── api/            # API layer — thin axios wrappers per domain
├── auth/           # Auth context, role guards, permission helpers
├── components/
│   ├── admin/      # Admin dashboard components
│   ├── bookings/   # Booking card components
│   ├── common/     # Shared layout primitives (PageWrapper, PageHeader, etc.)
│   ├── home/       # Home page widgets (StatCard, TrendChart, Leaderboard)
│   ├── salon/      # Salon-specific components
│   ├── services/   # Service CRUD components (ServiceCard, ServiceForm)
│   ├── staff/      # Staff CRUD components (StaffCard, StaffForm)
│   ├── ui/         # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   └── user/       # Customer dashboard
├── config/         # Navigation config with role-based filtering
├── hooks/          # Custom hooks — data fetching & business logic
├── layout/         # App shell — Sidebar, MobileSidebar, AppLayout
├── lib/            # Utilities — axios instance, cn() helper
├── pages/          # Route-level page components
│   ├── bookings/   # Booking flow (wizard, list, details)
│   └── public/     # Public marketplace pages
└── routes/         # Route guards (ProtectedRoutes, PublicRoutes)
```

## Authentication

The app uses **JWT-based authentication** with:

- **Access tokens** stored in-memory (React state) for API requests
- **Refresh tokens** handled via httpOnly cookies for silent session restore
- **Axios interceptors** that automatically attach tokens and handle transparent token refresh on 401 responses

## Backend API

The frontend expects a REST API with the following resource paths:

- `/api/auth/` — Authentication (login, register, refresh, logout)
- `/api/salons/` — Salon management
- `/api/salons/services/` — Service management
- `/api/salons/staff/` — Staff management
- `/api/bookings/` — Booking operations
- `/api/analytics/` — Booking/revenue analytics
- `/api/public/` — Public marketplace endpoints

See [`architecture.md`](./architecture.md) for a detailed architecture reference.
