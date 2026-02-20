"use server";

import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getContent(key: string): Promise<string> {
  const result = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.key, key))
    .limit(1);
  return result[0]?.value ?? "";
}

export async function getAllContent(): Promise<Record<string, string>> {
  const results = await db.select().from(siteContent);
  return Object.fromEntries(results.map((r) => [r.key, r.value]));
}

export async function updateContent(key: string, value: string): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  await db
    .insert(siteContent)
    .values({ key, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteContent.key,
      set: { value, updatedAt: new Date() },
    });
}

export async function updateManyContent(
  entries: Record<string, string>
): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  for (const [key, value] of Object.entries(entries)) {
    await db
      .insert(siteContent)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value, updatedAt: new Date() },
      });
  }
}
