import { db } from "@/lib/db";
import { popupSettings } from "@/lib/db/schema";
import { defaultPopupSettings, type PopupSettings } from "@/lib/popup";
import { eq } from "drizzle-orm";

export async function readPopupSettings(): Promise<PopupSettings> {
  const [row] = await db.select().from(popupSettings).where(eq(popupSettings.id, 1)).limit(1);
  return row ? {
    enabled: row.enabled,
    headline: row.headline,
    message: row.message,
    imageUrl: row.imageUrl,
    buttonText: row.buttonText,
    buttonUrl: row.buttonUrl,
    expiresAt: row.expiresAt,
    revision: row.revision,
  } : defaultPopupSettings;
}
