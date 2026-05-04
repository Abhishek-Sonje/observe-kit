import { Worker } from "bullmq";
import { client } from "../db/clickhouse";
import { logEmitter } from "../events/logEvents";

export const LogWorker = new Worker(
  "logs",
  async (job) => {
    const logWithUserId = job.data.logs.map((log: any) => ({
      ...log,
      userId: job.data.userId,
    }));
    try {
      await client.insert({
        table: "logs",
        values: logWithUserId,
        format: "JSONEachRow",
      });
    } catch (err) {
      console.error("Error inserting logs into ClickHouse:", err);
      throw err;
    }
    console.log(
      `Successfully inserted ${job.data.logs.length} logs into ClickHouse`,
    );
    logEmitter.emit("logs:new", logWithUserId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  },
);
