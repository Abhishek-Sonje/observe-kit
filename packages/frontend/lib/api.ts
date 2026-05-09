import { Log, ApiKey } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLogs(
  filters: string,
  fetchFn: typeof fetch = fetch,
): Promise<Log[]> {
  try {
    const res = await fetchFn(`${API_URL}/v1/logs?${filters}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching logs:", e);
    return [];
  }
}

export async function getLogsByTrace(
  traceId: string,
  fetchFn: typeof fetch = fetch,
): Promise<Log[]> {
  try {
    const res = await fetchFn(`${API_URL}/v1/logs/trace/${traceId}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching logs by trace:", e);
    return [];
  }
}

export async function getServices(
  fetchFn: typeof fetch = fetch,
): Promise<string[]> {
  try {
    const res = await fetchFn(`${API_URL}/v1/services`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}

export async function getApiKeys(
  fetchFn: typeof fetch = fetch,
): Promise<ApiKey[]> {
  try {
    const res = await fetchFn(`${API_URL}/v1/api-keys`);
    if (!res.ok) return [];
    const data = await res.json();
    // Brief specifies return type is { id, name, createdAt }[]
    return Array.isArray(data) ? data : data.apiKeys || [];
  } catch (e) {
    console.error("Error fetching api keys:", e);
    return [];
  }
}

export async function createApiKey(
  name: string,
  fetchFn: typeof fetch = fetch,
): Promise<{ apiKey: string } | null> {
  try {
    const res = await fetchFn(`${API_URL}/v1/api-keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Error creating api key:", e);
    return null;
  }
}

export async function revokeApiKey(
  id: string,
  fetchFn: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const res = await fetchFn(`${API_URL}/v1/api-keys/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (e) {
    console.error("Error revoking api key:", e);
    return false;
  }
}
