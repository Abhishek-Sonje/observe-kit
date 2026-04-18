"use client";

import { getLogsByTrace } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function TraceClient({ traceId }: { traceId: string }) {
    
    const {data, isLoading, error} = useQuery({
        queryKey: ["trace", traceId],
        queryFn: () => getLogsByTrace(traceId),
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