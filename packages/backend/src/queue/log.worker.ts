import { Worker } from "bullmq";
import { client } from "../db/clickhouse";
import { logEmitter } from "../events/logEvents";

export const LogWorker = new Worker(
  "logs",
  async (job) => {
    try {
      await client.insert({
        table: "logs",
        values: job.data.logs,
        format: "JSONEachRow",
      });
    } catch (err) {
      console.error("Error inserting logs into ClickHouse:", err);
      throw err;
    }
    console.log(
      `Successfully inserted ${job.data.logs.length} logs into ClickHouse`,
    );
    logEmitter.emit("logs:new", job.data.logs);
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  },
);
