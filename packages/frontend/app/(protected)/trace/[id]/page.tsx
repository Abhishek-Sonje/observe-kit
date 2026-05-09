import TraceClient from "@/components/trace/TraceClient";


export default async function TracePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <TraceClient traceId={id} />;
}
