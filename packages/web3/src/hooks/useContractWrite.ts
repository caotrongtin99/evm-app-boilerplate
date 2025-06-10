import { useState, useCallback } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import type {
  ContractAddress,
  TransactionHash,
  ContractABI,
} from "../types/index.js";

interface UseContractWriteProps {
  address: ContractAddress;
  abi: ContractABI;
}

interface UseContractWriteResult {
  execute: (
    functionName: string,
    args?: any[],
    value?: bigint
  ) => Promise<TransactionHash | undefined>;
  reset: () => void;
  isLoading: boolean;
  isWritePending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  transactionHash?: TransactionHash;
  error?: string;
  writeError: Error | null;
  confirmError: Error | null;
}

/**
 * Hook for writing to smart contracts with error handling
 */
export function useContractWrite({
  address,
  abi,
}: UseContractWriteProps): UseContractWriteResult {
  const [transactionHash, setTransactionHash] = useState<TransactionHash>();
  const [error, setError] = useState<string>();

  const {
    writeContractAsync,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Execute contract call
  const execute = useCallback(
    async (
      functionName: string,
      args: any[] = [],
      value?: bigint
    ): Promise<TransactionHash | undefined> => {
      try {
        setError(undefined);

        const hash = await writeContractAsync({
          address,
          abi,
          functionName,
          args,
          value,
        });

        setTransactionHash(hash);
        return hash;
      } catch (err: any) {
        const errorMessage = err?.message || "Transaction failed";
        setError(errorMessage);
        throw err;
      }
    },
    [address, abi, writeContractAsync]
  );

  // Reset state
  const reset = useCallback(() => {
    setTransactionHash(undefined);
    setError(undefined);
  }, []);

  // Combined loading state
  const isLoading = isWritePending || isConfirming;

  // Combined error
  const combinedError = error || writeError?.message || confirmError?.message;

  return {
    // Actions
    execute,
    reset,

    // States
    isLoading,
    isWritePending,
    isConfirming,
    isConfirmed,
    transactionHash,
    error: combinedError,

    // Raw errors for debugging
    writeError,
    confirmError,
  };
}
