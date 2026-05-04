import { getServices } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";

import Link from "next/link";

export default async function HomePage() {
  const { getToken } = await auth();
  const token = await getToken({
    template: "backend"
  });

  console.log("Auth token:", token);
  
  const services = await getServices(async (input, init) => {
    return fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  });
  console.log("Fetched services:", services);

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
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
          <Link href="/logs">View All Logs</Link>
        </button>
        
      </div>
    </div>
  );
  // render directly
}
