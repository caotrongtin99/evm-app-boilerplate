"use client";

import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { useState } from "react";

// Import types from the Web3 package to showcase
import type {
  ContractCall,
  NetworkConfig,
  Token,
  TransactionStatus,
  WalletState,
  Web3Error,
} from "@workspace/web3/types";

// Web3-specific examples
const exampleContractCall: ContractCall = {
  address: "0x1234567890123456789012345678901234567890",
  functionName: "transfer",
  args: ["0xabcdef1234567890abcdef1234567890abcdef12", "1000000000000000000"],
  value: BigInt(0),
};

const exampleNetwork: NetworkConfig = {
  chainId: 1,
  name: "Ethereum Mainnet",
  rpcUrl: "https://mainnet.infura.io/v3/your-project-id",
  blockExplorer: "https://etherscan.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

export default function TypeScriptDemo() {
  const [selectedExample, setSelectedExample] = useState<string>("token");
  const [codeOutput, setCodeOutput] = useState<string>("");

  // Example Web3 data with proper typing
  const exampleToken: Token = {
    address: "0x1234567890123456789012345678901234567890",
    name: "Example Token",
    symbol: "EXT",
    decimals: 18,
    chainId: 1,
    logoUrl: "https://example.com/logo.png",
  };

  const exampleTransaction: TransactionStatus = {
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    status: "confirmed",
    blockNumber: BigInt(18500000),
    confirmations: 12,
  };

  const exampleWalletState: WalletState = {
    isConnected: true,
    isConnecting: false,
    isReconnecting: false,
    address: "0x1234567890123456789012345678901234567890",
    chainId: 1,
  };

  const exampleWeb3Error: Web3Error = {
    code: "ACTION_REJECTED",
    message: "User rejected the transaction",
    cause: new Error("MetaMask Tx Signature: User denied transaction signature."),
  };

  const runExample = async (exampleType: string) => {
    try {
      switch (exampleType) {
        case "token":
          setCodeOutput(JSON.stringify(exampleToken, null, 2));
          break;
        case "transaction":
          setCodeOutput(JSON.stringify(exampleTransaction, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
          , 2));
          break;
        case "wallet":
          setCodeOutput(JSON.stringify(exampleWalletState, null, 2));
          break;
        case "contract":
          setCodeOutput(JSON.stringify(exampleContractCall, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
          , 2));
          break;
        case "network":
          setCodeOutput(JSON.stringify(exampleNetwork, null, 2));
          break;
        case "error":
          setCodeOutput(JSON.stringify({
            code: exampleWeb3Error.code,
            message: exampleWeb3Error.message,
            cause: exampleWeb3Error.cause?.toString(),
          }, null, 2));
          break;
        default:
          setCodeOutput("Select an example to see the output...");
      }
    } catch (error) {
      setCodeOutput(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌐 Web3 TypeScript Types
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete TypeScript type definitions for Web3, smart contracts,
            wallets, and blockchain interactions. Fully typed for safety and IntelliSense.
          </p>
        </div>

        {/* Token Types */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-lg p-2 mr-3">
                🪙
              </span>
              Token Types
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Token Interface</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`interface Token {
  address: ContractAddress;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoUrl?: string;
}

type ContractAddress = Address;
type WalletAddress = Address;
type TransactionHash = Hash;`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Example Usage</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`const usdc: Token = {
  address: "0xA0b86a33E6...",
  name: "USD Coin",
  symbol: "USDC",
  decimals: 6,
  chainId: 1,
  logoUrl: "https://tokens.1inch.io/0xa0b86a33e..."
};

// Type-safe token operations
const tokenBalance = await getTokenBalance(usdc.address);
const formattedAmount = formatTokenAmount(amount, usdc.decimals);`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Types */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg p-2 mr-3">
                📝
              </span>
              Transaction Types
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Transaction Status</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`interface TransactionStatus {
  hash: TransactionHash;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: bigint;
  confirmations?: number;
}

interface ContractCall {
  address: ContractAddress;
  functionName: string;
  args?: any[];
  value?: bigint;
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Usage Example</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`// Contract interaction
const transferCall: ContractCall = {
  address: tokenAddress,
  functionName: "transfer",
  args: [recipient, amount],
  value: BigInt(0)
};

// Monitor transaction
const txStatus: TransactionStatus = {
  hash: "0xabc...",
  status: "pending",
  blockNumber: BigInt(18500000),
  confirmations: 0
};`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wallet Types */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3">
                👛
              </span>
              Wallet & Connection Types
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Wallet State</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  address?: WalletAddress;
  chainId?: number;
  connector?: any;
}

// Wallet connection hooks
const { address, isConnected, chainId } = useAccount();
const { connect } = useConnect();
const { disconnect } = useDisconnect();`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Network Configuration</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`interface NetworkConfig {
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

const ethereum: NetworkConfig = {
  chainId: 1,
  name: "Ethereum Mainnet",
  rpcUrl: "https://mainnet.infura.io/v3/...",
  blockExplorer: "https://etherscan.io",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }
};`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-100 text-red-600 rounded-lg p-2 mr-3">
                🚨
              </span>
              Error Types & Handling
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Web3 Error Interface</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`interface Web3Error {
  code: string;
  message: string;
  cause?: unknown;
}

// Common error codes
type ErrorCode =
  | "ACTION_REJECTED"
  | "INSUFFICIENT_FUNDS"
  | "NETWORK_ERROR"
  | "CONTRACT_ERROR"
  | "INVALID_ADDRESS";`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Error Handling Pattern</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`function isWeb3Error(error: unknown): error is Web3Error {
  return error instanceof Error &&
    'code' in error &&
    'message' in error;
}

try {
  await contractWrite();
} catch (error) {
  if (isWeb3Error(error)) {
    switch (error.code) {
      case "ACTION_REJECTED":
        toast.error("Transaction was rejected");
        break;
      case "INSUFFICIENT_FUNDS":
        toast.error("Insufficient funds");
        break;
      default:
        toast.error(error.message);
    }
  }
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-yellow-100 text-yellow-600 rounded-lg p-2 mr-3">
                ⚡
              </span>
              Interactive Examples
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Web3 Type Examples</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={selectedExample === "token" ? "default" : "outline"}
                      onClick={() => {
                        setSelectedExample("token");
                        runExample("token");
                      }}
                    >
                      Token
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedExample === "transaction" ? "default" : "secondary"}
                      onClick={() => {
                        setSelectedExample("transaction");
                        runExample("transaction");
                      }}
                    >
                      Transaction
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={selectedExample === "wallet" ? "default" : "secondary"}
                      onClick={() => {
                        setSelectedExample("wallet");
                        runExample("wallet");
                      }}
                    >
                      Wallet
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedExample === "contract" ? "default" : "secondary"}
                      onClick={() => {
                        setSelectedExample("contract");
                        runExample("contract");
                      }}
                    >
                      Contract
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={selectedExample === "network" ? "default" : "secondary"}
                      onClick={() => {
                        setSelectedExample("network");
                        runExample("network");
                      }}
                    >
                      Network
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedExample === "error" ? "default" : "secondary"}
                      onClick={() => {
                        setSelectedExample("error");
                        runExample("error");
                      }}
                    >
                      Error
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Type Output</h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm max-h-64 overflow-auto">
                  <pre>{codeOutput || "Select an example to see the typed data..."}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hook Examples */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
                🪝
              </span>
              Custom Hooks with Types
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">useWalletInfo Hook</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`function useWalletInfo() {
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({ address });

  const walletState: WalletState = {
    isConnected,
    isConnecting: false,
    isReconnecting: false,
    address,
    chainId,
  };

  return {
    address,
    chainId,
    balance: balance?.value,
    formattedAddress: formatAddress(address),
    walletState,
  };
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">useContractWrite Hook</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs">{`function useContractWrite<T extends ContractABI>(
  contract: { address: Address; abi: T }
) {
  const [status, setStatus] = useState<TransactionStatus | null>(null);

  const writeContract = async (call: ContractCall) => {
    try {
      const hash = await writeContract({
        address: call.address,
        abi: contract.abi,
        functionName: call.functionName,
        args: call.args,
        value: call.value,
      });

      setStatus({
        hash,
        status: "pending",
        confirmations: 0,
      });

      return hash;
    } catch (error) {
      if (isWeb3Error(error)) {
        throw error;
      }
      throw new Error("Unknown error");
    }
  };

  return { writeContract, status };
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-lg p-2 mr-3">
                ✅
              </span>
              Web3 TypeScript Best Practices
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">✅ Do</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Use strict typing for addresses and hashes</li>
                    <li>• Handle BigInt types properly in JSON</li>
                    <li>• Implement proper error type guards</li>
                    <li>• Type your contract ABIs</li>
                    <li>• Use branded types for safety</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">❌ Don&#39;t</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Use &#39;any&#39; for Web3 method returns</li>
                    <li>• Ignore BigInt conversion in serialization</li>
                    <li>• Skip error handling for transactions</li>
                    <li>• Use strings for addresses without validation</li>
                    <li>• Forget to handle network switching</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="secondary" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
