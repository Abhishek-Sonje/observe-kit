import { FastifyInstance } from "fastify";
import { LogBatchSchema } from "../validators/log.validator";
import { logQueue } from "../queue/log.queue";

export async function logRoute(fastify: FastifyInstance) {
  fastify.post("/v1/logs", async (request, reply) => {
    const data = LogBatchSchema.safeParse(request.body);
    if (!data.success) {
      return reply
        .status(400)
        .send({ error: "Invalid log data", details: data.error.errors });
    }
    await logQueue.add("ingest", { logs: data.data });
    return reply.status(202).send({ message: "Logs accepted" });
  });
}
