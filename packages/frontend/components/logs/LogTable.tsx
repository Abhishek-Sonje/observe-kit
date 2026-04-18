"use client";

import { Log } from "@observe-kit/common";

export default function LogTable({
  data,
  isLoading,
  error,
}: {
  data: Log[];
  isLoading: boolean;
  error: Error | null;
}) {
  return (
    <div>
      <div>LogTable</div>
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
            {data.map((log) => (
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
    </div>
  );
}
