import { Address, Hash } from "viem";

// Common Web3 types
export type ContractAddress = Address;
export type TransactionHash = Hash;
export type WalletAddress = Address;

// Token types
export interface Token {
  address: ContractAddress;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoUrl?: string;
}

// Transaction types
export interface TransactionStatus {
  hash: TransactionHash;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: bigint;
  confirmations?: number;
}

// Contract interaction types
export interface ContractCall {
  address: ContractAddress;
  functionName: string;
  args?: any[];
  value?: bigint;
}

// Network types
export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Wallet connection state
export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  address?: WalletAddress;
  chainId?: number;
  connector?: any;
}

// Error types
export interface Web3Error {
  code: string;
  message: string;
  cause?: unknown;
}

export type ContractABI = any[]; // Will be more specific based on your contracts
