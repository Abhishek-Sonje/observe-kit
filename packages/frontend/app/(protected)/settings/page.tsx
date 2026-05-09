"use client";

import React, { useState } from "react";
import { ApiKeyManager } from "@/components/settings/ApiKeyManager";
import { UserProfile } from "@clerk/nextjs";
import { User, ShieldCheck, Activity, Bell } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "keys" | "notifications">("keys");

  const tabs = [
    { id: "keys", name: "Security Keys", icon: ShieldCheck },
    { id: "profile", name: "User Profile", icon: User },
    { id: "notifications", name: "Alert Rules", icon: Bell },
  ] as const;

  return (
    <div className="px-10 py-12 max-w-6xl">
      <header className="mb-20">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={14} className="text-primary" />
          <p className="text-label-caps text-on-surface-variant/60">Preferences</p>
        </div>
        <h1 className="text-5xl font-heading font-semibold tracking-tight mb-4">Workspace Settings</h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed font-medium">
          Manage your identity, secure access tokens, and platform notification preferences from a centralized control panel.
        </p>
      </header>

      {/* TAB NAVIGATION */}
      <div className="flex gap-12 border-b border-outline-variant/30 mb-16 overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 pb-6 text-sm font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? "text-primary" : "text-on-surface-variant/40 hover:text-on-surface-variant"
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-4px_10px_rgba(24,30,52,0.2)]" />
            )}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {activeTab === "keys" && <ApiKeyManager />}
        
        {activeTab === "profile" && (
          <div className="card overflow-hidden bg-white border-outline-variant/20 shadow-sm rounded-[32px]">
            <UserProfile 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none p-10 bg-transparent",
                  navbar: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  scrollBox: "p-0",
                  pageScrollBox: "p-0",
                }
              }}
            />
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="p-32 border-2 border-dashed border-outline-variant/30 rounded-[40px] text-center bg-surface-container-low/20">
            <div className="h-16 w-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/20 mx-auto mb-6">
              <Bell size={32} />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-2">Notification Rules</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              Define how and when you want to be notified about system anomalies and incident reports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}