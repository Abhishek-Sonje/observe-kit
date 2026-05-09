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
import rateLimit from "@fastify/rate-limit";

dotenv.config();

const app = fastify({
  logger: true,
});
const PORT = process.env.PORT || 3000;

app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
  keyGenerator: (req) => req.userId || req.ip,
});

app.register(clerkPlugin, {
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.register(fastifyCors, {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
});
app.get("/health", async () => ({ status: "ok", timestamp: Date.now() }));
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
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    startSloMonitor();
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
