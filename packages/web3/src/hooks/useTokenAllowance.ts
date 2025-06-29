import { useQuery } from '@tanstack/react-query';
import { Abi, Address } from 'viem';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { readContract } from 'wagmi/actions';


export function useTokenAllowance({
  token,
  abi,
  spender,
  enabled = true,
}: {
  token?: Address;
  abi?: Abi;
  spender?: Address;
  enabled?: boolean;
}) {
  const { address} = useAccount();
  const config = useConfig();
  const chainId = useChainId();

  const fetchAllowance = async (): Promise<bigint> => {
    if (!address || !config || !token || !abi || !spender) {
      return BigInt(0);
    }

    try {
      const allowance = await readContract(config, {
        address: token,
        abi,
        functionName: 'allowance',
        args: [address, spender],
      });

      return allowance as bigint;
    } catch (error) {
      console.error('Error fetching allowance:', error);
      return BigInt(0);
    }
  };

  const {
    data: allowance = BigInt(0),
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['tokenAllowance', token, address, spender, chainId],
    queryFn: fetchAllowance,
    enabled: enabled && !!address && !!token && !!abi && !!spender,
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 seconds
  });

  return {
    allowance,
    isLoading,
    isError,
    refetch,
  };
}
