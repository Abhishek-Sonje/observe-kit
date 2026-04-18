"use client";

import type { Log } from "@observe-kit/common";
export default function FilterBar({
  updateFilter,
  service,
  level,
  from,
  to
}: {
  updateFilter: (key: string, value: string) => void;
  service: string;
  level: Log["level"] | "";
  from: string;
  to: string;

}) {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Service"
        className="border p-2 rounded"
        value={service}
        onChange={(e) => updateFilter("service_name", e.target.value)}
      />
      <select
        title="level"
        className="border p-2 rounded"
        value={level}
        onChange={(e) =>
          updateFilter("level", e.target.value as Log["level"] | "")
        }
      >
        <option value="">All Levels</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
      <input
        type="datetime-local"
        placeholder="From"
        className="border p-2 rounded"
        value={from}
        onChange={(e) => updateFilter("from", e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="To"
        className="border p-2 rounded"
        value={to}
        onChange={(e) => updateFilter("to", e.target.value)}
      />
    </div>
  );
}
