import { check } from "zod";
import { client } from "../db/clickhouse";


export function startSloMonitor() {
  const lastAlertTime = new Map<string, number>();
  const ALERT_COOLDOWN = 60 * 60 * 1000; // 1 hour
  async function checkSlos() {
    const query = `SELECT 
  service_name,
  count() as total,
  countIf(level = 'error') as errors,
  round(errors / total, 2) as error_rate
FROM logs
WHERE timestamp > now() - INTERVAL 1 HOUR
GROUP BY service_name`;
    const result = await client.query({
      query,
      format: "JSONEachRow",
    });
    const rows = (await result.json()) as {
      service_name: string;
      total: number;
      errors: number;
      error_rate: number;
    }[];
    rows.forEach((row) => {
      if (row.error_rate > 0.05) {
        console.warn(
          `SLO Alert: Service ${row.service_name} has an error rate of ${row.error_rate * 100}%`,
        );
        const lastAlert = lastAlertTime.get(row.service_name) ?? 0;

        if (Date.now() - lastAlert > ALERT_COOLDOWN) {
          sendSlackAlert(row.service_name, row.error_rate);
          lastAlertTime.set(row.service_name, Date.now());
        }
      }
    });
  }

  const sendSlackAlert = async (serviceName: string, errorRate: number) => {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `SLO Alert: *${serviceName}* has error rate of *${errorRate * 100}%* (threshold: 5%)`,
      }),
    });
  };

  checkSlos();
  setInterval(checkSlos, 3000);
}
