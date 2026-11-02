# ObserveKit

Structured log ingestion and trace correlation for Node.js services.

ObserveKit collects application logs through an API, processes them with Redis-backed workers and stores events in ClickHouse. A Next.js dashboard lets you filter logs and follow a request across services using a shared trace ID.

## Preview

![ObserveKit dashboard preview](packages/frontend/public/dashboard-preview.png)

## What it does

- Accepts validated log batches through an API-key-protected ingestion endpoint.
- Separates HTTP ingestion from event storage with a BullMQ queue.
- Stores application and API-key records in PostgreSQL, with event data in ClickHouse.
- Queries logs by service, level and time, and groups related events by trace ID.
- Includes a dashboard, trace view, live-tail endpoint and API-key management.
- Checks recent service error rates and can send alerts through a Slack webhook.

## Architecture

```mermaid
flowchart TD
    Services["Application services"] --> API["Fastify ingestion API"]
    API --> Queue["Redis and BullMQ"]
    Queue --> Worker["Log worker"]
    Worker --> Events["ClickHouse event storage"]
    Worker --> Stream["In-process live-tail events"]
    Dashboard["Next.js dashboard"] --> Queries["Authenticated query routes"]
    Queries --> Events
    API --> Keys["PostgreSQL API-key records"]
    Dashboard --> Stream
```

| Component | Responsibility |
| --- | --- |
| Fastify + Zod | Validate requests, authenticate ingestion and expose queries |
| Redis + BullMQ | Queue log batches for processing |
| ClickHouse | Store and query structured events; the current table has a 30-day TTL |
| PostgreSQL + Drizzle | Store application records and API-key metadata |
| Next.js + React Query | Dashboard, filters, trace views and key management |
| Clerk | Authenticate dashboard users and query requests |

## Local development

Requirements: **Node.js 20.9+**, **pnpm 10.18.1**, Docker with Compose, and Clerk publishable and secret keys.

```bash
git clone https://github.com/Abhishek-Sonje/observe-kit.git
cd observe-kit
pnpm install --frozen-lockfile
cp .env.example .env
```

For running the application on your host, edit the root `.env`:

| Variable | Local value |
| --- | --- |
| `CLICKHOUSE_URL` | `http://localhost:8123` |
| `CLICKHOUSE_HOST` | `localhost` |
| `REDIS_HOST` | `localhost` |
| `DATABASE_URL` | `postgresql://admin:secret@localhost:5432/observekit` |
| `FRONTEND_URL` | `http://localhost:3001` |
| `CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key |
| `CLERK_SECRET_KEY` | Your Clerk secret key |

Keep the remaining database settings from `.env.example`. `SLACK_WEBHOOK_URL` is optional.

Create `packages/frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

Start the local databases:

```bash
docker compose up -d postgres redis clickhouse
```

Once they are ready, load the root environment into your shell, apply the PostgreSQL migrations and start the backend. In Bash or WSL:

```bash
set -a
source .env
set +a
pnpm --filter @observe-kit/backend db:migrate
pnpm --filter @observe-kit/backend dev
```

In PowerShell or another shell, set the same environment variables before starting the backend. Loading them before startup also makes them available to modules initialized during import.

In a second terminal:

```bash
pnpm --filter @observe-kit/frontend dev
```

Open [localhost:3001](http://localhost:3001). The backend listens at [localhost:3000](http://localhost:3000); `GET /health` checks that the HTTP server is responding. The backend creates its ClickHouse log table during startup.

Sign in and create an ingestion key in Settings.

### Docker application services

The [Compose file](docker-compose.yml) also defines frontend and backend containers. Their Dockerfiles are available for deployment work; the host-development steps above make configuration explicit. The frontend uses a Next.js build, so public environment values must be available at build time, not only at container runtime.

## Send a log batch

Use an API key generated in Settings. Ingestion uses `Authorization: Bearer <key>`.

```bash
curl -X POST http://localhost:3000/v1/logs \
  -H "Authorization: Bearer YOUR_OBSERVEKIT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "message": "Order request received",
      "level": "info",
      "service_name": "orders-api",
      "version": "1.0.0",
      "trace_id": "order-demo-001",
      "span_id": "receive-order"
    },
    {
      "message": "Payment provider timed out",
      "level": "error",
      "service_name": "payments-api",
      "version": "1.0.0",
      "trace_id": "order-demo-001",
      "span_id": "charge-card"
    }
  ]'
```

A successful ingestion returns **202 Accepted**. This confirms queue acceptance; it does not confirm that storage has completed. Find `order-demo-001` in the trace view to inspect the related events.

## API overview

| Endpoint | Purpose | Authentication |
| --- | --- | --- |
| `GET /health` | HTTP health response | None |
| `POST /v1/logs` | Accept an array of structured logs | Ingestion API key |
| `GET /v1/logs` | Query logs by service, level and time | Clerk session |
| `GET /v1/logs/trace/:trace_id` | Retrieve events sharing a trace ID | Clerk session |
| `GET /v1/services` | List services with stored logs | Clerk session |
| `GET /v1/logs/stream` | Subscribe to server-sent log events | Authenticated stream |

Each ingestion entry requires `message`, `level`, `service_name` and `version`. Levels are `debug`, `info`, `warn` and `error`; `trace_id`, `span_id` and `timestamp` are optional.

## Code map

| Location | Responsibility |
| --- | --- |
| [packages/backend/src/routes](packages/backend/src/routes) | Ingestion, queries, streams and key endpoints |
| [packages/backend/src/queue](packages/backend/src/queue) | Queue configuration and ingestion worker |
| [packages/backend/src/db](packages/backend/src/db) | Database clients, schemas and ClickHouse migration |
| [packages/backend/drizzle](packages/backend/drizzle) | PostgreSQL migrations |
| [packages/backend/src/services](packages/backend/src/services) | API-key handling and error-rate monitoring |
| [packages/frontend](packages/frontend) | Next.js application |
| [packages/common](packages/common) | Shared types |

## Checks

```bash
pnpm test
pnpm --filter @observe-kit/backend build
pnpm --filter @observe-kit/frontend lint
pnpm --filter @observe-kit/frontend build
```

The tests cover log validation, API-key service behavior and frontend API helpers. Builds and application startup require their respective configuration.

## Current boundaries

This is a development project with working ingestion and inspection components, rather than a production operations service.

- The worker currently writes ingestion time instead of preserving the submitted event timestamp.
- A storage insert error is logged inside the worker; durable delivery and failure recovery need further work.
- Live tail uses an in-process emitter. Per-user stream filtering and distribution across multiple backend processes need further work.
- Error-rate monitoring uses fixed thresholds and service-level aggregation.
- The supplied database credentials and exposed ports are intended for local development.

Built by [Abhishek Sonje](https://github.com/Abhishek-Sonje).
