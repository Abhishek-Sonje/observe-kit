"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Terminal, 
  Layers, 
  Activity, 
  RefreshCcw, 
  Wifi, 
  WifiOff, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import FilterBar from "@/components/logs/FilterBar";

// Hardcoded demo data
const DEMO_SERVICES = ["auth-service", "payment-api", "inventory-worker"];

const INITIAL_LOGS = [
  { id: "1", timestamp: Date.now() - 5000, level: "info", service_name: "auth-service", message: "User logged in successfully", trace_id: "req_abc123", version: "1.0.0" },
  { id: "2", timestamp: Date.now() - 15000, level: "warn", service_name: "payment-api", message: "High latency detected with Stripe API", trace_id: "req_def456", version: "2.1.0" },
  { id: "3", timestamp: Date.now() - 45000, level: "error", service_name: "inventory-worker", message: "Failed to connect to Redis cluster", trace_id: "req_ghi789", version: "1.0.2" },
  { id: "4", timestamp: Date.now() - 60000, level: "info", service_name: "auth-service", message: "JWT token refreshed", trace_id: "req_jkl012", version: "1.0.0" },
  { id: "5", timestamp: Date.now() - 120000, level: "debug", service_name: "payment-api", message: "Payload validated", trace_id: "req_mno345", version: "2.1.0" },
];

export default function DemoEnvironment() {
  const [currentView, setCurrentView] = useState<"dashboard" | "logs">("dashboard");
  const [isLive, setIsLive] = useState(false);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  
  // Simulated Live Tail
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const newLog = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        level: Math.random() > 0.8 ? "warn" : Math.random() > 0.9 ? "error" : "info",
        service_name: DEMO_SERVICES[Math.floor(Math.random() * DEMO_SERVICES.length)],
        message: "Simulated log event generated from edge worker.",
        trace_id: `req_${Math.random().toString(36).substring(7)}`,
        version: "1.0.0"
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 100));
    }, 2500); // New log every 2.5s
    
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Demo Sidebar */}
      <aside className="w-72 border-r border-outline-variant bg-surface-container-lowest flex flex-col h-screen sticky top-0">
        <div className="p-8 pb-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
              <Layers size={20} />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-on-surface">ObserveKit</span>
          </Link>
          <div className="mt-4 px-3 py-1 bg-warning/20 text-warning text-[10px] font-bold uppercase tracking-widest rounded-md inline-block">
            Demo Mode Active
          </div>
        </div>

        <nav className="flex-1 px-6 mt-8 space-y-2">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
              currentView === "dashboard" ? "bg-primary text-on-primary" : "text-on-surface-variant/70 hover:bg-surface-container"
            }`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button
            onClick={() => setCurrentView("logs")}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
              currentView === "logs" ? "bg-primary text-on-primary" : "text-on-surface-variant/70 hover:bg-surface-container"
            }`}
          >
            <Terminal size={20} /> Explorer
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {currentView === "dashboard" ? (
          <div className="px-10 py-12 animate-in fade-in slide-in-from-bottom-4">
            <header className="mb-16">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(77,124,97,0.4)]" />
                <p className="text-label-caps text-on-surface-variant/60">System Operational</p>
              </div>
              <h1 className="text-5xl font-heading font-semibold tracking-tight">Services</h1>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DEMO_SERVICES.map(service => (
                <div 
                  key={service}
                  onClick={() => setCurrentView("logs")}
                  className="card group p-8 bg-surface-container-low/30 hover:bg-white transition-all duration-500 relative overflow-hidden cursor-pointer"
                >
                  <div className="flex flex-col h-full justify-between gap-12 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Activity size={20} />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
                        Healthy
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                        {service}
                      </h3>
                      <p className="text-xs text-on-surface-variant/60 font-mono uppercase tracking-widest flex items-center gap-2">
                        View Streams
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-10 py-12 animate-in fade-in slide-in-from-bottom-4">
            <header className="flex justify-between items-end mb-16">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`h-2 w-2 rounded-full ${isLive ? "bg-success" : "bg-outline-variant"}`} />
                  <p className="text-label-caps text-on-surface-variant/60">
                    {isLive ? "Simulated Live Streaming" : "Snapshot View"}
                  </p>
                </div>
                <h1 className="text-5xl font-heading font-semibold tracking-tight">Telemetry</h1>
              </div>

              <div className="flex gap-4">
                <Button
                  variant={isLive ? "primary" : "secondary"}
                  size="md"
                  className="h-12 px-6 gap-2"
                  onClick={() => setIsLive(!isLive)}
                >
                  {isLive ? <Wifi size={18} /> : <WifiOff size={18} />}
                  {isLive ? "Live Tail Active" : "Go Live"}
                </Button>
              </div>
            </header>

            <div className="card overflow-hidden border-outline-variant/40 bg-white">
              <div className="bg-surface-container-low/50 border-b border-outline-variant px-6 py-4 flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/70">
                <span className="w-24">Timestamp</span>
                <span className="w-16">Level</span>
                <span className="w-32">Service</span>
                <span className="flex-1">Message</span>
                <span className="w-32">Trace ID</span>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {logs.map((log, i) => (
                  <div 
                    key={log.id} 
                    className={`flex gap-4 py-3.5 px-6 transition-all duration-1000 items-center ${
                      i === 0 && isLive ? "animate-[highlight_2s_ease-out_forwards]" : "hover:bg-surface-container-low/50"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-on-surface-variant/50 whitespace-nowrap w-24">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                    </span>
                    <div className="w-16">
                      <Badge variant={log.level === "error" ? "error" : log.level === "warn" ? "warning" : "default"} className="w-full text-center">
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
                      <span className="text-[10px] font-mono text-on-surface-variant/40 bg-surface-container px-2 py-1 rounded-md">
                        {log.trace_id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
