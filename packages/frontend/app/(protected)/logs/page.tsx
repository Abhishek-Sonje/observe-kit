import { Suspense } from "react";
import LogsClient from "@/components/logs/LogsClient";

export default function LogsPage() {
  return (
    <Suspense
      fallback={<div className="px-10 py-12">Loading telemetry...</div>}
    >
      <LogsClient />
    </Suspense>
  );
}
