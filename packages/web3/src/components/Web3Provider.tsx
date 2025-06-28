import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../config/wagmi.ts";

import "@rainbow-me/rainbowkit/styles.css";

interface Web3ProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

/**
 * Web3Provider component for setting up RainbowKit and Wagmi
 * Wrap your entire app with this provider to enable Web3 functionality
 */
export function Web3Provider({
  children,
  queryClient = new QueryClient(),
}: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
