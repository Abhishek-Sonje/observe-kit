"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getApiKeys, createApiKey, revokeApiKey } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Key,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { ApiKey } from "@/types";

export function ApiKeyManager() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const authenticatedFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    const token = await getToken({ template: "backend" });
    return fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: keys, isLoading } = useQuery<ApiKey[]>({
    queryKey: ["api-keys"],
    queryFn: () => getApiKeys(authenticatedFetch),
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => createApiKey(name, authenticatedFetch),
    onSuccess: (data) => {
      if (data) {
        setCreatedKey(data.apiKey);
        setNewKeyName("");
        queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      }
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) => revokeApiKey(id, authenticatedFetch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* HEADER SECTION */}
      <section className="flex justify-between items-end">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">
              Security Protocols
            </span>
          </div>
          <h2 className="text-4xl font-heading font-semibold tracking-tight mb-4">
            Ingestion Tokens
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            API keys allow your applications to securely stream telemetry to
            ObserveKit. Treat these keys as sensitive credentials.
          </p>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Key identifier (e.g. Prod-API)"
              className="h-12 w-64 text-sm px-4"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <Button
            className="h-12 px-8 gap-2"
            onClick={() => createMutation.mutate(newKeyName)}
            disabled={!newKeyName || createMutation.isPending}
          >
            <Plus size={18} />
            Generate Key
          </Button>
        </div>
      </section>

      {/* CREATED KEY ALERT */}
      {createdKey && (
        <div className="p-10 bg-primary border border-primary/20 rounded-[40px] relative overflow-hidden animate-in fade-in scale-up duration-700 shadow-2xl shadow-primary/20">
          {/* Abstract background for the alert */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 border border-white rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border border-white rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="flex items-start gap-8 relative z-10">
            <div className="h-14 w-14 bg-white text-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-heading font-bold mb-3 text-white tracking-tight">
                New Ingestion Token
              </h4>
              <p className="text-base text-white/70 mb-8 leading-relaxed max-w-xl">
                This is your unique ingestion key. For your security,{" "}
                <span className="text-white font-bold underline decoration-white/30 underline-offset-4">
                  this is the only time
                </span>{" "}
                it will be displayed.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <code className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl text-white font-mono text-xl tracking-widest shadow-inner">
                    {createdKey}
                  </code>
                  <Button
                    variant="secondary"
                    className="h-auto px-8 bg-white text-primary border-none rounded-2xl font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
                    onClick={() => copyToClipboard(createdKey)}
                  >
                    {copied ? (
                      <CheckCircle2 size={20} className="text-success" />
                    ) : (
                      <Copy size={20} />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    Stored in encrypted ClickHouse cluster
                  </p>
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/10 px-6 rounded-xl text-xs font-bold uppercase tracking-widest"
                    onClick={() => setCreatedKey(null)}
                  >
                    I've secured this key
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* KEY LIST */}
      <div className="card overflow-hidden border-outline-variant/30 bg-white">
        <div className="bg-surface-container-low/50 border-b border-outline-variant px-8 py-6 flex justify-between items-center">
          <h3 className="text-label-caps text-on-surface-variant/60">
            Active Credentials
          </h3>
          <span className="text-[10px] font-mono text-on-surface-variant/40">
            {keys?.length || 0} Total
          </span>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {isLoading ? (
            <div className="p-20 text-center animate-pulse text-on-surface-variant/20 font-mono">
              RETRIEVING ENCRYPTED KEYS...
            </div>
          ) : keys?.length === 0 ? (
            <div className="p-24 text-center">
              <div className="h-16 w-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/20 mx-auto mb-6">
                <Key size={32} />
              </div>
              <p className="text-on-surface-variant font-medium">
                No active API keys found.
              </p>
            </div>
          ) : (
            keys?.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-8 hover:bg-surface-container-low/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Key size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {key.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-mono text-on-surface-variant/40 flex items-center gap-1.5">
                        <Calendar size={10} />
                        Issued {new Date(key.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] font-mono text-success/60 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                        <span className="h-1 w-1 bg-success rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-on-surface-variant/20 hover:text-error hover:bg-error/5 h-10 px-4 gap-2 opacity-0 group-hover:opacity-100 transition-all"
                  onClick={() => {
                    if (
                      confirm(
                        "Revoke this API key? This action cannot be undone.",
                      )
                    ) {
                      revokeMutation.mutate(key.id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                  Revoke Access
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
