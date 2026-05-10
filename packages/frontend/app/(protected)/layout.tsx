import Sidebar from "@/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background selection:bg-primary/10 selection:text-primary texture-noise">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
