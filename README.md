# Bias Retail App

Bias Retail App is a Next.js 16 marketing site with a lightweight admin console for managing brand data and editable site content.

## Stack

- Next.js 16 App Router
- React 19
- Prisma with PostgreSQL
- Tailwind CSS 4
- Framer Motion

## Features

- Public pages for home, brands, events, careers, and contact
- Admin login flow backed by signed cookies
- Protected admin screens for brand management and site-content editing
- Seed endpoint for bootstrapping brand and CMS content data

## Requirements

- Node.js 20, 22, or 24
- npm 10+
- PostgreSQL database reachable through `DATABASE_URL`

Node 25 currently produces Prisma engine warnings during install, so a current LTS release is the safer default.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values.

The Next.js runtime, Prisma config, and local seed script all load `.env.local`, so one file is enough for local development.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Primary Prisma connection string |
| `DIRECT_URL` | Optional direct connection string for database operations |
| `ADMIN_USERNAME` | Username for the admin login |
| `ADMIN_PASSWORD` | Password for the admin login |
| `SEED_SECRET` | Optional shared secret for the seed endpoint |

## Local Development

```bash
npm ci
npm run dev
```

The app runs at `http://localhost:3000`.

## Database Setup

Generate the Prisma client:

```bash
npm run prisma:generate
```

Push the schema to your database:

```bash
npm run prisma:push
```

Seed the database from the local script:

```bash
npm run db:seed
```

This seeds both the brand catalog and the editable site-content payload used by `/admin/content`.

You can also seed through the HTTP route at `POST /api/seed`.

- In development, the route is open by default unless `SEED_SECRET` is set.
- In production, `SEED_SECRET` is required and must be sent in the `x-seed-secret` header.

## Admin Access

Open `/admin/login` and sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

In non-production environments, the protected admin area can be accessed without credentials when admin credentials are not configured. That fallback should not be relied on for deployed environments.

## Validation

```bash
npm run lint
npm run build
```

## Cloudflare Workers

This repo is prepared for Cloudflare Workers using the OpenNext adapter.

Install dependencies and build for Cloudflare locally:

```bash
npm run cf:build
```

Preview the Worker locally after creating a `.dev.vars` file or setting equivalent local Worker secrets:

```bash
npm run cf:preview
```

Required Cloudflare runtime/build variables mirror the app envs:

- `DATABASE_URL`
- `DIRECT_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SEED_SECRET`

For Cloudflare Workers Builds or dashboard-based Git deployments, set those values in both build variables and Worker secrets so the Next build and runtime see the same configuration.

To deploy from a machine authenticated with Cloudflare:

```bash
npm run cf:deploy
```

## Deployment Notes

- Ensure `DATABASE_URL` is available at build and runtime.
- Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SEED_SECRET` in the deployment environment.
- The app is compatible with Vercel deployment via the included `vercel.json`.