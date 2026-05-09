"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Terminal, 
  Settings, 
  Layers,
  Activity,
  Server,
  Bell,
  BookOpen,
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorer", href: "/logs", icon: Terminal },
  { name: "Infrastructure", href: "/infrastructure", icon: Server },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="w-72 border-r border-outline-variant bg-surface-container-lowest flex flex-col h-screen sticky top-0">
      {/* BRANDING */}
      <div className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-on-primary group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
            <Layers size={20} />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-on-surface">ObserveKit</span>
        </Link>
      </div>


      {/* PRIMARY NAVIGATION */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-6 ml-4">Workspace</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${
                isActive
                  ? "bg-primary text-on-primary shadow-xl shadow-primary/10"
                  : "text-on-surface-variant/70 hover:bg-surface-container hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </div>
              {isActive && <ChevronRight size={14} className="opacity-40" />}
            </Link>
          );
        })}

        <div className="pt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-6 ml-4">Resources</p>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-on-surface-variant/70 hover:bg-surface-container hover:text-primary transition-all"
          >
            <BookOpen size={20} />
            Documentation
          </a>
        </div>
      </nav>

      {/* USER PROFILE & LOGOUT */}
      <div className="p-6 border-t border-outline-variant bg-surface-container-low/30">
        <div className="bg-white border border-outline-variant/30 rounded-3xl p-4 shadow-sm group hover:border-primary/20 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10 rounded-xl"
                }
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-on-surface truncate">
                {user?.firstName || "Operator"}
              </span>
              <span className="text-[10px] text-on-surface-variant/50 flex items-center gap-1 font-mono">
                <Activity size={8} className="text-success" /> System Admin
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link 
              href="/settings"
              className="flex items-center justify-center gap-2 py-2 bg-surface-container rounded-xl text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
            >
              <User size={12} />
              Profile
            </Link>
            <SignOutButton>
              <button className="flex items-center justify-center gap-2 py-2 bg-surface-container rounded-xl text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-error hover:text-on-error transition-all">
                <LogOut size={12} />
                Logout
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
