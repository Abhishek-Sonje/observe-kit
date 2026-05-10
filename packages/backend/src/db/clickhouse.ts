import { createClient } from "@clickhouse/client";

export const client = createClient({
  url: process.env.CLICKHOUSE_URL || "http://localhost:8123",
  username: process.env.CLICKHOUSE_USER || "admin",
  password: process.env.CLICKHOUSE_PASSWORD || "secret",
  database: process.env.CLICKHOUSE_DATABASE || "observekit",
});

export async function checkConnection() {
  const maxAttempts = 10;
  const retryDelayMs = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await client.ping();
      if (result.success === true) {
        console.log("Connected to ClickHouse ✅");
        return;
      }
      throw new Error(
        `ClickHouse ping returned unsuccessful result`,
      );
    } catch (error) {
      if (attempt === maxAttempts) {
        throw new Error(
          `ClickHouse connection failed after ${maxAttempts} attempts: ${String(error)}`,
        );
      }

      console.warn(
        `ClickHouse not ready yet (attempt ${attempt}/${maxAttempts}), retrying...`,
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }
}
