"use client";
import { useApiClient } from "@/hooks/useApiClient";
import { createApiKey, getApiKeys, revokeApiKey } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ApiKeys() {
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const [key, setKey] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { authFetch } = useApiClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: () => getApiKeys(authFetch),
  });

  const handleRevoke = (key: string) => async () => {
    await revokeApiKey(key, authFetch);
    await queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
  };
  return (
    <div>
      <h1>API Keys</h1>
      <p>Here you can manage your API keys.</p>
      <ul>
        {data?.map((apiKey) => (
          <li key={apiKey.id}>
            {apiKey.name} — created{" "}
            {new Date(apiKey.createdAt).toLocaleDateString()}
            <button onClick={handleRevoke(apiKey.id)}>Revoke</button>
          </li>
        ))}
      </ul>

      <h1>Create new Api key</h1>
      <p>
        Click the button below to create a new API key. Make sure to copy it and
        store it securely, as you won't be able to see it again.
      </p>
      <input
        type="text"
        placeholder="API Key Name"
        value={newApiKeyName}
        onChange={(e) => setNewApiKeyName(e.target.value)}
      />
      <button
        onClick={async () => {
          const newKey = await createApiKey(newApiKeyName, authFetch);
          if (newKey) {
            setKey(newKey.apiKey);
            await queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
            setNewApiKeyName("");
          }
        }}
      >
        Create new API key
      </button>

      {key && (
        <div>
          <p>API Key:</p>
          <p>{key}</p>
          <button onClick={() => navigator.clipboard.writeText(key)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
