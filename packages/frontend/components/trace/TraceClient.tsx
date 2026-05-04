"use client";

import { useApiClient } from "@/hooks/useApiClient";
import { getLogsByTrace } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function TraceClient({ traceId }: { traceId: string }) {
    const { authFetch } = useApiClient();
    const {data, isLoading, error} = useQuery({
        queryKey: ["trace", traceId],
        queryFn: () => getLogsByTrace(traceId, authFetch),
    });

    return (
        <div>
            <div>TraceClient for traceId: {traceId}</div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {!isLoading && !error && (
                <div>
                    {data?.map(log => (
                        <div key={log.id}>{log.message}</div>
                    ))}
                </div>
            )}
        </div>
    );
}