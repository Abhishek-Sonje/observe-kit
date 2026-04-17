import { Queue } from "bullmq";

export const logQueue = new Queue("logs", {
    connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    }
})