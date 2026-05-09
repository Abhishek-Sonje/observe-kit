import { getAuth, verifyToken } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const auth = await getAuth(request);

  if (!auth.userId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  request.userId = auth.userId;
}

// For SSE connections that can't send Authorization headers
export async function requireAuthSSE(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = (request.query as { token?: string })?.token;

    if (!token) {
      return reply
        .status(401)
        .send({ error: "Unauthorized: No token provided" });
    }

    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ["http://localhost:3001"],
    });

    if (!verifiedToken.sub) {
      return reply.status(401).send({ error: "Unauthorized: Invalid token" });
    }

    request.userId = verifiedToken.sub;
  } catch (error) {
    console.error("SSE Auth Error:", error);
    return reply
      .status(401)
      .send({ error: "Unauthorized: Token verification failed" });
  }
}
