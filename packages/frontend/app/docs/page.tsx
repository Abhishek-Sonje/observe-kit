import React from "react";
import Navigation from "@/components/navigation/navigation";
import { 
  BookOpen, 
  Terminal, 
  Zap, 
  Activity, 
  Shield, 
  Code, 
  Cpu, 
  Globe, 
  Key, 
  AlertTriangle,
  ChevronRight,
  Info
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f8] selection:bg-primary/10 selection:text-primary texture-noise">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-40 px-6">
        <div className="max-w-[900px] mx-auto">
          {/* HEADER */}
          <header className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/5 rounded-lg">
                <BookOpen size={16} className="text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">
                Documentation
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-semibold tracking-tight mb-8 text-on-surface">
              ObserveKit <span className="text-primary/40">V1.0</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl font-medium">
              A high-fidelity, self-hostable observability platform engineered for developers who demand precision without the enterprise price tag.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-24">
            {/* INTRODUCTION */}
            <section id="introduction">
              <div className="flex items-center gap-3 mb-6">
                <Info size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">What is ObserveKit?</h2>
              </div>
              <div className="prose prose-slate max-w-none text-on-surface-variant leading-relaxed text-lg">
                <p>
                  ObserveKit is an open-source alternative to centralized observability platforms. It combines 
                  <strong> ClickHouse</strong> for high-throughput log storage and <strong>Redis</strong> for real-time 
                  streaming to give you distributed tracing, log aggregation, and SLO alerting in a single, lightweight engine.
                </p>
              </div>
            </section>

            {/* GETTING STARTED */}
            <section id="getting-started" className="space-y-12">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">Getting Started</h2>
              </div>
              
              <div className="space-y-12 pl-4 border-l border-primary/10">
                {[
                  { step: "1", title: "Create an account", desc: "Sign up at observekit.com via Google or Email to initialize your workspace." },
                  { step: "2", title: "Generate an API key", desc: "Navigate to Settings → API Keys. This token is required for all log ingestion requests." },
                  { step: "3", title: "Verify connection", desc: "Send a test payload to ensure your ingestion pipeline is active." },
                ].map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-[#faf9f8]" />
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                      <span className="text-primary/20 font-mono text-sm">0{s.step}</span>
                      {s.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* CURL EXAMPLE */}
              <div className="card bg-[#0a0d1a] border-none shadow-2xl p-8 overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                    <div className="h-2 w-2 rounded-full bg-white/10" />
                  </div>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">bash / curl</span>
                </div>
                <pre className="text-sm font-mono text-indigo-300 leading-relaxed overflow-x-auto">
{`curl -X POST https://api.observekit.com/v1/logs \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ApiKey YOUR_API_KEY" \\
  -d '[{
    "message": "User login success",
    "level": "info",
    "service_name": "auth-service",
    "version": "1.0.0",
    "trace_id": "abc_123"
  }]'`}
                </pre>
              </div>
            </section>

            {/* LOG OBJECT SCHEMA */}
            <section id="schema">
              <div className="flex items-center gap-3 mb-8">
                <Shield size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">Log Object Schema</h2>
              </div>
              <div className="overflow-hidden border border-outline-variant/50 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30">
                      <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-on-surface-variant/60">Field</th>
                      <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-on-surface-variant/60">Type</th>
                      <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-on-surface-variant/60">Req</th>
                      <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-on-surface-variant/60">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 font-mono text-[13px]">
                    {[
                      ["message", "string", "✅", "The core log message content"],
                      ["level", "enum", "✅", "info | warn | error | debug"],
                      ["service_name", "string", "✅", "Identifier for the emitting service"],
                      ["version", "string", "✅", "Semantic version of the service"],
                      ["trace_id", "string", "❌", "Unique ID linking request lifecycle"],
                      ["timestamp", "number", "❌", "Unix ms timestamp (default: now)"],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-primary/[0.01] transition-colors">
                        <td className="px-6 py-4 font-bold text-primary">{row[0]}</td>
                        <td className="px-6 py-4 text-on-surface-variant/60">{row[1]}</td>
                        <td className="px-6 py-4">{row[2]}</td>
                        <td className="px-6 py-4 text-on-surface-variant font-sans">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SDK EXAMPLES */}
            <section id="sdks" className="space-y-12">
              <div className="flex items-center gap-3 mb-2">
                <Code size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">SDK Implementation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NODE JS */}
                <div className="card p-8 bg-white border-outline-variant/40 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <Cpu size={18} />
                    </div>
                    <h3 className="font-bold text-lg">Node.js / TS</h3>
                  </div>
                  <pre className="text-[11px] font-mono text-on-surface-variant bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 overflow-x-auto flex-1">
{`async function log(lvl, msg, tid) {
  await fetch('https://api.observekit.com/v1/logs', {
    method: 'POST',
    headers: { 'Authorization': 'ApiKey ...' },
    body: JSON.stringify([{
      message: msg,
      level: lvl,
      service_name: 'api-svc',
      trace_id: tid
    }])
  })
}`}
                  </pre>
                </div>

                {/* PYTHON */}
                <div className="card p-8 bg-white border-outline-variant/40 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                      <Globe size={18} />
                    </div>
                    <h3 className="font-bold text-lg">Python 3.x</h3>
                  </div>
                  <pre className="text-[11px] font-mono text-on-surface-variant bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 overflow-x-auto flex-1">
{`import requests

def log(lvl, msg, tid=None):
    requests.post(
        'https://api.observekit.com/v1/logs',
        headers={'Authorization': 'ApiKey ...'},
        json=[{
            'message': msg,
            'level': lvl,
            'service_name': 'worker-svc',
            'trace_id': tid
        }]
    )`}
                  </pre>
                </div>
              </div>
            </section>

            {/* TRACE CORRELATION */}
            <section id="traces">
              <div className="flex items-center gap-3 mb-8">
                <Activity size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">Trace Correlation</h2>
              </div>
              <div className="prose prose-slate max-w-none text-on-surface-variant text-lg leading-relaxed mb-8">
                <p>
                  ObserveKit uses <strong>Trace Propagation</strong> to link logs across microservices. By attaching a 
                  <code>trace_id</code> to every log in a request's lifecycle, you can visualize the entire 
                  transaction journey in the Log Explorer.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px]">
                <div className="p-6 bg-primary/[0.02] border border-primary/10 rounded-2xl">
                  <span className="block mb-4 text-primary font-bold">1. ORIGIN</span>
                  <p className="text-on-surface-variant/60">Generate trace_id at API Gateway</p>
                </div>
                <div className="p-6 bg-primary/[0.02] border border-primary/10 rounded-2xl">
                  <span className="block mb-4 text-primary font-bold">2. PROPAGATE</span>
                  <p className="text-on-surface-variant/60">Pass ID via HTTP headers to downstream services</p>
                </div>
                <div className="p-6 bg-primary/[0.02] border border-primary/10 rounded-2xl">
                  <span className="block mb-4 text-primary font-bold">3. CORRELATE</span>
                  <p className="text-on-surface-variant/60">Include ID in every service log call</p>
                </div>
              </div>
            </section>

            {/* LIVE TAIL & ALERTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section id="live-tail">
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={20} className="text-primary" />
                  <h2 className="text-2xl font-heading font-semibold">Live Tail</h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  Leveraging Server-Sent Events (SSE), ObserveKit streams logs to your browser with sub-50ms latency. Enable "Live" mode in the Explorer to watch your infrastructure heartbeat in real time.
                </p>
              </section>

              <section id="alerts">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle size={20} className="text-primary" />
                  <h2 className="text-2xl font-heading font-semibold">SLO Alerts</h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  ObserveKit automatically calculates error rates per service. If a service exceeds a 5% error threshold over a 1-hour window, an alert is triggered via your configured Slack Webhook.
                </p>
              </section>
            </div>

            {/* API REFERENCE */}
            <section id="api-reference">
              <div className="flex items-center gap-3 mb-8">
                <Key size={20} className="text-primary" />
                <h2 className="text-3xl font-heading font-semibold">API Reference</h2>
              </div>
              <div className="space-y-4">
                {[
                  { m: "POST", p: "/v1/logs", d: "Ingest batch telemetry" },
                  { m: "GET", p: "/v1/logs", d: "Query log history" },
                  { m: "GET", p: "/v1/logs/trace/:id", d: "Fetch logs for trace" },
                  { m: "GET", p: "/v1/services", d: "List active services" },
                  { m: "GET", p: "/v1/logs/stream", d: "SSE Log Stream" },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white border border-outline-variant/30 rounded-2xl group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${api.m === 'POST' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/5 text-primary'}`}>
                        {api.m}
                      </span>
                      <code className="text-sm font-mono text-on-surface">{api.p}</code>
                    </div>
                    <span className="text-xs text-on-surface-variant/60">{api.d}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SELF HOSTING */}
            <section id="self-hosting" className="bg-primary p-12 rounded-[2rem] text-on-primary shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <Cpu size={32} />
                <h2 className="text-4xl font-heading text-white font-semibold tracking-tight">Self Hosting</h2>
              </div>
              <p className="text-primary-fixed-dim/80 text-lg mb-10 max-w-xl leading-relaxed">
                Run ObserveKit on your own hardware using Docker Compose. Perfect for air-gapped environments or compliance-heavy industries.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 font-mono text-sm leading-relaxed overflow-x-auto">
{`git clone https://github.com/Abhishek-Sonje/observe-kit
cd observe-kit
cp .env.example .env
docker compose up -d`}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
