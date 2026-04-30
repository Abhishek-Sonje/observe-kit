import { useEffect, useState } from "react";

export function useLiveTail(isLive: boolean) {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!isLive) return;

    const source = new EventSource(
      process.env.NEXT_PUBLIC_API_URL + "/v1/logs/stream",
      { withCredentials: true },
    );
    source.onmessage = (event) => {
      const newLogs = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
    };

    return () => {
      source.close();
    };
  }, [isLive]);

  return logs;
}
