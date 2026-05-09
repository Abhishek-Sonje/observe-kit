import React from "react";
import Navigation from "@/components/navigation/navigation";
import { BookOpen, Code, Terminal, CheckCircle2 } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f8] selection:bg-primary/10 selection:text-primary texture-noise">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-40 px-6">
        <div className="max-w-[800px] mx-auto">
          <header className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">
                Documentation
              </span>
            </div>
            <h1 className="text-5xl font-heading font-semibold tracking-tight mb-6">
              Quickstart Guide
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Integrate ObserveKit into your application in under two minutes using our REST API. No heavy SDKs required.
            </p>
          </header>

          <section className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-2xl font-heading font-semibold">Generate an API Key</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-4 pl-12">
                Navigate to your <a href="/settings" className="text-primary underline decoration-primary/30 underline-offset-4">Settings</a> dashboard and create a new ingestion token. Keep this key secure, as it provides write-access to your telemetry pipeline.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-2xl font-heading font-semibold">Send Telemetry</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-6 pl-12">
                Use the standard <code>fetch</code> API to stream logs from any runtime (Node.js, edge workers, browsers). ObserveKit accepts batches of logs for high-throughput efficiency.
              </p>
              
              <div className="ml-12 card p-8 bg-[#1e1e2e] border-none shadow-xl shadow-black/5 relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={12} /> typescript
                </div>
                <pre className="text-[13px] font-mono text-white/80 leading-relaxed overflow-x-auto pt-4">
{`fetch('https://your-backend.onrender.com/v1/logs', {
  method: 'POST',
  headers: { 
    'Authorization': 'ApiKey sk_live_xxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([{
    message: 'User logged in successfully',
    level: 'info',
    service_name: 'auth-service',
    version: '1.0.0',
    trace_id: 'req_abc123'
  }])
});`}
                </pre>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(77,124,97,0.4)]">
                  <CheckCircle2 size={16} />
                </div>
                <h2 className="text-2xl font-heading font-semibold">Verify Ingestion</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed pl-12">
                Once the payload is successfully transmitted, navigate to the <a href="/logs" className="text-primary underline decoration-primary/30 underline-offset-4">Explorer</a>. If you have "Live Tail" enabled, your logs will appear instantly.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
