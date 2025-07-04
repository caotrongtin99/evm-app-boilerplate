import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "./chains";

// Get app info from environment variables
const getAppInfo = () => ({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Web3 DApp",
  appDescription:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "A Web3 application built with RainbowKit and Wagmi",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  appIcon: process.env.NEXT_PUBLIC_APP_ICON || undefined,
});

// Create Wagmi config with RainbowKit integration
export const createWagmiConfig = () => {
  const appInfo = getAppInfo();

  return getDefaultConfig({
    appName: appInfo.appName,
    projectId:
      process.env.NEXT_PUBLIC_WC_PROJECT_ID! ||
      "88e9baa7278e8ed47110cde6037c5917",
    chains: supportedChains as any,
    appDescription: appInfo.appDescription,
    appUrl: appInfo.appUrl,
    appIcon: appInfo.appIcon,
  });
};

// Default config instance
export const wagmiConfig = createWagmiConfig();
