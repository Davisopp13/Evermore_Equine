"use server";

import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-access";
import { db } from "@/lib/db";
import { popupSettings } from "@/lib/db/schema";
import { readPopupSettings } from "@/lib/popup-store";
import { validatePopupSettings, type PopupSettings } from "@/lib/popup";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getPopupSettingsForAdmin(): Promise<PopupSettings> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!isAdminEmail(session?.user.email)) throw new Error("Unauthorized");
  return readPopupSettings();
}

export async function savePopupSettings(
  input: Omit<PopupSettings, "revision">
): Promise<{ ok: true; settings: PopupSettings } | { ok: false; error: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!isAdminEmail(session?.user.email)) throw new Error("Unauthorized");
  let settings: Omit<PopupSettings, "revision">;
  try {
    settings = validatePopupSettings(input);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Invalid popup settings." };
  }
  const revision = crypto.randomUUID();
  await db.insert(popupSettings).values({ id: 1, ...settings, revision }).onConflictDoUpdate({
    target: popupSettings.id,
    set: { ...settings, revision },
  });
  revalidatePath("/", "layout");
  return { ok: true, settings: { ...settings, revision } };
}
