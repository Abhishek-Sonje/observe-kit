"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ObserveKit Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="card max-w-md w-full p-8 text-center flex flex-col items-center shadow-xl">
        <div className="h-16 w-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6 shadow-inner">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-heading font-semibold mb-3 tracking-tight">System Error</h2>
        <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
          An unexpected error occurred. This could be a network issue or an unresponsive service. Please try again.
        </p>
        
        <div className="flex gap-4 w-full">
          <Link href="/" className="flex-1">
            <Button variant="secondary" className="w-full gap-2 font-bold uppercase tracking-widest text-xs">
              <Home size={16} /> Home
            </Button>
          </Link>
          <Button 
            className="flex-1 gap-2 font-bold uppercase tracking-widest text-xs" 
            onClick={() => reset()}
          >
            <RefreshCcw size={16} /> Retry
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-surface-container-low rounded-xl w-full text-left overflow-hidden">
           <p className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest mb-2">Error Details</p>
           <code className="text-xs text-error font-mono break-all line-clamp-3">
             {error.message || "Unknown Application Error"}
           </code>
        </div>
      </div>
    </div>
  );
}
