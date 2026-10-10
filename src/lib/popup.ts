export type PopupSettings = {
  enabled: boolean;
  headline: string;
  message: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  expiresAt: string | null;
  revision: string;
};

export const defaultPopupSettings: PopupSettings = {
  enabled: false,
  headline: "",
  message: "",
  imageUrl: "",
  buttonText: "",
  buttonUrl: "",
  expiresAt: null,
  revision: "",
};

export function isActivePopup(settings: PopupSettings, now = Date.now()): boolean {
  return settings.enabled && Boolean(settings.headline && settings.message && settings.buttonText) &&
    (!settings.expiresAt || Date.parse(settings.expiresAt) > now);
}

function validUrl(value: string, allowRelative: boolean): boolean {
  if (!value || /[\\<>"'\x00-\x1f\x7f]/.test(value)) return false;
  if (allowRelative && value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") &&
      Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validatePopupSettings(input: Omit<PopupSettings, "revision">): Omit<PopupSettings, "revision"> {
  const fields = ["headline", "message", "imageUrl", "buttonText", "buttonUrl"] as const;
  for (const field of fields) {
    if (typeof input[field] !== "string") throw new Error(`Invalid ${field}.`);
  }
  if (typeof input.enabled !== "boolean") throw new Error("Invalid popup status.");
  const result = {
    enabled: input.enabled,
    headline: input.headline.trim(),
    message: input.message.trim(),
    imageUrl: input.imageUrl.trim(),
    buttonText: input.buttonText.trim(),
    buttonUrl: input.buttonUrl.trim(),
    expiresAt: input.expiresAt,
  };
  if (result.headline.length > 120 || result.message.length > 2000 ||
      result.buttonText.length > 80 || result.imageUrl.length > 2048 ||
      result.buttonUrl.length > 2048) {
    throw new Error("One or more popup fields are too long.");
  }
  if (result.enabled && (!result.headline || !result.message || !result.buttonText)) {
    throw new Error("Headline, message, and button text are required when the popup is on.");
  }
  if (result.imageUrl && !validUrl(result.imageUrl, false)) {
    throw new Error("Image URL must be a valid HTTP or HTTPS link.");
  }
  if (result.buttonUrl && !validUrl(result.buttonUrl, true)) {
    throw new Error("Button link must be a site path or HTTP/HTTPS link.");
  }
  if (result.expiresAt !== null &&
      (typeof result.expiresAt !== "string" ||
       !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(result.expiresAt) ||
       !Number.isFinite(Date.parse(result.expiresAt)) ||
       new Date(result.expiresAt).toISOString() !== result.expiresAt)) {
    throw new Error("End date/time must be a valid UTC timestamp.");
  }
  return result;
}
