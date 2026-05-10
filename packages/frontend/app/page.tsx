import { auth } from "@clerk/nextjs/server";
import Navigation from "@/components/navigation/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoGridSection } from "@/components/landing/bento-grid";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/10 selection:text-primary texture-noise">
      <Navigation />
      
      <main className="flex-1">
        <HeroSection userId={userId} />
        <BentoGridSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
