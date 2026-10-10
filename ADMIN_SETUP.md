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
ADMIN_EMAILS=mariah@example.com
```

**Getting each value:**

| Variable | How to get it |
|----------|--------------|
| `DATABASE_URL` | Turso dashboard → your database → "Connect" → copy the `libsql://...` URL |
| `DATABASE_AUTH_TOKEN` | Turso dashboard → your database → "Generate token" |
| `BETTER_AUTH_SECRET` | Run `openssl rand -base64 32` in your terminal |
| `BETTER_AUTH_URL` | `http://localhost:3000` for local dev; your live domain for production |
| `ADMIN_EMAILS` | Comma-separated email addresses allowed to use the CMS. Set Mariah's exact existing account email before release. Missing or empty means no admin access. |

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

**Do not run this against production.** The current seed upserts content values and can overwrite edits made through the admin panel. Use an isolated database for local test data.

---

## Step 5 — Create an Admin User

```bash
bun run db:admin
```

You'll be prompted for:
- **Email** — the login email
- **Password** — must be 8+ characters (input is hidden)
- **Name** — display name, defaults to "Admin"

This only needs to be run once. The email must already be in `ADMIN_EMAILS`. Public email signup is disabled; the CLI is the only signup path.

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

The editor has five tabs:

| Tab | What you can edit |
|-----|-------------------|
| **Home** | Hero tagline, welcome section, mission statement, core values, CTA |
| **About** | Company history, dedication section, brand/color explanation |
| **Services** | Tier descriptions (Just Green, Gallant, Trail Blazer) and pricing packages |
| **Contact** | Business hours (summer/winter), address, phone, email |
| **Popup** | Announcement visibility, copy, optional image, button and end time |

The Popup tab starts off when no settings have been saved. Its image is a public HTTP/HTTPS URL; no uploader is required. An empty button link closes the dialog. The end time is entered in the browser's displayed timezone and stored as UTC. Clear the field to remove the deadline. Saving a new version resets visitors' dismissal for that version. Dismissal lasts for the current browser tab session. If session storage is unavailable, it lasts while the site remains mounted in that tab; a full reload can show the popup again.

Click **Save changes** to persist edits. Changes are reflected on the live site immediately.

---

## Production Deployment

Update `.env.local` (or your hosting provider's environment settings):

```env
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
ADMIN_EMAILS=mariah@example.com
```

Then build and start:

```bash
bun run build
bun run start
```

Apply the generated `drizzle/0001_remarkable_sleeper.sql` migration to the production Turso database **only after approval** and before deploying this branch. It creates the independent `popup_settings` table and inserts no announcement or customer content. Verify `ADMIN_EMAILS` contains the existing authorized admin account before deployment. No production data migration or seed is needed.

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
