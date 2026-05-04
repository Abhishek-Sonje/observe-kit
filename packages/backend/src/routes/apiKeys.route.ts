import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "../plugin/auth.plugin";
import { getAuth } from "@clerk/fastify";
import { createApiKey } from "../services/apiKey.service.ts";
import { db } from "../db/postgres";
import { apiKeys } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function apiKeysRoute(fastify: FastifyInstance) {
  fastify.addHook("preHandler", requireAuth);

  fastify.post(
    "/v1/api-keys",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name } = request.body as { name: string };
    
      if (!name) {
        return reply.status(400).send({ error: "Name is required" });
      }
      if (!request.userId) {
        return reply.status(401).send({ error: "Unauthorized -- userID required" });
      }
      const apiKey = await createApiKey(request.userId, name);
      return reply.status(201).send({ apiKey });
    },
  );

  fastify.get("/v1/api-keys", async (request, reply) => {
    const userId = request.userId;
    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const allApiKeys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.name,
        createdAt: apiKeys.createdAt,
        expiresAt: apiKeys.expiresAt,
      })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    return reply.status(200).send({ apiKeys: allApiKeys });
  });

  fastify.delete("/v1/api-keys/:id", async (request, reply) => {
    const userId = request.userId;
    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const { id } = request.params as { id: string };
    await db
      .update(apiKeys)
      .set({ revoked: true })
      .where(and(eq(apiKeys.id, id), eq(apiKeys.userId, userId)));
    return reply.status(200).send({ message: "API key deleted" });
  });
}
