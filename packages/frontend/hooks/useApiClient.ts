"use client";
import { useAuth } from "@clerk/nextjs";

export function useApiClient() {
  const { getToken } = useAuth();

  const authFetch : typeof fetch = async (input , init) => {
    const token = await getToken();
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return { authFetch };
}
