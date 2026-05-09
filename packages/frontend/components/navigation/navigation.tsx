"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navigation() {
  const { isSignedIn } = useUser();

  return (
    <nav className="h-20 border-b border-outline-variant bg-white/70 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 px-10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform">
          <Layers size={22} />
        </div>
        <span className="font-heading font-bold text-2xl tracking-tight text-on-surface">ObserveKit</span>
      </Link>

      <div className="flex items-center gap-8">
        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button className="text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                Sign In
              </button>
            </SignInButton>
            <Link href="/sign-up">
              <Button size="md" className="h-11 px-8 rounded-none font-bold uppercase tracking-widest">
                Deploy Now
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button size="md" className="h-11 px-8 rounded-none font-bold uppercase tracking-widest">
              Enter Workspace
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}