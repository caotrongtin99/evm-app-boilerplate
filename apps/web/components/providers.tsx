"use client";

import { queryClient } from "@/lib";
import { Web3Provider } from "@workspace/web3";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Web3Provider queryClient={queryClient}>{children}</Web3Provider>
    </NextThemesProvider>
  );
}
