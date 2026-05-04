import dotenv from "dotenv";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { checkConnection } from "./db/clickhouse";
import { migrate } from "./db/migrate";
import { logRoute } from "./routes/log.route";
import "./queue/log.worker";
import { queryRoute } from "./routes/query.route";
import { streamRoute } from "./routes/stream.route";
import { startSloMonitor } from "./services/sloMonitor";
import { clerkPlugin } from "@clerk/fastify";
import { apiKeysRoute } from "./routes/apiKeys.route";

dotenv.config();

const app = fastify({
  logger: true,
});
const PORT = process.env.PORT || 3000;

app.register(clerkPlugin, {
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.register(fastifyCors, {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  credentials: true,
});

app.register(logRoute);
app.register(queryRoute);
app.register(streamRoute);
app.register(apiKeysRoute);

app.decorateRequest("userId", undefined);

app.get("/", async (req, res) => {
  res.send({ message: "Hello, ObserveKit!" });
});

const start = async () => {
  try {
    await checkConnection();
    await migrate();
    await app.listen({ port: Number(PORT) });
    startSloMonitor();
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
