"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { getLogsByTrace } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, Clock, Activity, ArrowRight, Server } from "lucide-react";
import Link from "next/link";
import { Log } from "@/types";

export default function TraceClient({ traceId }: { traceId: string }) {
  const { getToken } = useAuth();

  const authenticatedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = await getToken({ template: "backend" });
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: logs, isLoading } = useQuery({
    queryKey: ["trace", traceId],
    queryFn: () => getLogsByTrace(traceId, authenticatedFetch),
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em] animate-pulse">Reconstructing Trace</p>
      </div>
    );
  }

  const firstLog = logs?.[0];
  const lastLog = logs?.[logs.length - 1];
  const duration = firstLog && lastLog 
    ? lastLog.timestamp - firstLog.timestamp
    : 0;

  return (
    <div className="px-10 py-12">
      {/* HEADER */}
      <div className="mb-16">
        <Link 
          href="/logs" 
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={14} />
          Back to Explorer
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-label-caps text-on-surface-variant/60">Distributed Trace</p>
            </div>
            <h1 className="text-5xl font-heading font-semibold tracking-tight">{traceId}</h1>
          </div>
          
          <div className="flex gap-4 p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30">
             <div className="flex flex-col gap-1 pr-8 border-r border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest">Total Duration</span>
                <span className="text-2xl font-heading font-semibold text-primary">{duration}ms</span>
             </div>
             <div className="flex flex-col gap-1 pl-8">
                <span className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest">Span Count</span>
                <span className="text-2xl font-heading font-semibold text-primary">{logs?.length || 0}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* TIMELINE */}
        <div className="col-span-12 lg:col-span-8">
          <h2 className="text-label-caps text-on-surface-variant/30 mb-8">Waterfall Analysis</h2>
          
          <div className="space-y-6 relative">
            <div className="absolute left-[39px] top-4 bottom-4 w-[1px] bg-outline-variant/30" />
            
            {logs?.map((log, i) => {
              const offset = duration > 0 ? ((log.timestamp - (firstLog?.timestamp || 0)) / duration) * 100 : 0;
              
              return (
                <div key={log.id} className="relative pl-20 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[35px] top-[22px] h-2 w-2 rounded-full bg-outline-variant group-hover:bg-primary transition-colors z-10" />
                  
                  <div className="card p-6 bg-white hover:bg-surface-container-low/30 transition-all border-outline-variant/30 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Badge variant={log.level === "error" ? "error" : log.level === "warn" ? "warning" : "default"}>
                          {log.level}
                        </Badge>
                        <span className="text-base font-heading font-semibold tracking-tight">{log.service_name}</span>
                        <span className="text-[10px] font-mono text-on-surface-variant/40">v{log.version}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant/40 font-mono">
                        +{log.timestamp - (firstLog?.timestamp || 0)}ms
                      </span>
                    </div>
                    
                    <div className="bg-[#faf9f8] p-4 rounded-xl border border-outline-variant/20 mb-6">
                      <code className="text-sm font-mono text-on-surface leading-relaxed break-all">
                        {log.message}
                      </code>
                    </div>
                    
                    {/* WATERFALL BAR */}
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full transition-all duration-700"
                        style={{ 
                          marginLeft: `${offset}%`,
                          width: '4%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-4 space-y-8">
          <div className="card p-10 bg-white">
            <h3 className="text-label-caps mb-8 border-b border-outline-variant pb-6">Trace Parameters</h3>
            <div className="space-y-8">
              {[
                { label: "Infrastructure", value: "AWS Lambda", icon: Server },
                { label: "Environment", value: "Production", icon: Activity },
                { label: "Protocol", value: "gRPC Streaming", icon: ArrowRight },
                { label: "Trace Source", value: "Node SDK", icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-on-surface-variant/40">
                    <item.icon size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-base font-heading font-medium text-on-surface">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-10 bg-[#faf9f8] border-dashed">
             <h4 className="text-label-caps mb-6 text-on-surface-variant/40">Raw JSON Context</h4>
             <pre className="text-[11px] font-mono text-on-surface-variant/60 overflow-x-auto whitespace-pre-wrap p-6 bg-white rounded-2xl border border-outline-variant/30">
               {JSON.stringify(logs?.[0], null, 2)}
             </pre>
          </div>
        </aside>
      </div>
    </div>
  );
}