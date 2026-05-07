import { Worker } from "bullmq";
import { client } from "../db/clickhouse";
import { logEmitter } from "../events/logEvents";

export const LogWorker = new Worker(
  "logs",
  async (job) => {
    const logWithUserId = job.data.logs.map((log: any) => ({
      message: log.message,
      level: log.level,
      service_name: log.service_name,
      version: log.version,
      trace_id: log.trace_id || "",
      span_id: log.span_id || "",
      user_id: job.data.userId,
      timestamp: new Date().toISOString().slice(0, 23).replace("T", " "),
    }));
    try {
      const result = await client.insert({
        table: "logs",
        values: logWithUserId,
        format: "JSONEachRow",
      });

      console.log("Insert result:", result);
      console.log(`Inserted ${logWithUserId.length} logs`);
    } catch (err) {
      console.error("❌ Insert failed:", err);
    }

    logEmitter.emit("logs:new", logWithUserId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
    },
  },
);
