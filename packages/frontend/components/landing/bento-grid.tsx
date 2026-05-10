import {
  Workflow,
  History,
  Lock,
  LayoutDashboard,
} from "lucide-react";
import { LiveTailDemo } from "./live-tail-demo";

export function BentoGridSection() {
  return (
    <section className="py-32 px-6 bg-white border-y border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 text-left">
          <h2 className="text-label-caps text-primary mb-6 block font-mono">
            Unified Infrastructure
          </h2>
          {/* Typography fixed to match hero section */}
          <h3 className="text-5xl md:text-7xl font-heading font-semibold tracking-tight text-on-surface leading-[1.1]">
            Full-stack visibility <br className="hidden md:block" />
            in one engine.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Feature 1: Main Dashboard (Large) */}
          <div className="md:col-span-4 card p-10 bg-surface-container-lowest border-outline-variant/40 flex flex-col justify-between group overflow-hidden">
            <div className="relative z-10">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-on-primary mb-6 shadow-lg shadow-primary/20">
                <LayoutDashboard size={24} />
              </div>
              <h4 className="text-2xl font-bold mb-3">Service Dashboard</h4>
              <p className="text-on-surface-variant max-w-md">
                Instantly visualize every service in your infrastructure.
                One-click navigation from service health to granular logs.
              </p>
            </div>
            
            {/* Visual element for Service Dashboard */}
            <div className="mt-12 flex gap-4 p-4 bg-surface-container/50 rounded-xl border border-outline-variant/50 relative z-10 group-hover:border-primary/30 transition-colors duration-500">
              <div className="flex-1 space-y-3">
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%] rounded-full" />
                </div>
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-warning w-[45%] rounded-full" />
                </div>
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-success w-[90%] rounded-full" />
                </div>
              </div>
              <div className="w-16 flex flex-col gap-2 justify-center items-end">
                <div className="text-xs font-mono font-bold text-primary">75%</div>
                <div className="text-xs font-mono font-bold text-warning">45%</div>
                <div className="text-xs font-mono font-bold text-success">90%</div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Feature 2: Real-time (Tall) - Replaced with LiveTailDemo Client Component */}
          <LiveTailDemo />

          {/* Feature 3: Tracing */}
          <div className="md:col-span-2 card p-10 border-outline-variant/40 flex flex-col justify-between bg-surface-container-low group hover:bg-surface-container transition-colors">
            <div className="h-12 w-12 bg-surface-container group-hover:bg-white rounded-xl flex items-center justify-center text-primary mb-6 transition-colors shadow-sm">
              <Workflow size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Trace Correlation</h4>
              <p className="text-on-surface-variant text-sm">
                Follow a single request across multiple microservices via
                Trace IDs.
              </p>
            </div>
          </div>

          {/* Feature 4: Performance */}
          <div className="md:col-span-2 card p-10 border-outline-variant/40 flex flex-col justify-between group hover:border-primary/20 transition-colors">
            <div className="h-12 w-12 bg-surface-container rounded-xl flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
              <History size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Historical Search</h4>
              <p className="text-on-surface-variant text-sm">
                Powered by ClickHouse for sub-second queries across millions
                of old logs.
              </p>
            </div>
          </div>

          {/* Feature 5: Security */}
          <div className="md:col-span-2 card p-10 border-outline-variant/40 flex flex-col justify-between bg-surface-container-highest group">
            <div className="h-12 w-12 bg-surface-container rounded-xl flex items-center justify-center text-primary mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Lock size={24} className="relative z-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">API Ingestion</h4>
              <p className="text-on-surface-variant text-sm">
                Secure your telemetry pipeline with encrypted, revocable API
                keys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
