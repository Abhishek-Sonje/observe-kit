"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getLogs } from "@/lib/api";
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AlertsPage() {
  const { getToken } = useAuth();

  const authenticatedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = await getToken({ template: "backend" });
    return fetch(input, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${token}` },
    });
  };

  // Fetch recent logs to calculate error rates
  const { data: logs, isLoading } = useQuery({
    queryKey: ["logs", "recent-for-alerts"],
    queryFn: () => getLogs("", authenticatedFetch),
    refetchInterval: 10000, // Refresh every 10s
  });

  const alerts = useMemo(() => {
    if (!logs || logs.length === 0) return [];

    // Group logs by service
    const serviceStats: Record<string, { total: number; errors: number; lastErrorTime: number }> = {};
    
    logs.forEach(log => {
      if (!serviceStats[log.service_name]) {
        serviceStats[log.service_name] = { total: 0, errors: 0, lastErrorTime: 0 };
      }
      serviceStats[log.service_name].total += 1;
      if (log.level === "error") {
        serviceStats[log.service_name].errors += 1;
        if (log.timestamp > serviceStats[log.service_name].lastErrorTime) {
          serviceStats[log.service_name].lastErrorTime = log.timestamp;
        }
      }
    });

    const activeAlerts = [];
    
    for (const [serviceName, stats] of Object.entries(serviceStats)) {
      if (stats.total < 10) continue; // Need minimum sample size
      
      const errorRate = (stats.errors / stats.total) * 100;
      
      if (errorRate > 5) { // 5% SLO threshold
        activeAlerts.push({
          id: `AL-${Math.abs(hashString(serviceName)).toString().substring(0, 4)}`,
          title: `SLO Breach: High Error Rate on ${serviceName}`,
          severity: errorRate > 10 ? "Critical" : "Warning",
          time: new Date(stats.lastErrorTime).toLocaleTimeString(),
          status: "Active",
          metric: `${errorRate.toFixed(1)}% Error Rate`
        });
      }
    }

    return activeAlerts;
  }, [logs]);

  // Simple string hash for consistent alert IDs
  function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

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

      {isLoading ? (
        <div className="flex justify-center p-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="card p-24 flex flex-col items-center justify-center text-center bg-surface-container-lowest">
          <div className="h-16 w-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-heading font-semibold mb-2">Systems Nominal</h3>
          <p className="text-on-surface-variant max-w-sm leading-relaxed">
            All services are operating within acceptable error thresholds. No active alerts.
          </p>
        </div>
      ) : (
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
                    <p className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest mb-1">Metric</p>
                    <p className="text-sm font-bold font-mono text-error">{alert.metric}</p>
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
      )}
    </div>
  );
}
