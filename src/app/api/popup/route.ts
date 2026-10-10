import { readPopupSettings } from "@/lib/popup-store";
import { isActivePopup } from "@/lib/popup";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await readPopupSettings();
    return Response.json(isActivePopup(settings) ? settings : null, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
