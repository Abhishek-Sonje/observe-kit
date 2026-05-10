import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { generateApiKey } from "./apiKey.service";

test("generateApiKey returns expected key format and deterministic hash", () => {
  const { plainKey, keyHash } = generateApiKey();

  assert.ok(plainKey.startsWith("sk_live_"));
  assert.equal(plainKey.length, "sk_live_".length + 64);

  const expectedHash = crypto
    .createHash("sha256")
    .update(plainKey)
    .digest("hex");

  assert.equal(keyHash, expectedHash);
  assert.equal(keyHash.length, 64);
});
