import { client } from "./clickhouse";

export async function migrate() {
  try {
    await client.command({
      query: `CREATE TABLE IF NOT EXISTS logs (
        id UUID DEFAULT generateUUIDv4(),
        user_id String,
        message String,
        timestamp DateTime64(3),
        level LowCardinality(String),
        service_name LowCardinality(String),
        trace_id String,
    span_id String,
    version String
    )
ENGINE = MergeTree()
ORDER BY (service_name, timestamp)
TTL toDateTime(timestamp) + INTERVAL 30 DAY
SETTINGS index_granularity = 8192`,
    });
    console.log("Migration completed ✅");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}
