import { Chain } from "viem";
import {
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  sepolia,
  polygonMumbai,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
} from "viem/chains";

// Mainnet chains
export const supportedMainnetChains: Chain[] = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
];

// Testnet chains
export const supportedTestnetChains: Chain[] = [
  sepolia,
  polygonMumbai,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
];

// All supported chains
export const supportedChains: Chain[] = [
  ...supportedMainnetChains,
  ...supportedTestnetChains,
];

// Chain utilities
export const getChainById = (chainId: number): Chain | undefined => {
  return supportedChains.find((chain) => chain.id === chainId);
};

export const isMainnetChain = (chainId: number): boolean => {
  return supportedMainnetChains.some((chain) => chain.id === chainId);
};

export const isTestnetChain = (chainId: number): boolean => {
  return supportedTestnetChains.some((chain) => chain.id === chainId);
};
