import { createClient } from "@clickhouse/client";

export const client = createClient({
  url: process.env.CLICKHOUSE_URL || "http://localhost:8123",
  username: process.env.CLICKHOUSE_USER || "admin",
  password: process.env.CLICKHOUSE_PASSWORD || "secret",
  database: process.env.CLICKHOUSE_DATABASE || "observekit",
});

export async function checkConnection() {
  const result = await client.ping();
  if (!result.success) {
    throw new Error(`ClickHouse connection failed: ${result.error}`);
  }
  console.log("Connected to ClickHouse ✅");
}
