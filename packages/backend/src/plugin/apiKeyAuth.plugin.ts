import { FastifyReply, FastifyRequest } from "fastify";
import { verifyApiKey } from "../services/apiKey.service";

export async function requireApiKey(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Missing API key" });
  }

  const key = authHeader.split(" ")[1];
  const apiKey = await verifyApiKey(key);

  if (!apiKey) {
    return reply.status(401).send({ error: "Invalid or revoked API key" });
  }

  request.userId = apiKey.userId;
}
