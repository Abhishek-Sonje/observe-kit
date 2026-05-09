import Link from "next/link";
import Navigation from "@/components/navigation/navigation";
import { 
  ArrowRight, 
  Terminal, 
  Shield, 
  Zap, 
  Layers, 
  Cpu, 
  Database, 
  Activity,
  Code,
  Lock,
  Workflow,
  LineChart,
  Globe,
  FastForward,
  Box
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * HOME PAGE REDESIGN
 * Aesthetic: Refined Industrial Editorial
 * Philosophy: Bold intentionality, technical precision, and rhythmic asymmetry.
 */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f8] selection:bg-primary/10 selection:text-primary texture-noise">
      <Navigation />
      
      <main className="flex-1">
        {/* HERO SECTION: ARCHITECTURAL LAYOUT */}
        <section className="relative pt-32 pb-40 px-6 overflow-hidden">
          {/* Background Textures */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(24,30,52,0.05)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left: Bold Typography */}
              <div className="col-span-12 lg:col-span-8">
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-primary text-on-primary text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
                  <Activity size={12} />
                  Operational Intelligence
                </div>
                
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-heading font-semibold leading-[0.9] tracking-[-0.04em] text-on-surface mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                  High Precision <br />
                  <span className="text-primary italic">Observability</span> <br />
                  for Modern Systems.
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                  <Link href="/sign-up">
                    <Button size="lg" className="h-16 px-12 text-lg rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[6px_6px_0px_0px_var(--primary-container)] active:translate-x-0 active:translate-y-0 active:shadow-none">
                      Get Started <ArrowRight className="ml-3" size={20} />
                    </Button>
                  </Link>
                  <div className="flex flex-col gap-2 border-l-2 border-outline-variant pl-6">
                    <p className="text-sm text-on-surface-variant max-w-xs font-medium leading-relaxed">
                      Collect, monitor, and analyze application logs with surgical efficiency.
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary/40 uppercase tracking-widest">
                        <Cpu size={12} /> Redis
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary/40 uppercase tracking-widest">
                        <Database size={12} /> ClickHouse
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Technical Metadata / Abstract Visualization */}
              <div className="hidden lg:block lg:col-span-4 pt-20 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                <div className="card-glass p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Workflow size={120} />
                  </div>
                  
                  <h3 className="text-label-caps text-on-surface-variant/40 mb-8">System Architecture</h3>
                  <div className="space-y-6 relative z-10">
                    {[
                      { label: "Ingestion Pipeline", value: "Redis + BullMQ", icon: Zap },
                      { label: "OLAP Storage", value: "ClickHouse Cluster", icon: Database },
                      { label: "Identity", value: "Clerk Auth", icon: Lock },
                      { label: "Protocol", value: "HTTP/2 Streaming", icon: Globe },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-outline-variant/20 pb-4 last:border-0">
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className="text-primary" />
                          <span className="text-sm font-heading font-medium">{item.label}</span>
                        </div>
                        <span className="text-[11px] font-mono text-on-surface-variant/60">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 h-32 w-full flex items-end gap-1.5 px-2">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-primary/20 rounded-t-sm animate-pulse" 
                        style={{ 
                          height: `${15 + Math.random() * 85}%`,
                          animationDelay: `${i * 100}ms`
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PLATFORM DESCRIPTION: EDITORIAL LAYOUT */}
        <section className="px-6 py-48 border-y border-outline-variant bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-12 gap-20 items-center">
              <div className="col-span-12 lg:col-span-6">
                <span className="text-label-caps text-primary mb-6 block">The Ingestion Engine</span>
                <h2 className="text-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] mb-10 tracking-tight">
                  Scalable. Secure. <br /><span className="italic text-on-surface-variant">Uncompromising.</span>
                </h2>
                <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed font-medium">
                  <p>
                    ObserveKit is engineered for high-throughput environments. Applications send logs securely using unique API keys, ensuring every data point is verified and trace-linked.
                  </p>
                  <p>
                    Processed asynchronously via <span className="text-on-surface underline decoration-primary/20 underline-offset-4">Redis and BullMQ</span>, your logs are buffered and streamed into <span className="text-on-surface underline decoration-primary/20 underline-offset-4">ClickHouse</span> for sub-second querying across billions of rows.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card p-10 flex flex-col justify-between aspect-[4/5] bg-[#faf9f8] group overflow-hidden relative">
                  <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <FastForward size={160} />
                  </div>
                  <div className="h-14 w-14 bg-white shadow-sm border border-outline-variant/30 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-semibold mb-4 tracking-tight">Async Pipeline</h4>
                    <p className="text-sm text-on-surface-variant/80 leading-relaxed">Distributed worker architecture prevents telemetry blocking on main threads.</p>
                  </div>
                </div>
                
                <div className="card p-10 flex flex-col justify-between aspect-[4/5] bg-primary text-on-primary sm:mt-12 group overflow-hidden relative border-none">
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Box size={160} />
                  </div>
                  <div className="h-14 w-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white mb-8">
                    <Database size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-semibold mb-4 tracking-tight text-white">ClickHouse Storage</h4>
                    <p className="text-sm text-white/70 leading-relaxed">High-performance columnar storage optimized for real-time telemetry streaming.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM FLOW VISUALIZATION */}
        <section className="px-6 py-48 bg-[#faf9f8] relative">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <span className="text-label-caps text-primary/40 tracking-[0.3em] mb-4 block">End-to-End Tracing</span>
                <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight">The Lifecycle of a Log.</h2>
              </div>
              <Button variant="ghost" className="text-primary font-bold tracking-widest uppercase text-xs gap-2">
                Explore Architecture <ArrowRight size={14} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "SDK Collection", desc: "Lightweight agents capture application context.", icon: Code, step: "01" },
                { title: "Secure Ingest", desc: "API key validation and secure transit.", icon: Lock, step: "02" },
                { title: "Queue & Buffer", desc: "Asynchronous processing with Redis.", icon: Workflow, step: "03" },
                { title: "Trace Analysis", desc: "Real-time visualization in the UI.", icon: Activity, step: "04" },
              ].map((item, i) => (
                <div key={i} className="card-glass p-10 rounded-[32px] group hover:bg-white transition-all duration-500 border-none shadow-xl shadow-black/5">
                  <div className="flex justify-between items-start mb-12">
                    <div className="h-12 w-12 bg-primary text-white flex items-center justify-center rounded-xl group-hover:rotate-12 transition-transform">
                      <item.icon size={22} />
                    </div>
                    <span className="text-4xl font-heading font-bold text-primary/5">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-heading font-bold mb-4">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODERNIZED CTA */}
        <section className="px-6 pb-48">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-primary rounded-[40px] p-12 md:p-32 relative overflow-hidden text-center group">
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 -z-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180%] h-[180%] border-[1px] border-white/20 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[140%] border-[1px] border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-display text-white text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] mb-12 tracking-tighter">
                  Scale your <span className="italic text-white/50">Visibility</span>, <br />not your <span className="italic text-white/50">Complexity</span>.
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <Link href="/sign-up">
                    <Button variant="secondary" size="lg" className="h-16 px-12 bg-white text-primary border-none rounded-none text-lg font-bold hover:bg-white/95 transition-all hover:scale-105 active:scale-95">
                      Join ObserveKit
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 text-white/90 font-mono text-sm backdrop-blur-md hover:border-white/30 transition-all">
                    <Terminal size={18} />
                    <span>npm install @observe-kit/sdk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: REFINED MINIMALISM */}
      <footer className="px-6 py-24 bg-white border-t border-outline-variant">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-16 items-start">
          <div className="col-span-12 md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-10 group">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform">
                <Layers size={22} />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">ObserveKit</span>
            </Link>
            <p className="text-base text-on-surface-variant max-w-sm leading-relaxed mb-10">
              The high-fidelity observability platform for mission-critical systems. Processed with Redis, stored in ClickHouse.
            </p>
            <div className="flex gap-8 mb-12">
              {["Twitter", "GitHub", "Discord", "Changelog"].map(social => (
                <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary/60 transition-colors">{social}</a>
              ))}
            </div>
          </div>
          
          <div className="col-span-6 md:col-span-2">
            <h4 className="text-label-caps text-on-surface/30 mb-8">Platform</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Workspace</Link></li>
              <li><Link href="/logs" className="hover:text-primary transition-colors">Telemetry</Link></li>
              <li><Link href="/trace" className="hover:text-primary transition-colors">Tracing</Link></li>
              <li><Link href="/settings" className="hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h4 className="text-label-caps text-on-surface/30 mb-8">Resources</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Keys</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SDK Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3 md:text-right flex flex-col md:items-end justify-between self-stretch">
             <div className="flex items-center gap-4 p-4 border border-outline-variant/30 rounded-2xl bg-[#faf9f8]">
               <div className="h-3 w-3 bg-success rounded-full animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Systems All Nominal</span>
             </div>
             
             <p className="text-[10px] text-on-surface-variant/40 font-mono uppercase tracking-[0.3em] mt-20">
               © 2026 ObserveKit Engineering. <br />All systems active.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
