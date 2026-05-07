import { Queue } from "bullmq";

export const logQueue = new Queue("logs", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  },
});