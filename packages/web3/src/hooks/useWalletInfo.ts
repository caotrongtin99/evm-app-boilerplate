import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import { formatAddress, formatBalance } from "../utils";
import type { WalletState } from "../types";

/**
 * Hook to get detailed wallet information and connection status
 */
export function useWalletInfo() {
  const { address, isConnected, isConnecting, isReconnecting, connector } =
    useAccount();

  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address,
  });

  // Format address for display
  const formattedAddress = address ? formatAddress(address) : undefined;

  // Format balance for display
  const formattedBalance = balance?.value
    ? formatBalance(balance.value)
    : undefined;

  // Wallet state object
  const walletState: WalletState = {
    isConnected,
    isConnecting,
    isReconnecting,
    address,
    chainId,
    connector,
  };

  return {
    // Raw data
    address,
    chainId,
    balance: balance?.value,
    isConnected,
    isConnecting,
    isReconnecting,
    isLoadingBalance,
    connector,

    // Formatted data for UI
    formattedAddress,
    formattedBalance,
    balanceSymbol: balance?.symbol,

    // State object
    walletState,

    // Actions
    disconnect,
  };
}
