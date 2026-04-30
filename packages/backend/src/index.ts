import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { checkConnection } from "./db/clickhouse";
import { migrate } from "./db/migrate";
import { logRoute } from "./routes/log.route";
import "./queue/log.worker";
import dotenv from "dotenv";
import { queryRoute } from "./routes/query.route";
import { streamRoute } from "./routes/stream.route";

dotenv.config();

const app = fastify({
  logger: true,
});
const PORT = process.env.PORT || 3000;

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
});

app.register(logRoute);
app.register(queryRoute);
app.register(streamRoute);

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
