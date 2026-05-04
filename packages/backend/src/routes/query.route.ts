import { FastifyInstance } from "fastify";
import { client } from "../db/clickhouse";
import { requireAuth } from "../plugin/auth.plugin";

export async function queryRoute(fastify: FastifyInstance) {
  fastify.addHook("preHandler", requireAuth);

  fastify.get("/v1/logs/trace/:trace_id", async (request, reply) => {
    const { trace_id } = request.params as { trace_id: string };
    const { userId } = request;
    try {
      const query = `SELECT * FROM logs Where trace_id = {trace_id:String} AND user_id = {user_id:String} ORDER BY timestamp ASC`;
      const result = await client.query({
        query,
        query_params: { trace_id, user_id: userId },
        format: "JSONEachRow",
      });
      const rows = await result.json();
      reply.send(rows);
    } catch (err) {
      console.error("Error executing query:", err);
      reply.status(500).send({ error: "Error executing query" });
    }
  });

  fastify.get("/v1/services", async (request, reply) => {
    const { userId } = request;
    try {
      const query = `SELECT DISTINCT service_name FROM logs WHERE user_id = {user_id:String}`;
      const result = await client.query({
        query,
        query_params: { user_id: userId },
        format: "JSONEachRow",
      });
      const rows = (await result.json()) as { service_name: string }[];
      const services = rows.map(
        (row: { service_name: string }) => row.service_name,
      );
      reply.send(services);
    } catch (err) {
      console.error("Error executing query:", err);
      reply.status(500).send({ error: "Error executing query" });
    }
  });

  fastify.get("/v1/logs", async (request, reply) => {
    const conditions: string[] = [];
    const params: Record<string, any> = {};
    const { userId } = request;
    conditions.push("user_id = {user_id:String}");
    params.user_id = userId;
    try {
      const { service_name, level, start_time, end_time, limit, cursor } =
        request.query as {
          service_name?: string;
          level?: string;
          start_time?: string;
          end_time?: string;
          limit?: string;
          cursor?: string;
        };

      if (service_name) {
        conditions.push("service_name = {service_name:String}");
        params.service_name = service_name;
      }

      if (level) {
        conditions.push("level = {level:String}");
        params.level = level;
      }

      if (start_time) {
        conditions.push("timestamp >= {start_time:Date}");
        params.start_time = new Date(start_time);
      }

      if (end_time) {
        conditions.push("timestamp <= {end_time:Date}");
        params.end_time = new Date(end_time);
      }

      params.limit = limit ? parseInt(limit) : 50;

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const query = `SELECT * FROM logs ${whereClause} ORDER BY (service_name, timestamp) LIMIT {limit:UInt32} `;

      const result = await client.query({
        query,
        query_params: params,
        format: "JSONEachRow",
      });
      const rows = await result.json();
      reply.send(rows);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}
