import { useMutation } from '@tanstack/react-query';
import { Abi, Address } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

import { useAccount, useConfig } from 'wagmi';

interface UseTokenApproveProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useTokenApprove({
  onSuccess,
  onError,
}: UseTokenApproveProps) {
  const { address } = useAccount();
  const config = useConfig();

  const handleApprove = async ({
    token,
    abi,
    spender,
    amount,
  }: {
    token: Address;
    abi: Abi;
    chainId: number;
    spender: Address;
    amount: bigint;
  }) => {
    try {
      if (!address || !config) return;
      const txHash = await writeContract(config, {
        address: token,
        abi,
        functionName: 'approve',
        args: [spender, amount],
      });
      await waitForTransactionReceipt(config, { hash: txHash });
      onSuccess?.();
    } catch (error) {
      console.log(error);
      onError?.();
    }
  };
  const {
    mutate: approve,
    mutateAsync: approveAsync,
    isPending,
  } = useMutation({
    mutationFn: handleApprove,
  });
  return { approve, approveAsync, isPending };
}
