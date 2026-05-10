"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const mockLogs = [
  { level: "info", service: "api-gateway", msg: "Request routed to /users" },
  { level: "warn", service: "auth-service", msg: "High latency detected" },
  { level: "error", service: "db-cluster", msg: "Connection timeout on node-3" },
  { level: "info", service: "payment-svc", msg: "Transaction 88x1 completed" },
  { level: "info", service: "worker-pool", msg: "Job queue processed 42 items" },
  { level: "warn", service: "cache-layer", msg: "Cache miss rate > 15%" },
  { level: "error", service: "api-gateway", msg: "Rate limit exceeded for IP" },
];

export function LiveTailDemo() {
  const [logs, setLogs] = useState<typeof mockLogs>([]);

  useEffect(() => {
    // Start with a few logs
    setLogs(mockLogs.slice(0, 3));

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
        const newLogs = [...prev, nextLog];
        // Keep only last 6 logs
        return newLogs.slice(-6);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:col-span-2 card p-10 border-outline-variant/40 flex flex-col justify-between group h-full min-h-[320px] bg-white">
      <div className="relative z-20 flex-1">
        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
          <Zap size={24} />
        </div>
        <h4 className="text-2xl font-bold mb-3 text-on-surface">Live Tail</h4>
        <p className="text-on-surface-variant text-sm mb-6">
          Watch telemetry arrive in real-time. No refresh, no delay,
          just pure data streaming.
        </p>
      </div>

      {/* Terminal Mockup */}
      <div className="relative z-0 mt-auto bg-[#0a0d1a] border border-white/10 rounded-lg p-4 font-mono text-[10px] leading-relaxed h-[140px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#0a0d1a] to-transparent z-10" />
        <div className="flex flex-col gap-1.5 justify-end h-full">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className={`
                ${log.level === 'info' ? 'text-success' : ''}
                ${log.level === 'warn' ? 'text-warning' : ''}
                ${log.level === 'error' ? 'text-error' : ''}
              `}>
                [{log.level.toUpperCase()}]
              </span>
              <span className="text-white/40">{log.service}</span>
              <span className="text-white/80">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
