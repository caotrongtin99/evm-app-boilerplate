import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createPublicClient, http, formatUnits, isAddress } from "viem";
import {
  mainnet,
  sepolia,
  polygon,
  arbitrum,
  optimism,
  base,
} from "viem/chains";

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);
  private readonly clients: Map<number, any> = new Map();

  constructor(private configService: ConfigService) {
    this.initializeClients();
  }

  private initializeClients() {
    const chains = [mainnet, sepolia, polygon, arbitrum, optimism, base];

    chains.forEach((chain) => {
      try {
        const client = createPublicClient({
          chain,
          transport: http(),
        });
        this.clients.set(chain.id, client);
        this.logger.log(
          `Initialized client for ${chain.name} (ID: ${chain.id})`
        );
      } catch (error) {
        this.logger.error(
          `Failed to initialize client for ${chain.name}:`,
          error
        );
      }
    });
  }

  async getBalance(
    address: string,
    chainId: number = 1
  ): Promise<{ balance: string; formatted: string }> {
    if (!isAddress(address)) {
      throw new Error("Invalid address format");
    }

    const client = this.clients.get(chainId);
    if (!client) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    try {
      const balance = await client.getBalance({ address });
      const formatted = formatUnits(balance, 18);

      return {
        balance: balance.toString(),
        formatted,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get balance for ${address} on chain ${chainId}:`,
        error
      );
      throw new Error("Failed to fetch balance");
    }
  }

  async getBlockNumber(chainId: number = 1): Promise<number> {
    const client = this.clients.get(chainId);
    if (!client) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    try {
      const blockNumber = await client.getBlockNumber();
      return Number(blockNumber);
    } catch (error) {
      this.logger.error(
        `Failed to get block number for chain ${chainId}:`,
        error
      );
      throw new Error("Failed to fetch block number");
    }
  }

  async getTransaction(hash: string, chainId: number = 1) {
    const client = this.clients.get(chainId);
    if (!client) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    try {
      const transaction = await client.getTransaction({ hash });
      return transaction;
    } catch (error) {
      this.logger.error(
        `Failed to get transaction ${hash} on chain ${chainId}:`,
        error
      );
      throw new Error("Failed to fetch transaction");
    }
  }

  async getTokenBalance(
    tokenAddress: string,
    walletAddress: string,
    chainId: number = 1
  ): Promise<{ balance: string; formatted: string }> {
    if (!isAddress(tokenAddress) || !isAddress(walletAddress)) {
      throw new Error("Invalid address format");
    }

    const client = this.clients.get(chainId);
    if (!client) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    try {
      // ERC20 balanceOf function call
      const balance = await client.readContract({
        address: tokenAddress,
        abi: [
          {
            inputs: [{ name: "account", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [walletAddress],
      });

      // Get token decimals
      const decimals = await client.readContract({
        address: tokenAddress,
        abi: [
          {
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "decimals",
      });

      const formatted = formatUnits(balance as bigint, decimals as number);

      return {
        balance: (balance as bigint).toString(),
        formatted,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get token balance for ${walletAddress} on chain ${chainId}:`,
        error
      );
      throw new Error("Failed to fetch token balance");
    }
  }

  getSupportedChains() {
    return Array.from(this.clients.keys()).map((chainId) => {
      const chainData = [
        mainnet,
        sepolia,
        polygon,
        arbitrum,
        optimism,
        base,
      ].find((chain) => chain.id === chainId);
      return {
        id: chainId,
        name: chainData?.name || "Unknown",
        nativeCurrency: chainData?.nativeCurrency,
        blockExplorers: chainData?.blockExplorers,
      };
    });
  }
}
