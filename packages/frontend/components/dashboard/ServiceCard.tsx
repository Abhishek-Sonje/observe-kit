import React from "react";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  name: string;
}

export const ServiceCard = ({ name }: ServiceCardProps) => {
  return (
    <Link 
      href={`/logs?service_name=${name}`}
      className="card group p-8 bg-surface-container-low/30 hover:bg-white transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Activity size={80} />
      </div>
      
      <div className="flex flex-col h-full justify-between gap-12 relative z-10">
        <div className="flex justify-between items-start">
          <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Activity size={20} />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Healthy
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-heading font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-on-surface-variant/60 font-mono uppercase tracking-widest flex items-center gap-2">
            View Streams <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </p>
        </div>
      </div>
    </Link>
  );
};
