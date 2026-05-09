import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
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
  Box,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * HOME PAGE REDESIGN
 * Aesthetic: Refined Industrial Editorial & Modern DevTool
 * Philosophy: Bold intentionality, technical precision, perfectly centered hierarchy.
 */

export default async function Home() {
  const { userId } = await auth();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f8] selection:bg-primary/10 selection:text-primary texture-noise">
      <Navigation />
      
      <main className="flex-1">
        {/* HERO SECTION: CENTERED LAYOUT */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
          {/* Background Textures */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(24,30,52,0.03)_0%,transparent_60%)]" />
          
          <div className="max-w-[900px] mx-auto z-10">
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
              The open-source observability platform that collects, traces, and visualizes your logs instantly. Engineered for high-throughput environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link href={userId ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="h-16 px-12 text-lg rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[6px_6px_0px_0px_var(--primary-container)] active:translate-x-0 active:translate-y-0 active:shadow-none bg-primary text-on-primary">
                  {userId ? "Go to Dashboard" : "Start for free"} <ArrowRight className="ml-3" size={20} />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="secondary" size="lg" className="h-16 px-8 text-lg rounded-none border-2 border-primary hover:bg-primary/5 transition-colors text-on-surface bg-transparent">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* PROOF MOCKUP SECTION */}
        <section className="px-6 pb-40 relative z-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl border border-outline-variant/30 bg-[#0f111a] shadow-[0_20px_60px_-15px_rgba(24,30,52,0.3)] overflow-hidden">
              {/* Window Header */}
              <div className="h-12 border-b border-white/10 bg-[#161925] flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md text-[10px] font-mono text-white/50">
                  <Lock size={10} /> observekit.com/logs
                </div>
                <div className="w-16" /> {/* Spacer for centering */}
              </div>
              
              {/* Fake Log Explorer Content */}
              <div className="p-0 flex h-[400px]">
                <div className="hidden md:block w-64 border-r border-white/10 p-6 bg-[#161925]/50">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Services</div>
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-white/10 rounded border border-white/10 text-xs font-mono text-white flex justify-between"><span className="text-primary-fixed-dim">auth-service</span> <Activity size={12}/></div>
                    <div className="px-3 py-2 rounded text-xs font-mono text-white/50 hover:bg-white/5 flex justify-between">payment-api </div>
                    <div className="px-3 py-2 rounded text-xs font-mono text-white/50 hover:bg-white/5 flex justify-between">inventory-worker </div>
                  </div>
                </div>
                <div className="flex-1 bg-[#0f111a] overflow-hidden flex flex-col">
                  <div className="h-14 border-b border-white/10 flex items-center px-6 justify-between">
                    <div className="text-white font-heading font-medium">Live Telemetry</div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Live Tail Active</span>
                    </div>
                  </div>
                  <div className="flex-1 p-0 overflow-hidden font-mono text-[13px]">
                    {/* Log Row 1 */}
                    <div className="flex gap-4 py-3 px-6 border-b border-white/5 hover:bg-white/5 group items-center">
                      <span className="text-white/40 w-20">10:42:01</span>
                      <span className="text-[#ff5f56] bg-[#ff5f56]/10 px-2 py-0.5 rounded text-[10px] w-14 text-center">ERROR</span>
                      <span className="text-primary-fixed-dim w-24 truncate">auth-service</span>
                      <span className="text-white flex-1 truncate">Failed to connect to primary database cluster.</span>
                      <span className="text-white/30 text-[10px] bg-white/5 px-2 py-1 rounded">req_a8f921</span>
                    </div>
                    {/* Log Row 2 */}
                    <div className="flex gap-4 py-3 px-6 border-b border-white/5 hover:bg-white/5 group items-center">
                      <span className="text-white/40 w-20">10:42:00</span>
                      <span className="text-[#ffbd2e] bg-[#ffbd2e]/10 px-2 py-0.5 rounded text-[10px] w-14 text-center">WARN</span>
                      <span className="text-primary-fixed-dim w-24 truncate">auth-service</span>
                      <span className="text-white/80 flex-1 truncate">High latency detected on Redis cache layer (&gt;200ms)</span>
                      <span className="text-white/30 text-[10px] bg-white/5 px-2 py-1 rounded">req_a8f921</span>
                    </div>
                    {/* Log Row 3 */}
                    <div className="flex gap-4 py-3 px-6 border-b border-white/5 hover:bg-white/5 group items-center">
                      <span className="text-white/40 w-20">10:41:55</span>
                      <span className="text-white/70 border border-white/10 px-2 py-0.5 rounded text-[10px] w-14 text-center">INFO</span>
                      <span className="text-[#c5c7c8] w-24 truncate">payment-api</span>
                      <span className="text-white/80 flex-1 truncate">Stripe webhook received and signature validated.</span>
                      <span className="text-white/30 text-[10px] bg-white/5 px-2 py-1 rounded">req_b3x771</span>
                    </div>
                    {/* Log Row 4 */}
                    <div className="flex gap-4 py-3 px-6 border-b border-white/5 hover:bg-white/5 group items-center">
                      <span className="text-white/40 w-20">10:41:52</span>
                      <span className="text-white/70 border border-white/10 px-2 py-0.5 rounded text-[10px] w-14 text-center">INFO</span>
                      <span className="text-primary-fixed-dim w-24 truncate">auth-service</span>
                      <span className="text-white/80 flex-1 truncate">User successfully authenticated via Google OAuth.</span>
                      <span className="text-white/30 text-[10px] bg-white/5 px-2 py-1 rounded">req_c9p002</span>
                    </div>
                     {/* Log Row 5 */}
                     <div className="flex gap-4 py-3 px-6 border-b border-white/5 hover:bg-white/5 group items-center opacity-50">
                      <span className="text-white/40 w-20">10:41:40</span>
                      <span className="text-white/70 border border-white/10 px-2 py-0.5 rounded text-[10px] w-14 text-center">INFO</span>
                      <span className="text-[#c5c7c8] w-24 truncate">inventory-wrk</span>
                      <span className="text-white/80 flex-1 truncate">Cron job 'stock-sync' completed successfully.</span>
                      <span className="text-white/30 text-[10px] bg-white/5 px-2 py-1 rounded">—</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PLATFORM DESCRIPTION: EDITORIAL LAYOUT */}
        <section className="px-6 py-32 border-y border-outline-variant bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-12 gap-20 items-center">
              <div className="col-span-12 lg:col-span-6">
                <span className="text-label-caps text-primary mb-6 block">The Ingestion Engine</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-[1.05] mb-10 tracking-tight">
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
                {/* Async Pipeline Card */}
                <div className="card p-10 flex flex-col justify-between aspect-[4/5] bg-surface-container-lowest group overflow-hidden relative border-outline-variant/30 shadow-sm">
                  <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <FastForward size={160} />
                  </div>
                  <div className="h-14 w-14 bg-surface-container rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-semibold mb-4 tracking-tight">Async Pipeline</h4>
                    <p className="text-sm text-on-surface-variant/80 leading-relaxed">Distributed worker architecture prevents telemetry blocking on main threads.</p>
                  </div>
                </div>
                
                {/* ClickHouse Card (Redesigned for contrast) */}
                <div className="card p-10 flex flex-col justify-between aspect-[4/5] bg-surface-container-low sm:mt-12 group overflow-hidden relative border-outline-variant/30 shadow-sm">
                  <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <Box size={160} />
                  </div>
                  <div className="h-14 w-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Database size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-semibold mb-4 tracking-tight text-on-surface">ClickHouse Storage</h4>
                    <p className="text-sm text-on-surface-variant/80 leading-relaxed">High-performance columnar storage optimized for real-time telemetry streaming.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM FLOW VISUALIZATION */}
        <section className="px-6 py-40 bg-[#faf9f8] relative border-b border-outline-variant/30">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-label-caps text-primary/60 tracking-[0.3em] mb-4 block">End-to-End Tracing</span>
                <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight">The Lifecycle of a Log.</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "SDK Collection", desc: "Lightweight agents capture application context.", icon: Code, step: "01" },
                { title: "Secure Ingest", desc: "API key validation and secure transit.", icon: Lock, step: "02" },
                { title: "Queue & Buffer", desc: "Asynchronous processing with Redis.", icon: Workflow, step: "03" },
                { title: "Trace Analysis", desc: "Real-time visualization in the UI.", icon: Activity, step: "04" },
              ].map((item, i) => (
                <div key={i} className="card-glass p-10 rounded-[32px] group hover:bg-white transition-all duration-500 border border-outline-variant/20 shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-12">
                    <div className="h-12 w-12 bg-surface-container text-primary flex items-center justify-center rounded-xl group-hover:rotate-12 transition-transform">
                      <item.icon size={22} />
                    </div>
                    {/* Fixed opacity for visibility */}
                    <span className="text-4xl font-heading font-bold text-primary/20">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-heading font-bold mb-4 text-on-surface">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODERNIZED CTA - High Contrast, Clean */}
        <section className="px-6 py-40 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-[#181e34] rounded-[32px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
              {/* Subtle radial glow instead of complex borders */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,225,251,0.08)_0%,transparent_70%)]" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-8 tracking-tight font-heading font-semibold">
                  Scale your Visibility, <br className="hidden md:block" />
                  not your Complexity.
                </h2>
                <p className="text-white/90 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
                  Deploy the ultimate open-source observability engine to your infrastructure today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link href={userId ? "/dashboard" : "/sign-up"}>
                    <Button size="lg" className="h-16 px-12 bg-white text-primary border-none rounded-xl text-lg font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-white/20 active:scale-95">
                      {userId ? "Go to Dashboard" : "Join ObserveKit"}
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="secondary" size="lg" className="h-16 px-8 text-lg rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all backdrop-blur-md">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: REFINED & REALISTIC */}
      <footer className="px-6 py-20 bg-[#faf9f8] border-t border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-6">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform shadow-sm">
                <Layers size={22} />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-on-surface">ObserveKit</span>
            </Link>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed mb-8">
              The high-fidelity observability platform for mission-critical systems. Built with Next.js, Redis, and ClickHouse.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Abhishek-Sonje/observe-kit" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors border border-outline-variant/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                GitHub
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-end">
            <div>
              <h4 className="text-label-caps text-on-surface-variant/50 mb-6">Platform</h4>
              <ul className="space-y-4 text-sm font-semibold text-on-surface">
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Workspace</Link></li>
                <li><Link href="/logs" className="hover:text-primary transition-colors">Telemetry Viewer</Link></li>
                <li><Link href="/trace" className="hover:text-primary transition-colors">Distributed Tracing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-label-caps text-on-surface-variant/50 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm font-semibold text-on-surface">
                <li><Link href="/demo" className="hover:text-primary transition-colors">Live Demo</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto mt-20 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-on-surface-variant/50 font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} ObserveKit. MIT Licensed.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-success">Systems Nominal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}