import { Queue } from "bullmq";

const redisPort = Number(process.env.REDIS_PORT || 6379);

export const logQueue = new Queue("logs", {
  connection: {
    host: process.env.REDIS_HOST,
    port: redisPort,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  },
});
