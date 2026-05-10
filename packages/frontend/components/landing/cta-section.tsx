import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative px-6 py-40 overflow-hidden bg-[#0a0d1a]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,81,181,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="relative max-w-[1000px] mx-auto z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
          <Terminal size={24} className="text-indigo-400" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-heading font-semibold mb-6 tracking-tight">
          <span className="text-white drop-shadow-md">Ready to ship</span> <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 drop-shadow-sm">
            more reliable code?
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Join thousands of developers building scalable systems with ObserveKit.
          Get deep visibility into your infrastructure in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/sign-up"
            className="inline-flex items-center justify-center h-16 px-10 bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_var(--color-indigo-500)] rounded-xl font-bold border-none"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/docs"
            className="inline-flex items-center justify-center h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-xl font-bold bg-white/5 backdrop-blur-sm"
          >
            Read Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
