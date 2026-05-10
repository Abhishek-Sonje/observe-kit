import test from "node:test";
import assert from "node:assert/strict";
import { createApiKey, getApiKeys, getLogs, revokeApiKey } from "./api";

type MockFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

test("getLogs returns parsed logs on successful response", async () => {
  const logs = [{ message: "ok", timestamp: Date.now() }];

  const fetchMock: MockFetch = async () =>
    new Response(JSON.stringify(logs), { status: 200 });

  const result = await getLogs("level=info", fetchMock as typeof fetch);

  assert.deepEqual(result, logs);
});

test("getApiKeys accepts wrapped apiKeys response", async () => {
  const apiKeys = [{ id: "1", name: "default", createdAt: Date.now() }];

  const fetchMock: MockFetch = async () =>
    new Response(JSON.stringify({ apiKeys }), { status: 200 });

  const result = await getApiKeys(fetchMock as typeof fetch);

  assert.deepEqual(result, apiKeys);
});

test("createApiKey posts JSON and returns server payload", async () => {
  let capturedMethod = "";
  let capturedBody = "";

  const fetchMock: MockFetch = async (_input, init) => {
    capturedMethod = init?.method || "";
    capturedBody = String(init?.body || "");
    return new Response(JSON.stringify({ apiKey: "sk_live_example" }), {
      status: 201,
    });
  };

  const result = await createApiKey("my-key", fetchMock as typeof fetch);

  assert.equal(capturedMethod, "POST");
  assert.equal(capturedBody, JSON.stringify({ name: "my-key" }));
  assert.deepEqual(result, { apiKey: "sk_live_example" });
});

test("revokeApiKey returns false when fetch throws", async () => {
  const fetchMock: MockFetch = async () => {
    throw new Error("network error");
  };

  const result = await revokeApiKey("abc", fetchMock as typeof fetch);

  assert.equal(result, false);
});
