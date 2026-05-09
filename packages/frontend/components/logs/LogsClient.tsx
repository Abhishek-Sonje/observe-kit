"use client";

import React, { useState, useEffect, useRef } from "react";
import { getLogs, getServices } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import FilterBar from "./FilterBar";
import { LogTable } from "@/components/telemetry/LogTable";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { RefreshCcw, Wifi, WifiOff } from "lucide-react";
import { Log } from "@/types";

export default function LogsClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { getToken } = useAuth();
  const [liveLogs, setLiveLogs] = useState<Log[]>([]);
  const [isLive, setIsLive] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const service = searchParams.get("service_name") ?? "";
  const level = searchParams.get("level") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
    // Clear live logs when filters change to avoid confusion
    setLiveLogs([]);
  };

  const authenticatedFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    const token = await getToken({ template: "backend" });
    return fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(authenticatedFetch),
  });

  const {
    data: initialLogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["logs", searchParams.toString()],
    queryFn: () => getLogs(searchParams.toString(), authenticatedFetch),
  });

  // Combine initial logs with live logs
  const combinedLogs = [...liveLogs, ...(initialLogs || [])].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  useEffect(() => {
    if (isLive) {
      const connectSSE = async () => {
        try {
          const token = await getToken({ template: "backend" });
          if (!token) {
            console.error(
              "SSE Connection Error: No authentication token available",
            );
            setIsLive(false);
            return;
          }

          const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/logs/stream`,
          );
          url.searchParams.set("token", token);

          const es = new EventSource(url.toString());
          eventSourceRef.current = es;

          es.onmessage = (event) => {
            try {
              const newLog: Log = JSON.parse(event.data);
              setLiveLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 live logs
            } catch (e) {
              console.error("Error parsing live log:", e);
            }
          };

          es.onerror = (event) => {
            const errorMsg = `SSE Connection Error: ${event.type === "error" ? "Connection failed" : "Unknown error"}`;
            console.error(errorMsg, event);
            es.close();
            setIsLive(false);
          };
        } catch (error) {
          console.error("Error establishing SSE connection:", error);
          setIsLive(false);
        }
      };

      connectSSE();
    } else {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [isLive, getToken]);

  return (
    <div className="px-10 py-12">
      <header className="flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`h-2 w-2 rounded-full ${isLive ? "bg-success" : "bg-outline-variant"} shadow-[0_0_8px_rgba(77,124,97,0.4)]`}
            />
            <p className="text-label-caps text-on-surface-variant/60">
              {isLive ? "Live Streaming Active" : "Snapshot View"}
            </p>
          </div>
          <h1 className="text-5xl font-heading font-semibold tracking-tight">
            Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={isLive ? "primary" : "secondary"}
            size="md"
            className="h-12 px-6 gap-2"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? <Wifi size={18} /> : <WifiOff size={18} />}
            {isLive ? "Live Tail" : "Go Live"}
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="h-12"
            onClick={() => refetch()}
          >
            <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </header>

      <FilterBar
        updateFilter={updateFilter}
        service={service}
        level={level}
        from={from}
        to={to}
        services={services || []}
      />

      <LogTable logs={combinedLogs} isLoading={isLoading} />
    </div>
  );
}
