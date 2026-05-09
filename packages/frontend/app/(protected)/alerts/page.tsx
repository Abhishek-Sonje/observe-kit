"use client";

import React from "react";
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AlertsPage() {
  const alerts = [
    { id: "AL-102", title: "High Error Rate: auth-service", severity: "Critical", time: "2m ago", status: "Active" },
    { id: "AL-101", title: "Latency Spike: ingestion-api", severity: "Warning", time: "15m ago", status: "Acknowledged" },
    { id: "AL-100", title: "Memory Threshold: redis-primary", severity: "Critical", time: "1h ago", status: "Resolved" },
    { id: "AL-099", title: "Database Connectivity Flaky", severity: "Warning", time: "2h ago", status: "Resolved" },
  ];

  return (
    <div className="px-10 py-12">
      <header className="flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bell size={14} className="text-primary" />
            <p className="text-label-caps text-on-surface-variant/60">Incident Management</p>
          </div>
          <h1 className="text-5xl font-heading font-semibold tracking-tight">Alerts</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="h-12 px-6 gap-2">
            <Filter size={16} />
            Filters
          </Button>
          <Button size="md" className="h-12 px-8">Configure Rules</Button>
        </div>
      </header>

      <div className="space-y-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="card p-8 bg-white hover:bg-surface-container-low/30 transition-all group relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.status === "Resolved" ? "bg-success/20" : alert.severity === "Critical" ? "bg-error" : "bg-warning"}`} />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  alert.status === "Resolved" ? "bg-success/10 text-success" : 
                  alert.severity === "Critical" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                }`}>
                  {alert.status === "Resolved" ? <CheckCircle2 size={24} /> : 
                   alert.severity === "Critical" ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">{alert.id}</span>
                    <Badge variant={alert.severity === "Critical" ? "error" : "warning"}>{alert.severity}</Badge>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">{alert.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest mb-1">Triggered</p>
                  <p className="text-sm font-bold font-mono">{alert.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest mb-1">State</p>
                  <p className={`text-sm font-bold ${alert.status === "Resolved" ? "text-success" : "text-on-surface"}`}>{alert.status}</p>
                </div>
                <Button variant="ghost" size="md" className="h-12 w-12 rounded-xl">
                  <MoreHorizontal size={20} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
