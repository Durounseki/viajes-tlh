# Viajeras por Siempre

This is the repository for the **Viajeras por Siempre** website, a full-stack travel agency specializing in creating group experiences for women.

The project is built on a modern serverless stack, using Cloudflare Workers for the backend and React (with Vite) for the frontend.

**[View Live Demo](https://viajerasporsiempre.com)**

![Screenshot of the Viajeras por Siempre homepage](./screenshot.png)

---

## Features

### Public-Facing Site

- **Trip Explorer:** View upcoming and past trips.
- **Progressive Images:** "Blur-up" loading and `srcset` for mobile efficiency.
- **Testimonials:** Read and submit travel reviews.
- **Admin Authentication:** Secure login page.
- **Password Recovery:** Full "Forgot Password" flow with email (via Resend).

### Admin Panel

- **Secure Dashboard:** Protected by JWT authentication.
- **Trip Management (CRUD):** Create, read, update, and delete trips.
- **Review Management:** Approve, unpublish, and delete user-submitted reviews.
- **Booking Management:** View user bookings.
- **Account Settings:** Change the admin password.

---

## Tech Stack

### Backend (Cloudflare)

- **Hono:** A small, fast web framework for Cloudflare Workers.
- **Cloudflare D1:** SQL database (used with Prisma).
- **Cloudflare R2:** Object storage for trip images.
- **Cloudflare Image Resizing:** To create different image sizes (`placeholder`, `small`, `medium`, `large`) on the fly.
- **Cloudflare KV:** For storing password reset tokens.
- **Prisma:** ORM for interacting with the D1 database.
- **Resend:** For sending transactional emails (e.g., password resets).
- **JWT:** For handling secure admin sessions.

### Frontend (React)

- **Vite:** Build tool and development server.
- **React:** For building the user interface.
- **TanStack Router:** Modern file-based routing.
- **TanStack Query (React Query):** For server state management, caching, and mutations.
- **CSS Modules:** For encapsulated component styles.

---
