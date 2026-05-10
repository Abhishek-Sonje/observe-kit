import Link from "next/link";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-outline-variant/30 px-6 py-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Layers size={18} />
            </div>
            <span className="font-heading font-bold text-xl text-on-surface">ObserveKit</span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
            The high-fidelity observability platform for mission-critical
            systems. Built with Next.js, Redis, BullMQ, and ClickHouse for
            unmatched performance.
          </p>
        </div>

        <div className="md:col-span-2 md:col-start-8">
          <h5 className="font-bold text-sm mb-6 text-on-surface">Platform</h5>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li>
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/logs" className="hover:text-primary transition-colors">
                Log Explorer
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-primary transition-colors">
                API Keys
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="font-bold text-sm mb-6 text-on-surface">Connect</h5>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li>
              <a
                href="https://github.com/Abhishek-Sonje/observe-kit"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <Link href="/demo" className="hover:text-primary transition-colors">
                Interactive Demo
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:text-primary transition-colors">
                System Docs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-on-surface-variant/60">
        <p>© {new Date().getFullYear()} ObserveKit. All rights reserved.</p>
        <div className="flex items-center gap-2 text-success">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          Infrastructure Online
        </div>
      </div>
    </footer>
  );
}
