"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getServices } from "@/lib/api";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { RefreshCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
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

  const { data: services, isLoading, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(authenticatedFetch),
  });

  return (
    <div className="px-10 py-12">
      <header className="flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(77,124,97,0.4)]" />
            <p className="text-label-caps text-on-surface-variant/60">System Operational</p>
          </div>
          <h1 className="text-5xl font-heading font-semibold tracking-tight">Services</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="md" className="h-12" onClick={() => refetch()}>
            <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button size="md" className="h-12 px-8">
            Deploy New Service
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-surface-container-low animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : services?.length === 0 ? (
        <div className="p-24 border-2 border-dashed border-outline-variant rounded-[32px] text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/40 mb-6">
            <LayoutGrid size={32} />
          </div>
          <h3 className="text-2xl font-heading font-semibold mb-2">No services found</h3>
          <p className="text-on-surface-variant max-w-sm leading-relaxed mb-8">
            Connect your first application using our lightweight SDK to start collecting telemetry.
          </p>
          <Button variant="secondary">Documentation</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <ServiceCard key={service} name={service} />
          ))}
        </div>
      )}
    </div>
  );
}
