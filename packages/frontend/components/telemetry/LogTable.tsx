import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Log } from "@/types";
import Link from "next/link";
import { ChevronRight, Activity, Terminal, ArrowUpRight } from "lucide-react";

interface LogTableProps {
  logs: Log[];
  isLoading: boolean;
}

export const LogTable = ({ logs, isLoading }: LogTableProps) => {
  if (isLoading) {
    return (
      <div className="card-glass overflow-hidden border-none shadow-none">
        <div className="p-24 flex flex-col items-center justify-center gap-6">
          <div className="h-10 w-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em] animate-pulse">Synchronizing Telemetry</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden border-outline-variant/40 bg-white">
      <div className="bg-surface-container-low/50 border-b border-outline-variant px-6 py-4 flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70">
        <span className="w-24">Timestamp</span>
        <span className="w-16">Level</span>
        <span className="w-32">Service</span>
        <span className="flex-1">Message</span>
        <span className="w-32">Trace ID</span>
      </div>
      <div className="divide-y divide-outline-variant/30">
        {logs.length === 0 ? (
          <div className="p-32 text-center flex flex-col items-center gap-4 bg-surface-container-lowest">
            <div className="h-16 w-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/20 mb-2">
              <Terminal size={32} />
            </div>
            <div>
              <h4 className="text-xl font-heading font-semibold mb-1">No telemetry captured</h4>
              <p className="text-sm text-on-surface-variant/60 max-w-xs mx-auto">
                Waiting for logs to arrive from your connected services.
              </p>
            </div>
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={log.id} 
              className={`flex gap-4 py-3.5 px-6 transition-all duration-1000 group items-center ${
                index === 0 && !isLoading ? "animate-[highlight_2s_ease-out_forwards]" : "hover:bg-surface-container-low/50"
              }`}
            >
              <span className="font-mono text-[11px] text-on-surface-variant/50 whitespace-nowrap w-24">
                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
              </span>
              <div className="w-16">
                <Badge
                  variant={
                    log.level === "error" ? "error" : log.level === "warn" ? "warning" : "default"
                  }
                  className="w-full text-center"
                >
                  {log.level}
                </Badge>
              </div>
              <span className="font-mono text-[11px] text-primary font-bold whitespace-nowrap w-32 truncate">
                {log.service_name}
              </span>
              <span className="font-mono text-[12px] text-on-surface flex-1 truncate font-medium">
                {log.message}
              </span>
              <div className="w-32 flex justify-end">
                {log.trace_id ? (
                  <Link 
                    href={`/trace/${log.trace_id}`}
                    className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-md hover:bg-primary text-primary hover:text-on-primary transition-all group/trace font-bold shadow-sm"
                  >
                    <span className="text-[10px] font-mono truncate max-w-[80px]">{log.trace_id}</span>
                    <ArrowUpRight size={12} className="group-hover/trace:translate-x-0.5 group-hover/trace:-translate-y-0.5 transition-transform" />
                  </Link>
                ) : (
                  <span className="text-[10px] font-mono text-on-surface-variant/20">—</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
