import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const auth = await getAuth(request);

  console.log("Is authenticated:", auth.isAuthenticated);
  console.log("Authenticated user ID:", auth.userId);
  console.log(auth);
 
  if (!auth.userId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  console.log("Useris Authroizeddddddddd")
  request.userId = auth.userId;
}
