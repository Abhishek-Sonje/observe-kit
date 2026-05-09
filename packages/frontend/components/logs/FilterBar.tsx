"use client";

import React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FilterBarProps {
  updateFilter: (key: string, value: string) => void;
  service: string;
  level: string;
  from: string;
  to: string;
  services: string[];
}

export default function FilterBar({
  updateFilter,
  service,
  level,
  from,
  to,
  services,
}: FilterBarProps) {
  const hasFilters = service || level || from || to;

  return (
    <div className="card-glass p-6 mb-12 flex flex-wrap gap-6 items-end border-none shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-3 block">Service Origin</label>
        <select
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 h-12 text-sm font-medium outline-none focus:border-primary transition-colors appearance-none"
          value={service}
          onChange={(e) => updateFilter("service_name", e.target.value)}
        >
          <option value="">All Services</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="w-48">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-3 block">Severity Level</label>
        <select
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 h-12 text-sm font-medium outline-none focus:border-primary transition-colors appearance-none"
          value={level}
          onChange={(e) => updateFilter("level", e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="info">INFO</option>
          <option value="warn">WARN</option>
          <option value="error">ERROR</option>
          <option value="debug">DEBUG</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="w-48">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-3 block">Start Boundary</label>
          <input
            type="datetime-local"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 h-12 text-xs font-medium outline-none focus:border-primary transition-colors"
            value={from}
            onChange={(e) => updateFilter("from", e.target.value)}
          />
        </div>
        <div className="w-48">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-3 block">End Boundary</label>
          <input
            type="datetime-local"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 h-12 text-xs font-medium outline-none focus:border-primary transition-colors"
            value={to}
            onChange={(e) => updateFilter("to", e.target.value)}
          />
        </div>
      </div>

      {hasFilters && (
        <Button 
          variant="ghost" 
          className="h-12 px-6 text-xs font-bold uppercase tracking-widest text-error hover:bg-error/5"
          onClick={() => {
            updateFilter("service_name", "");
            updateFilter("level", "");
            updateFilter("from", "");
            updateFilter("to", "");
          }}
        >
          <X size={14} className="mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}
