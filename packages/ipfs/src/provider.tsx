import React, { createContext, useContext, useEffect, useState } from "react";
import { IPFSClient, getIPFSClient } from "./client";
import type { IPFSConfig } from "./client";

interface IPFSContextType {
  client: IPFSClient | null;
  initialized: boolean;
  error: string | null;
}

const IPFSContext = createContext<IPFSContextType | undefined>(undefined);

export interface IPFSProviderProps {
  children: React.ReactNode;
  config?: IPFSConfig;
}

export function IPFSProvider({ children, config }: IPFSProviderProps) {
  const [client, setClient] = useState<IPFSClient | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const ipfsClient = getIPFSClient(config);
        await ipfsClient.initialize();
        setClient(ipfsClient);
        setInitialized(true);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize IPFS"
        );
        setInitialized(false);
      }
    };

    initClient();

    return () => {
      if (client) {
        client.stop().catch(console.error);
      }
    };
  }, [config]);

  const value: IPFSContextType = {
    client,
    initialized,
    error,
  };

  return <IPFSContext.Provider value={value}>{children}</IPFSContext.Provider>;
}

export function useIPFS(): IPFSContextType {
  const context = useContext(IPFSContext);
  if (context === undefined) {
    throw new Error("useIPFS must be used within an IPFSProvider");
  }
  return context;
}
