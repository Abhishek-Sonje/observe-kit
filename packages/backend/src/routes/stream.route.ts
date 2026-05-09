import { FastifyInstance } from "fastify";
import { logEmitter } from "../events/logEvents";
import { requireAuthSSE } from "../plugin/auth.plugin";

export function streamRoute(fastify: FastifyInstance) {
  fastify.get(
    "/v1/logs/stream",
    { preHandler: requireAuthSSE },
    (request, reply) => {
      try {
        reply.raw.setHeader(
          "Access-Control-Allow-Origin",
          "http://localhost:3001",
        );
        reply.raw.setHeader("Access-Control-Allow-Credentials", "true");
        reply.raw.setHeader("Content-Type", "text/event-stream");
        reply.raw.setHeader("Cache-Control", "no-cache");
        reply.raw.setHeader("Connection", "keep-alive");
        reply.raw.flushHeaders();

        const onNewLogs = (logs: any[]) => {
          try {
            reply.raw.write(`data: ${JSON.stringify(logs)}\n\n`);
          } catch (err) {
            console.error("Error writing to SSE stream:", err);
          }
        };

        logEmitter.on("logs:new", onNewLogs);

        request.raw.on("close", () => {
          logEmitter.off("logs:new", onNewLogs);
        });

        request.raw.on("error", (err) => {
          console.error("SSE stream error:", err);
          logEmitter.off("logs:new", onNewLogs);
        });
      } catch (error) {
        console.error("Stream route error:", error);
        reply.status(500).send({ error: "Internal server error" });
      }
    },
  );
}
