import { client } from "../db/clickhouse";
import crypto from "crypto";

const services = [
  "auth-service",
  "payment-service",
  "email-service",
  "api-gateway",
];

const levels = ["info", "info", "info", "warn", "error"]; // weighted

const USER_ID = "user_3D7IGEWGqINDSl0b1fxOFGVW8D2";

// 🧠 random timestamp (last 24h)
function randomTimestamp() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  return new Date(now - Math.random() * oneDay)
    .toISOString()
    .slice(0, 23)
    .replace("T", " "); // ✅ ClickHouse format
}

// helper
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedLogs() {
  const TOTAL_LOGS = 200;

  // 🔥 25 shared trace IDs
  const traceIds = Array.from({ length: 25 }, () =>
    crypto.randomBytes(8).toString("hex"),
  );

  const messages = [
    "User login successful",
    "Invalid password attempt",
    "Payment processed",
    "Payment failed",
    "Email sent",
    "Email queue delay",
    "Service timeout",
    "Cache miss",
    "Database query executed",
    "Unauthorized request",
  ];

  const logs = [];

  for (let i = 0; i < TOTAL_LOGS; i++) {
    const traceId = pick(traceIds);

    logs.push({
      message: pick(messages),
      level: pick(levels),
      service_name: pick(services),
      version: "1.0.0",
      trace_id: traceId,
      span_id: crypto.randomBytes(6).toString("hex"),
      user_id: USER_ID,
      timestamp: randomTimestamp(),
    });
  }

  // 🚀 bulk insert
  await client.insert({
    table: "logs",
    values: logs,
    format: "JSONEachRow",
  });

  console.log(`✅ Inserted ${logs.length} fake logs`);
}


seedLogs()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });