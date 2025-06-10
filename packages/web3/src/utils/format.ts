import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import type { WalletAddress } from "../types/index.js";

/**
 * Format wallet address for display
 * @param address - The wallet address
 * @param startLength - Number of characters to show at start (default: 6)
 * @param endLength - Number of characters to show at end (default: 4)
 * @returns Formatted address like "0x1234...5678"
 */
export function formatAddress(
  address: WalletAddress,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return "";

  if (address.length <= startLength + endLength) {
    return address;
  }

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Format ETH balance for display
 * @param balance - Balance in wei (bigint)
 * @param decimals - Number of decimal places to show (default: 4)
 * @returns Formatted balance string
 */
export function formatBalance(balance: bigint, decimals: number = 4): string {
  const formatted = formatEther(balance);
  const num = parseFloat(formatted);

  if (num === 0) return "0";
  if (num < 0.0001) return "< 0.0001";

  return num.toFixed(decimals).replace(/\.?0+$/, "");
}

/**
 * Format token balance for display
 * @param balance - Balance in smallest unit (bigint)
 * @param tokenDecimals - Token decimals (e.g., 18 for most ERC20)
 * @param displayDecimals - Number of decimal places to show (default: 4)
 * @returns Formatted balance string
 */
export function formatTokenBalance(
  balance: bigint,
  tokenDecimals: number,
  displayDecimals: number = 4
): string {
  const formatted = formatUnits(balance, tokenDecimals);
  const num = parseFloat(formatted);

  if (num === 0) return "0";
  if (num < 0.0001) return "< 0.0001";

  return num.toFixed(displayDecimals).replace(/\.?0+$/, "");
}

/**
 * Parse ETH amount from string
 * @param amount - Amount as string (e.g., "1.5")
 * @returns Amount in wei (bigint)
 */
export function parseEthAmount(amount: string): bigint {
  return parseEther(amount);
}

/**
 * Parse token amount from string
 * @param amount - Amount as string (e.g., "100.5")
 * @param decimals - Token decimals
 * @returns Amount in smallest unit (bigint)
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
  return parseUnits(amount, decimals);
}

/**
 * Format large numbers with appropriate suffixes
 * @param num - Number to format
 * @returns Formatted string like "1.2K", "3.4M", etc.
 */
export function formatLargeNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
}
