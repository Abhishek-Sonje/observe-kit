import { Log } from "@observe-kit/common";

export async function getLogs(
  filters: string,
  fetchFn: typeof fetch = fetch,
): Promise<Log[]> {
  try {
    const result = await fetchFn(
      process.env.NEXT_PUBLIC_API_URL + "/v1/logs?" + filters,
    );
    return result.json();
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
    const result = await fetchFn(
      process.env.NEXT_PUBLIC_API_URL + "/v1/logs/trace/" + traceId,
    );
    return result.json();
  } catch (e) {
    console.error("Error fetching logs by trace:", e);
    return [];
  }
}

export async function getServices(
  fetchFn: typeof fetch = fetch,
): Promise<string[]> {
  try {
    const res = await fetchFn(process.env.NEXT_PUBLIC_API_URL + "/v1/services");

    if (!res.ok) {
      console.error("API Error:", await res.text());
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid response format:", data);
      return [];
    }

    return data;
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}

export async function getApiKeys(fetchFn: typeof fetch = fetch) {
  try {
    const res = await fetchFn(process.env.NEXT_PUBLIC_API_URL + "/v1/api-keys");
    if (!res.ok) {
      throw new Error(`API Error: ${await res.text()}`);
    }
    const data = await res.json();
    return data.apiKeys || [];
  } catch (e) {
    console.error("Error fetching api keys:", e);
    return [];
  }
}

export async function createApiKey(
  name: string,
  fetchFn: typeof fetch = fetch,
) {
  try {
    const res = await fetchFn(
      process.env.NEXT_PUBLIC_API_URL + "/v1/api-keys",
      {
        method: "POST",
        body: JSON.stringify({ name }),
      },
    );

    if (!res.ok) {
      throw new Error(`API Error: ${await res.text()}`);
    }

    const data = await res.json();
    return data.apiKey;
  } catch (e) {
    console.error("Error creating api key:", e);
    return null;
  }
}

export async function revokeApiKey(id: string, fetchFn: typeof fetch = fetch) {
  try {
    const res = await fetchFn(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/api-keys/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      throw new Error(`API Error: ${await res.text()}`);
    }
  } catch (e) {
    console.error("Error revoking api key:", e);
  }
}
