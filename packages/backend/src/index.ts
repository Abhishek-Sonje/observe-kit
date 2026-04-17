import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { checkConnection } from "./db/clickhouse";
import { migrate } from "./db/migrate";
import { logRoute } from "./routes/log.route";
import "./queue/log.worker";
import dotenv from "dotenv";
import { queryRoute } from "./routes/query.route";

dotenv.config();

const app = fastify({
  logger: true,
});
const PORT = process.env.PORT || 3000;

app.register(fastifyCors, {
  origin: "*",
});

app.register(logRoute);
app.register(queryRoute);

app.get("/", async (req, res) => {
  res.send({ message: "Hello, ObserveKit!" });
});

const start = async () => {
  try {
    await checkConnection();
    await migrate();
    await app.listen({ port: Number(PORT) });
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
