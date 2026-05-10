# ObserveKit Documentation

## What is ObserveKit?

ObserveKit is a self-hostable observability platform for developers. It gives you log ingestion, real-time log streaming, distributed trace correlation, and SLO alerting — without the $200/month Datadog bill.

---

## Getting Started

### 1. Create an account
Sign up at observekit.com with Google or email.

### 2. Generate an API key
Go to **Settings** → **Create new key** → give it a name → copy the key. Store it securely — it won't be shown again.

### 3. Send your first log
Make a POST request to the ingest endpoint from your service:

```bash
curl -X POST https://your-observekit-url.onrender.com/v1/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: ApiKey YOUR_API_KEY" \
  -d '[{
    "message": "User logged in successfully",
    "level": "info",
    "service_name": "auth-service",
    "version": "1.0.0",
    "trace_id": "abc123"
  }]'
```

### 4. View your logs
Go to **Dashboard** → click your service → see all logs in the **Log Explorer**.

---

## Log Object

Every log you send must follow this structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | ✅ | The log message |
| `level` | `info` | `warn` | `error` | `debug` | ✅ | Severity level |
| `service_name` | string | ✅ | Name of your service |
| `version` | string | ✅ | Version of your service |
| `trace_id` | string | ❌ | Unique ID linking logs across services |
| `span_id` | string | ❌ | ID for a specific operation within a trace |
| `timestamp` | number | ❌ | Unix ms timestamp. Defaults to now if not provided |

---

## Sending Logs from Node.js

```typescript
async function log(level: string, message: string, traceId?: string) {
  await fetch('https://your-observekit-url.onrender.com/v1/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey YOUR_API_KEY'
    },
    body: JSON.stringify([{
      message,
      level,
      service_name: 'your-service-name',
      version: process.env.npm_package_version || '1.0.0',
      trace_id: traceId,
      timestamp: Date.now()
    }])
  })
}

// Usage
await log('info', 'Payment processed', req.traceId)
await log('error', 'Database connection failed', req.traceId)
```

---

## Sending Logs from Python

```python
import requests
import time

def log(level: str, message: str, trace_id: str = None):
    requests.post(
        'https://your-observekit-url.onrender.com/v1/logs',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'ApiKey YOUR_API_KEY'
        },
        json=[{
            'message': message,
            'level': level,
            'service_name': 'your-service-name',
            'version': '1.0.0',
            'trace_id': trace_id,
            'timestamp': int(time.time() * 1000)
        }]
    )

# Usage
log('info', 'Request received', trace_id='abc123')
log('error', 'Payment failed', trace_id='abc123')
```

---

## Trace Correlation

Trace correlation is the most powerful feature of ObserveKit. It lets you follow a single request across multiple services.

**How it works:**

1. Generate a unique `trace_id` when a request enters your system
2. Pass it to every service that handles that request
3. Each service includes it in their logs
4. ObserveKit links all those logs together

**Example — a payment flow:**

```typescript
// API Gateway
const traceId = crypto.randomUUID()
await log('info', 'Payment request received', traceId)

// calls Auth Service with traceId in header
// calls Payment Service with traceId in header

// Auth Service
await log('info', 'User authenticated', traceId)

// Payment Service  
await log('info', 'Processing payment', traceId)
await log('error', 'Card declined', traceId)
```

Now in ObserveKit → click the `trace_id` in any log → see the complete request timeline across all three services.

---

## Live Tail

Watch logs stream in real time without refreshing.

1. Go to **Log Explorer** `/logs`
2. Click **Start Live** button
3. Send logs from your service
4. Watch them appear instantly

Live tail uses Server-Sent Events (SSE) — a persistent connection from your browser to ObserveKit that pushes new logs as they arrive.

---

## SLO Alerts

ObserveKit monitors your error rate automatically.

**Default threshold:** If any service exceeds **5% error rate** in the last hour, you get alerted.

**To receive Slack alerts:**
1. Create a Slack incoming webhook at `api.slack.com/apps`
2. Add `SLACK_WEBHOOK_URL` to your ObserveKit backend environment variables
3. Alerts fire automatically — no configuration needed per service

**Alert format:**
```
🚨 SLO Alert: auth-service has error rate of 8% (threshold: 5%)
```

Alerts deduplicate — you won't get spammed. Same service won't alert again for 1 hour.

---

## API Reference

### Ingest Logs
```
POST /v1/logs
Authorization: ApiKey YOUR_API_KEY
Content-Type: application/json

Body: Log[]
Response: 202 Accepted
```

### Query Logs
```
GET /v1/logs
Authorization: Bearer CLERK_TOKEN
Query params:
  service_name?: string
  level?: info | warn | error | debug
  start_time?: ISO timestamp
  end_time?: ISO timestamp
  limit?: number (default 50)

Response: Log[]
```

### Get Logs by Trace
```
GET /v1/logs/trace/:trace_id
Authorization: Bearer CLERK_TOKEN

Response: Log[]
```

### List Services
```
GET /v1/services
Authorization: Bearer CLERK_TOKEN

Response: string[]
```

### Live Tail Stream
```
GET /v1/logs/stream
Authorization: Bearer CLERK_TOKEN

Response: SSE stream of Log[]
```

### Create API Key
```
POST /v1/api-keys
Authorization: Bearer CLERK_TOKEN
Body: { name: string }

Response: { apiKey: string }
```

### List API Keys
```
GET /v1/api-keys
Authorization: Bearer CLERK_TOKEN

Response: { id, name, createdAt }[]
```

### Revoke API Key
```
DELETE /v1/api-keys/:id
Authorization: Bearer CLERK_TOKEN

Response: 200 OK
```

---

## Self Hosting

Want to run ObserveKit on your own infrastructure?

**Requirements:**
- Docker and Docker Compose
- A server with at least 1GB RAM

**Setup:**
```bash
git clone https://github.com/Abhishek-Sonje/observe-kit
cd observe-kit
cp .env.example .env
# fill in your environment variables
docker compose up -d
```

**Required environment variables:**
```
CLICKHOUSE_URL=
CLICKHOUSE_USER=
CLICKHOUSE_PASSWORD=
CLICKHOUSE_DATABASE=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_TLS=
DATABASE_URL=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
SLACK_WEBHOOK_URL= (optional)
FRONTEND_URL=
```
