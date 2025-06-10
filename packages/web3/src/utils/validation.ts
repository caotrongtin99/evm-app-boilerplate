import { isAddress, isHex } from "viem";
import type { WalletAddress } from "../types/index.js";

/**
 * Validate if a string is a valid Ethereum address
 * @param address - Address string to validate
 * @returns true if valid address
 */
export function isValidAddress(address: string): address is WalletAddress {
  return isAddress(address);
}

/**
 * Validate if a string is a valid hex string
 * @param value - String to validate
 * @returns true if valid hex
 */
export function isValidHex(value: string): boolean {
  return isHex(value);
}

/**
 * Validate if a string is a valid transaction hash
 * @param hash - Hash string to validate
 * @returns true if valid transaction hash
 */
export function isValidTransactionHash(hash: string): boolean {
  return isValidHex(hash) && hash.length === 66; // 0x + 64 hex chars
}

/**
 * Validate if a string is a valid private key
 * @param privateKey - Private key string to validate
 * @returns true if valid private key
 */
export function isValidPrivateKey(privateKey: string): boolean {
  return isValidHex(privateKey) && privateKey.length === 66; // 0x + 64 hex chars
}

/**
 * Validate if a string is a valid amount (numeric)
 * @param amount - Amount string to validate
 * @returns true if valid numeric amount
 */
export function isValidAmount(amount: string): boolean {
  if (!amount || amount.trim() === "") return false;

  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0 && isFinite(num);
}

/**
 * Validate if an amount is greater than zero
 * @param amount - Amount string to validate
 * @returns true if amount > 0
 */
export function isPositiveAmount(amount: string): boolean {
  if (!isValidAmount(amount)) return false;
  return parseFloat(amount) > 0;
}

/**
 * Validate if a chain ID is supported
 * @param chainId - Chain ID to validate
 * @param supportedChainIds - Array of supported chain IDs
 * @returns true if chain is supported
 */
export function isSupportedChain(
  chainId: number,
  supportedChainIds: number[]
): boolean {
  return supportedChainIds.includes(chainId);
}

/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns true if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
