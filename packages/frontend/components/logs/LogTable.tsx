"use client";

import { useLiveTail } from "@/hooks/useLiveTail";
import { Log } from "@observe-kit/common";
import { useMemo, useState } from "react";

export default function LogTable({
  data,
  isLoading,
  error,
}: {
  data: Log[];
  isLoading: boolean;
  error: Error | null;
}) {
  const [isLive, setIsLive] = useState(false);

  const liveLogs = useLiveTail(isLive);
  const liveData = useMemo(() => {
    if (!isLive) return data;

    const liveIds = new Set(liveLogs.map((log) => log.id));
    const filteredData = data.filter((log) => !liveIds.has(log.id));
    return [...filteredData, ...liveLogs ]
 }, [isLive, data, liveLogs]);
  return (
    <>
      <div>LogTable</div>
      <div>
        <button onClick={() => setIsLive((prev) => !prev)}>
          {isLive ? "Stop Live" : "Start Live"}
        </button>
      </div>
      <div>
        <button onClick={() => alert("Download CSV")}>Download CSV</button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Timestamp</th>
              <th className="py-2">Service</th>
              <th className="py-2">Level</th>
              <th className="py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {liveData.map((log) => (
              <tr key={log.id}>
                <td className="py-2">{log.timestamp}</td>
                <td className="py-2">{log.service_name}</td>
                <td className="py-2">{log.level}</td>
                <td className="py-2">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
