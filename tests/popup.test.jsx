import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { popupSettings } from "../src/lib/db/schema";
import { defaultPopupSettings, isActivePopup, validatePopupSettings } from "../src/lib/popup";

const client = createClient({ url: "file::memory:" });
const db = drizzle(client);
let email = "mariah@example.com";
process.env.ADMIN_EMAILS = "mariah@example.com";

mock.module("@/lib/db", () => ({ db }));
mock.module("@/lib/auth", () => ({ auth: { api: { getSession: async () => email ? { user: { email } } : null } } }));
mock.module("next/headers", () => ({ headers: async () => new Headers() }));
mock.module("next/cache", () => ({ revalidatePath: () => {} }));

const { savePopupSettings } = await import("../src/lib/actions/popup");
const { readPopupSettings } = await import("../src/lib/popup-store");
const { GET } = await import("../src/app/api/popup/route");

const announcement = {
  enabled: true,
  headline: "Barn opening",
  message: "Join us soon",
  imageUrl: "https://example.com/horse.jpg",
  buttonText: "Learn more",
  buttonUrl: "/services",
  expiresAt: null,
};

async function saveValid(input) {
  const result = await savePopupSettings(input);
  expect(result.ok).toBe(true);
  return result.settings;
}

beforeAll(async () => {
  await client.execute(`CREATE TABLE popup_settings (
    id integer PRIMARY KEY, enabled integer NOT NULL DEFAULT 0,
    headline text NOT NULL DEFAULT '', message text NOT NULL DEFAULT '',
    image_url text NOT NULL DEFAULT '', button_text text NOT NULL DEFAULT '',
    button_url text NOT NULL DEFAULT '', expires_at text, revision text NOT NULL
  )`);
});
afterAll(async () => { await client.close(); });

describe("announcement settings", () => {
  test("missing row defaults off and API hides it", async () => {
    expect(await readPopupSettings()).toEqual(defaultPopupSettings);
    expect(await (await GET()).json()).toBeNull();
  });

  test("persists a revision and reads the saved values", async () => {
    const first = await saveValid(announcement);
    expect(first.revision).toBeTruthy();
    expect(await readPopupSettings()).toEqual(first);
    expect((await (await GET()).json()).headline).toBe("Barn opening");
  });

  test("toggle off, clear optional fields, and enable again", async () => {
    const off = await saveValid({ ...announcement, enabled: false, imageUrl: "", buttonUrl: "", expiresAt: null });
    expect(await (await GET()).json()).toBeNull();
    expect((await readPopupSettings()).imageUrl).toBe("");
    const on = await saveValid({ ...off, enabled: true });
    expect(on.revision).not.toBe(off.revision);
    expect(on.buttonUrl).toBe("");
    expect((await (await GET()).json()).enabled).toBe(true);
  });

  test("expiration is exclusive at the deadline and can be cleared", async () => {
    const deadline = "2030-01-01T00:00:00.000Z";
    const expiring = await saveValid({ ...announcement, expiresAt: deadline });
    expect(isActivePopup(expiring, Date.parse(deadline) - 1)).toBe(true);
    expect(isActivePopup(expiring, Date.parse(deadline))).toBe(false);
    await saveValid({ ...announcement, expiresAt: "2000-01-01T00:00:00.000Z" });
    expect(await (await GET()).json()).toBeNull();
    await saveValid({ ...announcement, expiresAt: null });
    expect((await (await GET()).json()).expiresAt).toBeNull();
  });

  test("rejects unsafe links and executable markup before persistence", async () => {
    for (const bad of ["javascript:alert(1)", "data:text/html,<script>", "//evil.example", "/\\evil", "<script>"]) {
      expect(() => validatePopupSettings({ ...announcement, buttonUrl: bad })).toThrow();
    }
    expect(() => validatePopupSettings({ ...announcement, imageUrl: "data:image/svg+xml,<svg onload=alert(1)>" })).toThrow();
    expect(() => validatePopupSettings({ ...announcement, expiresAt: "2026-02-30T00:00:00.000Z" })).toThrow();
    expect(() => validatePopupSettings({ ...announcement, headline: "" })).toThrow();
    const before = await readPopupSettings();
    expect(await savePopupSettings({ ...announcement, buttonUrl: "javascript:alert(1)" })).toEqual({
      ok: false,
      error: "Button link must be a site path or HTTP/HTTPS link.",
    });
    expect(await savePopupSettings({ ...announcement, headline: "" })).toEqual({
      ok: false,
      error: "Headline, message, and button text are required when the popup is on.",
    });
    expect(await readPopupSettings()).toEqual(before);
  });

  test("rejects writes by a signed-in non-admin and without a session", async () => {
    for (const identity of ["other@example.com", null]) {
      email = identity;
      await expect(savePopupSettings(announcement)).rejects.toThrow("Unauthorized");
    }
    email = "mariah@example.com";
  });
});
