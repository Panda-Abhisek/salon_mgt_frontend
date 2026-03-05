## Salon Management Frontend — App Overview

This document explains **what the app does**, **who it is for**, and **how the major flows fit together**. It is meant for product stakeholders, new engineers, and anyone trying to quickly understand the product, not the low-level implementation details.

---

## Core Personas & Goals

- **Salon Admin**
  - Set up a salon profile (location, hours, services, pricing).
  - Manage staff, assign which services they can perform, and control availability.
  - Track bookings, revenue, and operational performance.
  - Manage subscription and billing.
- **Staff Member**
  - See today’s schedule and upcoming appointments.
  - Mark bookings as completed / no-show.
  - Quickly access booking details before a customer arrives.
- **Customer (End User)**
  - Discover salons in the marketplace.
  - Browse services and prices.
  - Book appointments via a guided, multi‑step flow.
  - Review upcoming and past bookings.
- **Super Admin**
  - Monitor subscription health across all salons.
  - Review audit logs for compliance and debugging.

---

## High-Level User Journeys

### 1. Onboarding a Salon Admin

1. **Signup / Login**
   - Admin signs up via `/signup` or logs in via `/login`.
   - After authentication, the app redirects to `/home` with an admin‑specific dashboard.
2. **Salon Setup**
   - Navigate to `/salon` to fill in salon profile details.
   - Configure opening hours, address, and high‑level settings.
3. **Service & Staff Configuration**
   - `/services`: create and manage services (name, duration, price, active/inactive).
   - `/staff`: add staff, assign which services each can perform, and set their active status.
4. **Go Live**
   - Once services and staff are configured, the salon is visible in the public marketplace (`/salons`), and customers can start booking.

### 2. Customer Booking Flow

1. **Discover a Salon**
   - Visit `/salons` to browse all salons.
   - Click into `/salons/:salonId` to see details and available services.
2. **Start Booking**
   - From the salon detail page, follow the “Book” CTA → `/salons/:salonId/book` or go via `/bookings/new` (for admins creating bookings).
3. **Multi‑Step Wizard**
   - **Step 1 — Select Service**: choose a service from the salon’s catalog.
   - **Step 2 — Select Staff & Date**: choose a staff member (optional, depending on configuration) and a date.
   - **Step 3 — Select Time Slot**: pick an available time slot generated from salon + staff availability.
   - **Confirm**: review summary and confirm booking.
4. **Post‑Booking**
   - Customers can see upcoming and past bookings via `/bookings` and `/home` depending on role.

### 3. Day-to-Day Operations for Staff & Admins

- **Home Dashboard (`/home`)**
  - Admins see booking and revenue trends, leaderboards, and high‑level KPIs.
  - Staff see today’s schedule and next‑up booking.
- **Bookings Module (`/bookings`)**
  - Filter and search bookings.
  - Open `/bookings/:bookingId` for details.
  - Update booking status (completed, no‑show, etc.).

---

## Navigation & Roles (How the App Adapts)

- **Public Area**
  - `/` — marketing/landing page.
  - `/login`, `/signup` — authentication.
  - `/salons`, `/salons/:salonId` — marketplace and public salon profiles.
- **Authenticated Shell**
  - All authenticated routes live under a common layout (`AppLayout`) with:
    - Desktop sidebar.
    - Mobile drawer navigation.
    - Global lifecycle banner (subscription status).
    - Page header and animated transitions.
- **Role-Based Navigation**
  - `config/navigation.js` defines sidebar items with `roles` and optional `excludeRoles`.
  - The sidebar only shows entries the current user is allowed to access, e.g.:
    - Salon admins: `Home`, `Salon`, `Services`, `Staff`, `Bookings`, `Billing`.
    - Staff: `Home`, `Bookings`.
    - Customers: `Home`, `My Bookings`, `Browse Salons`.
    - Super admins: `Super Admin`, `Audit Logs`.

---

## Subscriptions & Billing (Product View)

- **Subscription States**
  - Trialing, active, expiring soon, past due, or cancelled.
  - Surfaced in the UI via a **Lifecycle Banner** at the top of the app.
- **Upgrade Experience**
  - When a user hits a feature that is **behind a paywall**, the feature fires a `paywall` event.
  - A global **Upgrade Modal** opens, explaining the limitation and offering an upgrade path.
  - Upgrade actions route the user to billing/checkout pages (`/billing`, `/fake-success` in development).
- **Super Admin Monitoring**
  - Super admins can see global subscription metrics under `/superadmin`:
    - Active subscriptions, expiring soon, churn, plan distribution, trial conversions, etc.

---

## Auditing & Compliance

- **What Gets Logged**
  - Key admin and user actions (e.g., subscription changes, access changes, critical booking operations) are recorded by the backend and exposed as **audit logs**.
- **Where It’s Viewed**
  - Super admins access `/superadmin/audits` to:
    - Filter by salon.
    - Filter by action type.
    - Filter by date range.
- **Why It Matters**
  - Helps with **debugging**, **security reviews**, and **compliance** (e.g., who changed what and when).

---

## How to Read the Codebase Alongside This Doc

- For a deeper technical view of:
  - **Architecture & layering** → see `architecture.md`.
  - **API calls & data flow** → check `src/api/*` and `src/hooks/*`.
  - **Routing & guards** → check `src/App.jsx` and `src/routes/*`.
  - **Layouts & navigation** → check `src/layout/AppLayout.jsx` and `src/config/navigation.js`.
- This file (`app-overview.md`) should stay **product‑oriented**. When you add major features or flows, update:
  - Personas affected.
  - User journeys.
  - Routes/sections involved.

