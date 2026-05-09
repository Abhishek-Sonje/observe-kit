"use client";

import React from "react";
import { Server, Cpu, Database, Network, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function InfrastructurePage() {
  const nodes = [
    { name: "ap-south-1-primary", type: "ClickHouse Node", status: "Healthy", load: "42%", uptime: "99.9%" },
    { name: "us-east-1-ingest", type: "Redis Cluster", status: "Healthy", load: "15%", uptime: "100%" },
    { name: "eu-central-1-worker", type: "BullMQ Processor", status: "Heavy Load", load: "88%", uptime: "98.2%" },
    { name: "global-edge-proxy", type: "Auth Gateway", status: "Healthy", load: "10%", uptime: "99.9%" },
  ];

  return (
    <div className="px-10 py-12">
      <header className="flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Server size={14} className="text-primary" />
            <p className="text-label-caps text-on-surface-variant/60">Cluster Health</p>
          </div>
          <h1 className="text-5xl font-heading font-semibold tracking-tight">Infrastructure</h1>
        </div>
        <Button size="md" className="h-12 px-8">Add Node</Button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* OVERVIEW STATS */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total CPU", value: "32 Cores", icon: Cpu },
            { label: "Memory Pool", value: "128 GB", icon: Database },
            { label: "Network IO", value: "1.2 GB/s", icon: Network },
            { label: "Regions", value: "3 Active", icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="card p-8 bg-white flex flex-col gap-4 group hover:bg-primary hover:text-on-primary transition-all duration-500">
              <stat.icon size={24} className="text-primary group-hover:text-on-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</p>
                <h3 className="text-2xl font-heading font-bold">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* NODE LIST */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card overflow-hidden bg-white">
            <div className="bg-surface-container-low/50 border-b border-outline-variant px-8 py-6 flex justify-between items-center">
              <h3 className="text-label-caps text-on-surface-variant/60">Resource Nodes</h3>
              <span className="text-[10px] font-mono text-on-surface-variant/40">{nodes.length} Active</span>
            </div>
            
            <div className="divide-y divide-outline-variant/20">
              {nodes.map((node) => (
                <div key={node.name} className="flex items-center justify-between p-8 hover:bg-surface-container-low/30 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Server size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">{node.name}</h4>
                      <p className="text-[10px] font-mono text-on-surface-variant/40 mt-1 uppercase tracking-widest">{node.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-12 items-center">
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest mb-1">Load</p>
                      <p className="text-sm font-bold">{node.load}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant/40 uppercase font-bold tracking-widest mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${node.status === "Healthy" ? "bg-success" : "bg-warning"} animate-pulse`} />
                        <span className="text-sm font-bold">{node.status}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR - TOPOLOGY */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card p-10 bg-primary text-on-primary relative overflow-hidden group border-none">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Globe size={160} />
            </div>
            <h3 className="text-label-caps mb-6 text-on-primary/40 tracking-[0.2em]">Regional Distribution</h3>
            <div className="space-y-6 relative z-10">
              {[
                { region: "Mumbai", count: 12, health: 100 },
                { region: "N. Virginia", count: 8, health: 98 },
                { region: "Frankfurt", count: 6, health: 100 },
              ].map((r) => (
                <div key={r.region}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{r.region}</span>
                    <span>{r.count} Nodes</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${r.health}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
