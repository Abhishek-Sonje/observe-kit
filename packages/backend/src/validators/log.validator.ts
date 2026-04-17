
import { z } from "zod";

export const LogSchema = z.object({
    message: z.string(),
    timestamp: z.number().default(() => Date.now()),
    level: z.enum(["debug", "info", "warn", "error"]),
    trace_id: z.string().optional(),
    span_id: z.string().optional(),
    service_name: z.string(),
    version: z.string(),
})

export const LogBatchSchema = z.array(LogSchema);
export type LogBatch =z.infer<typeof LogBatchSchema>;
