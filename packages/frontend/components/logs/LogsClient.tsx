"use client";

import { getLogs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import FilterBar from "./FilterBar";
import LogTable from "./LogTable";

import type { Log } from "@observe-kit/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LogsClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read directly from URL - no useState needed
  const service = searchParams.get("service_name") ?? "";
  const level = (searchParams.get("level") ?? "") as Log["level"] | "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  // Update URL when filter changes
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["logs", service, level, from, to],
    queryFn: () => getLogs(searchParams.toString()),
  });

  return (
    <div>
      <FilterBar updateFilter={updateFilter} service={service} level={level} from={from} to={to} />
      <LogTable data={data ?? []} isLoading={isLoading} error={error} />
    </div>
  );
}
