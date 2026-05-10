import crypto from "crypto";
import { db } from "../db/postgres";
import { apiKeys } from "../db/schema";
import { and, eq } from "drizzle-orm";

export function generateApiKey() {
  const rawKey = crypto.randomBytes(32).toString("hex");
  const plainKey = `sk_live_${rawKey}`;
  const keyHash = crypto.createHash("sha256").update(plainKey).digest("hex");
  return { plainKey, keyHash };
}

export async function createApiKey(userId: string, name: string) {
  const { plainKey, keyHash } = generateApiKey();
  await db.insert(apiKeys).values({
    userId,
    name,
    keyHash,
  });
  return plainKey;
}

export async function verifyApiKey(plainKey: string) {
  const keyHash = crypto.createHash("sha256").update(plainKey).digest("hex");
  const result = await db
    .select()
    .from(apiKeys)
    .where(and(eq(apiKeys.keyHash, keyHash), eq(apiKeys.revoked, false)))
    .limit(1);

  return result[0] ?? null;
}
