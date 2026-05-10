"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getServices } from "@/lib/api";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { RefreshCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
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
    <div className="min-h-screen pb-20">
      {/* Decorative Header Background */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-surface-container-low to-transparent pointer-events-none" />
      
      <div className="px-10 py-16 max-w-[1400px] mx-auto relative z-10">
        <header className="flex justify-between items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(77,124,97,0.4)] animate-pulse" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">
                System Operational
              </p>
            </div>
            <h1 className="text-6xl font-heading font-semibold tracking-tight text-on-surface">
              Active Services
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              className="h-12 w-12 rounded-2xl flex items-center justify-center p-0 hover:bg-surface-container transition-colors" 
              onClick={() => refetch()}
            >
              <RefreshCcw size={18} className={isLoading ? "animate-spin text-primary" : "text-on-surface-variant"} />
            </Button>
            <Button className="h-12 px-8 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              Deploy Service
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[280px] bg-white border border-outline-variant/30 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : services?.length === 0 ? (
          <div className="card p-24 border-none shadow-2xl shadow-primary/5 bg-white rounded-[2rem] text-center flex flex-col items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
            <div className="h-20 w-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
              <LayoutGrid size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-heading font-semibold mb-4 text-on-surface tracking-tight">No telemetry received</h3>
            <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-10">
              Initialize your first application using our SDK to begin tracking performance and logging events.
            </p>
            <Button onClick={() => router.push("/docs")} className="h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-xs">
              View Documentation
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <ServiceCard key={service} name={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
