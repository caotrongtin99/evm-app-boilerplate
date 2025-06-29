import { useQuery } from '@tanstack/react-query';
import { Abi, Address } from 'viem';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { readContract } from 'wagmi/actions';

export function useTokenBalance({
  token,
  abi,
  account,
  enabled = true,
}: {
  token?: Address;
  abi?: Abi;
  account?: Address;
  enabled?: boolean;
}) {
  const { address} = useAccount();
  const config = useConfig();
  const chainId = useChainId();

  // Use provided account or fallback to connected address
  const targetAccount = account || address;

  const fetchBalance = async (): Promise<bigint> => {
    if (!targetAccount || !config || !token || !abi) {
      return BigInt(0);
    }

    try {
      const balance = await readContract(config, {
        address: token,
        abi,
        functionName: 'balanceOf',
        args: [targetAccount],
      });

      return balance as bigint;
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return BigInt(0);
    }
  };

  const {
    data: balance = BigInt(0),
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['tokenBalance', token, targetAccount, chainId],
    queryFn: fetchBalance,
    enabled: enabled && !!targetAccount && !!token && !!abi,
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 seconds
  });

  return {
    balance,
    isLoading,
    isError,
    refetch,
  };
}
