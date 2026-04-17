export interface Log{
    id: string;
    message: string;
    timestamp: number;
    level: 'info' | 'warn' | 'error' | 'debug';
    service_name: string;
    trace_id?: string;
    span_id?: string;
    version: string;
}