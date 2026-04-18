import { Log } from "@observe-kit/common";

export async function getLogs(filters: string): Promise<Log[]> {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/v1/logs?" + filters,
    );
    return result.json();
  } catch (e) {
    console.error("Error fetching logs:", e);
    return [];
  }
}

export async function getLogsByTrace(traceId: string): Promise<Log[]> {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/v1/logs/trace/" + traceId,
    );
    return result.json();
  } catch (e) {
    console.error("Error fetching logs by trace:", e);
    return [];
  }
}

export async function getServices(): Promise<string[]> {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/v1/services",
    );
    return result.json();
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}
