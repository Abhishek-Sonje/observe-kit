import { FastifyInstance } from "fastify";
import { logEmitter } from "../events/logEvents";
import { requireAuth } from "../plugin/auth.plugin";

export function streamRoute(fastify: FastifyInstance) {
  fastify.get("/v1/logs/stream",{preHandler: requireAuth}, (request, reply) => {
    reply.raw.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    reply.raw.setHeader("Access-Control-Allow-Credentials", "true");
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.flushHeaders();

    const onNewLogs = (Logs: any[]) => {
      reply.raw.write(`data: ${JSON.stringify(Logs)}\n\n`);
    };

    logEmitter.on("logs:new", onNewLogs);

    request.raw.on("close", () => {
      logEmitter.off("logs:new", onNewLogs);
    });

  });
}
