# Admin Panel Setup Guide

The admin panel lives at `/admin` and lets you edit all site content (copy, pricing, contact info) through a tabbed CMS interface. It is protected by email/password authentication via Better Auth.

---

## Prerequisites

- [Bun](https://bun.sh) runtime installed
- A [Turso](https://turso.tech) account (free tier is sufficient)
- Project cloned locally

---

## Step 1 — Environment Variables

Create `.env.local` in the project root:

```env
# Turso / LibSQL
DATABASE_URL=libsql://your-db-name.turso.io
DATABASE_AUTH_TOKEN=your-turso-auth-token

# Better Auth
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

**Getting each value:**

| Variable | How to get it |
|----------|--------------|
| `DATABASE_URL` | Turso dashboard → your database → "Connect" → copy the `libsql://...` URL |
| `DATABASE_AUTH_TOKEN` | Turso dashboard → your database → "Generate token" |
| `BETTER_AUTH_SECRET` | Run `openssl rand -base64 32` in your terminal |
| `BETTER_AUTH_URL` | `http://localhost:3000` for local dev; your live domain for production |

---

## Step 2 — Install Dependencies

```bash
bun install
```

---

## Step 3 — Run Database Migrations

Creates all required tables (`user`, `session`, `account`, `verification`, `site_content`):

```bash
bun run db:migrate
```

Verify with Drizzle Studio if you want to inspect the tables:

```bash
bun run db:studio
```

---

## Step 4 — Seed Site Content

Populates the `site_content` table with all default website copy and pricing packages:

```bash
bun run db:seed
```

This is safe to re-run — it uses upsert logic and won't overwrite edits you've made through the admin panel.

---

## Step 5 — Create an Admin User

```bash
bun run db:admin
```

You'll be prompted for:
- **Email** — the login email
- **Password** — must be 8+ characters (input is hidden)
- **Name** — display name, defaults to "Admin"

This only needs to be run once. The admin panel has no self-serve sign-up.

---

## Step 6 — Start the Dev Server

```bash
bun run dev
```

---

## Step 7 — Sign In

1. Open `http://localhost:3000/admin/login`
2. Enter the email and password from Step 5
3. You'll be redirected to the CMS editor at `/admin`

---

## Using the Admin Panel

The editor has four tabs:

| Tab | What you can edit |
|-----|-------------------|
| **Home** | Hero tagline, welcome section, mission statement, core values, CTA |
| **About** | Company history, dedication section, brand/color explanation |
| **Services** | Tier descriptions (Just Green, Gallant, Trail Blazer) and pricing packages |
| **Contact** | Business hours (summer/winter), address, phone, email |

Click **Save changes** to persist edits. Changes are reflected on the live site immediately.

---

## Production Deployment

Update `.env.local` (or your hosting provider's environment settings):

```env
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
```

Then build and start:

```bash
bun run build
bun run start
```

---

## Troubleshooting

**"Invalid credentials" on login**
- Double-check email and password (case-sensitive)
- Confirm the `user` and `account` tables have rows via `bun run db:studio`

**Redirect loop at `/admin`**
- Check that `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are set correctly in `.env.local`
- Clear browser cookies and try again

**Database connection error**
- Verify `DATABASE_URL` is the `libsql://` URL (not the HTTP URL)
- Confirm `DATABASE_AUTH_TOKEN` is a valid, non-expired token from Turso
