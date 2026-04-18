import { getServices } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const services = await getServices();

  return (
    <div>
      <h1>Welcome to Trace Explorer</h1>
      <p>Here are the available services:</p>
      <div className="grid grid-cols-3 gap-4">
      {services.map((service) => (
          <Link href={`/logs?service_name=${service}`} key={service}>
            <div className=" bg-blue-300/50 flex items-center justify-center h-30 rounded-xl">
              <span className="opacity-100 text-purple-950 text-2xl">{service}</span>
            </div>
          </Link>
      ))}
      </div>
    </div>
  );
  // render directly
}
