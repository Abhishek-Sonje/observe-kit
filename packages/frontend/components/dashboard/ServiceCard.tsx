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
      className="card group p-8 bg-white border border-outline-variant/30 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden rounded-[2rem]"
    >
      {/* Decorative gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-5 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
        <Activity size={100} />
      </div>
      
      <div className="flex flex-col h-full justify-between gap-12 relative z-10">
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
            <Activity size={22} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest border border-success/10">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(77,124,97,0.6)]" />
            Healthy
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-heading font-semibold tracking-tight mb-3 text-on-surface group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs text-on-surface-variant/60 font-mono uppercase tracking-widest flex items-center gap-2">
              View Streams
            </p>
            <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ArrowRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
