"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navigation() {
  const { isSignedIn } = useUser();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="max-w-[1200px] mx-auto h-16 border border-outline-variant bg-white/80 backdrop-blur-md px-8 flex items-center justify-between rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform shadow-md shadow-primary/20">
            <Layers size={18} strokeWidth={2.5} />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-on-surface">ObserveKit</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link href="/docs" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              Docs
            </Link>
            <Link href="/demo" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              Demo
            </Link>
            <a href="https://github.com/Abhishek-Sonje/observe-kit" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              GitHub
            </a>
          </div>

          <div className="h-6 w-px bg-outline-variant hidden md:block" />

          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <Link href="/sign-up">
                  <Button size="sm" className="h-9 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                    Join Free
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="sm" className="h-9 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}