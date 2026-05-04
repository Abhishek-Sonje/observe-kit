import { FastifyInstance } from "fastify";
import { LogBatchSchema } from "../validators/log.validator";
import { logQueue } from "../queue/log.queue";
import { requireAuth } from "../plugin/auth.plugin";
import { requireApiKey } from "../plugin/apiKeyAuth.plugin";

export async function logRoute(fastify: FastifyInstance) {
  fastify.post(
    "/v1/logs",
    { preHandler: requireApiKey },
    async (request, reply) => {
      const data = LogBatchSchema.safeParse(request.body);
      if (!data.success) {
        return reply
          .status(400)
          .send({ error: "Invalid log data", details: data.error.errors });
      }
      await logQueue.add("ingest", { logs: data.data, userId: request.userId });
      return reply.status(202).send({ message: "Logs accepted" });
    },
  );
}
