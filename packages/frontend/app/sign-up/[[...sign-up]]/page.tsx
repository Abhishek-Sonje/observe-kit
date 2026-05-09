import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Layers } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f8] p-6 texture-noise">
      <Link href="/" className="flex items-center gap-3 mb-12 group">
        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform">
          <Layers size={22} />
        </div>
        <span className="font-heading font-bold text-2xl tracking-tight">ObserveKit</span>
      </Link>
      
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-2xl shadow-black/5 border border-outline-variant/30 rounded-[32px] p-10 bg-white",
              headerTitle: "font-heading font-bold text-3xl tracking-tight text-on-surface",
              headerSubtitle: "text-on-surface-variant font-medium",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest h-12 rounded-xl transition-all",
              socialButtonsBlockButton: "border-outline-variant/30 hover:bg-surface-container-low rounded-xl h-12 transition-all",
              footerActionLink: "text-primary font-bold hover:text-primary/70",
              formFieldInput: "h-12 rounded-xl border-outline-variant/30 focus:border-primary transition-all",
              formFieldLabel: "text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2"
            }
          }}
        />
      </div>
    </div>
  );
}
