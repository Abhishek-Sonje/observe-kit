import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  userId: string | null;
}

export function HeroSection({ userId }: HeroSectionProps) {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(24,30,52,0.03)_0%,transparent_60%)]" />

      <div className="max-w-[1000px] mx-auto z-10">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-primary text-on-primary text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Activity size={12} />
          Operational Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-semibold leading-[0.95] tracking-tight text-on-surface mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          High Precision <br />
          <span className="text-primary italic">Observability</span> <br />
          for Modern Systems.
        </h1>

        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          The open-source observability platform that collects, traces, and
          visualizes your logs instantly. Engineered with ClickHouse and Redis
          for high-throughput environments.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href={userId ? "/dashboard" : "/sign-up"}>
            <Button
              size="lg"
              className="h-16 px-12 text-lg rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[6px_6px_0px_0px_var(--primary-container)] active:translate-x-0 active:translate-y-0 active:shadow-none bg-primary text-on-primary"
            >
              {userId ? "Go to Dashboard" : "Start for free"}{" "}
              <ArrowRight className="ml-3" size={20} />
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              variant="secondary"
              size="lg"
              className="h-16 px-8 text-lg rounded-none border-2 border-primary hover:bg-primary/5 transition-colors text-on-surface bg-transparent"
            >
              Explore Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* HERO IMAGE: Replaced CSS Mockup with actual image placeholder as requested */}
      <div className="mt-24 w-full max-w-[1200px] mx-auto px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        <div className="relative rounded-2xl border border-white/10 bg-[#0a0d1a] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-transparent blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Window Header */}
            <div className="h-12 border-b border-white/10 bg-[#161925]/80 backdrop-blur-md flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
              </div>
              <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 tracking-tight">
                observekit.com/logs/production
              </div>
              <div className="w-16" />
            </div>

            {/* Body */}
            <div className="flex h-[440px]">
              {/* Sidebar */}
              <div className="hidden md:block w-64 border-r border-white/10 p-6 bg-[#161925]/40">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
                  System Nodes
                </div>
                <div className="space-y-1.5 font-sans">
                  <div className="px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-xs font-medium flex items-center justify-between shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]">
                    auth-cluster-01 <Activity size={12} className="animate-pulse" />
                  </div>
                  <div className="px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg text-xs transition-colors cursor-pointer">
                    payment-gateway-v2
                  </div>
                  <div className="px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg text-xs transition-colors cursor-pointer">
                    analytics-worker
                  </div>
                  <div className="px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg text-xs transition-colors cursor-pointer">
                    db-sharded-master
                  </div>
                </div>
                
                <div className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                  Health Index
                </div>
                <div className="space-y-4">
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[42%] rounded-full shadow-[0_0_10px_rgba(10,185,129,0.5)]" />
                   </div>
                </div>
              </div>

              {/* Logs Area */}
              <div className="flex-1 flex flex-col bg-[#0a0d1a]/80">
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-medium">
                      Live Stream
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                      V4.2.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/80">
                      System Healthy
                    </span>
                  </div>
                </div>

                <div className="flex-1 font-mono text-[12px] overflow-hidden p-4">
                  <div className="space-y-1">
                    {[
                      { t: "14:27:58.001", l: "ERROR", s: "auth-svc", m: "Database connection refused at 10.0.4.12", c: "text-red-400" },
                      { t: "14:27:57.842", l: "WARN ", s: "auth-svc", m: "High memory pressure detected (88%)", c: "text-amber-400" },
                      { t: "14:27:57.120", l: "INFO ", s: "pay-api ", m: "Transaction verified: txn_882x192", c: "text-indigo-400" },
                      { t: "14:27:56.994", l: "INFO ", s: "auth-svc", m: "JWT validation successful for uid:992", c: "text-indigo-400" },
                      { t: "14:27:56.451", l: "DEBUG", s: "core-rt ", m: "Garbage collection cycle completed (14ms)", c: "text-white/30" },
                      { t: "14:27:56.002", l: "INFO ", s: "gateway ", m: "Request proxied to auth-service /v1/login", c: "text-emerald-400" },
                    ].map((log, i) => (
                      <div
                        key={i}
                        className="group flex gap-4 px-4 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5"
                      >
                        <span className="w-24 text-white/20 text-[10px] mt-0.5">{log.t}</span>
                        <span className={`w-14 text-[9px] font-bold ${log.c} opacity-80`}>
                          {log.l}
                        </span>
                        <span className="w-20 text-white/50 truncate font-medium">{log.s}</span>
                        <span className="flex-1 text-white/70 truncate">{log.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
