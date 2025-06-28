"use client";

import { Button } from "@workspace/ui/components/button";
import { ConnectWalletButton, useWalletInfo } from "@workspace/web3";
import { Coins, Copy, ExternalLink, Wallet, Zap } from "lucide-react";
import { useState } from "react";

export default function Web3DemoPage() {
  const {
    address,
    isConnected,
    balance,
    chainId,
    isConnecting,
    formattedAddress,
    formattedBalance,
    balanceSymbol,
  } = useWalletInfo();

  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string | bigint) => {
    if (typeof bal === "bigint") {
      return (Number(bal) / 1e18).toFixed(4);
    }
    return parseFloat(bal.toString()).toFixed(4);
  };

  const getEstimatedUSD = (bal: string | bigint) => {
    if (typeof bal === "bigint") {
      return ((Number(bal) / 1e18) * 2000).toFixed(2);
    }
    return (parseFloat(bal.toString()) * 2000).toFixed(2);
  };

  const isLoading = isConnecting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Web3 Integration Demo
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience seamless wallet connection, balance checking, and Web3
            interactions
          </p>
        </div>

        {/* Connection Status */}
        <div className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Connection Status</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Connect your wallet to start exploring Web3 features
          </p>
          <div className="flex items-center justify-between">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isConnected
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isLoading
                ? "🟡 Connecting..."
                : isConnected
                  ? "🟢 Connected"
                  : "🔴 Disconnected"}
            </div>
            <div className="flex items-center space-x-2">
              <ConnectWalletButton />
            </div>
          </div>
        </div>

        {/* Wallet Information */}
        {isConnected && address && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Wallet Details */}
            <div className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Wallet Details</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                    <code className="flex-1 text-sm font-mono text-gray-800">
                      {formattedAddress || truncateAddress(address)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="h-8 w-8 p-0 hover:bg-blue-100"
                    >
                      <Copy
                        className={`h-4 w-4 ${copied ? "text-green-600" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 animate-pulse">
                      ✓ Address copied to clipboard
                    </p>
                  )}
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Network
                  </label>
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-gray-800">
                        Chain ID: {chainId || "Unknown"}
                      </span>
                      <span className="text-xs px-2 py-1 bg-white border rounded">
                        {chainId === 1
                          ? "Mainnet"
                          : chainId === 5
                            ? "Goerli"
                            : chainId === 11155111
                              ? "Sepolia"
                              : "Testnet"}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://etherscan.io/address/${address}`,
                      "_blank",
                    )
                  }
                  className="w-full flex items-center space-x-2 cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Etherscan</span>
                </Button>
              </div>
            </div>

            {/* Balance Information */}
            <div className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Balance</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl border">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formattedBalance
                      ? `${formattedBalance} ${balanceSymbol || "ETH"}`
                      : balance
                        ? `${formatBalance(balance)} ETH`
                        : "0.0000 ETH"}
                  </div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-lg font-semibold text-blue-700">
                      ${balance ? getEstimatedUSD(balance) : "0.00"}
                    </div>
                    <p className="text-xs text-blue-600">USD Value*</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="text-lg font-semibold text-purple-700">
                      {balance ? (Number(balance) / 1e9).toFixed(0) : "0"}
                    </div>
                    <p className="text-xs text-purple-600">Gwei</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  *Estimated value based on mock price
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Showcase */}
        {isConnected && (
          <div className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
              🚀 Web3 Features
            </h2>
            <p className="text-gray-600 mb-6">
              Your wallet is connected and ready for Web3 interactions
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">Balance Tracking</h3>
                <p className="text-sm text-gray-600">
                  Real-time balance updates
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-semibold mb-1">Multi-Chain Support</h3>
                <p className="text-sm text-gray-600">
                  Connect to various networks
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="font-semibold mb-1">Secure Connection</h3>
                <p className="text-sm text-gray-600">
                  Encrypted wallet integration
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        {!isConnected && !isLoading && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span>🚀</span>
              <h2 className="text-xl font-semibold text-blue-800">
                Getting Started
              </h2>
            </div>
            <p className="text-blue-600 mb-6">
              Follow these simple steps to connect your wallet
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Click 'Connect Wallet' to get started",
                "Choose your preferred wallet (MetaMask, WalletConnect, etc.)",
                "Approve the connection in your wallet",
                "Explore your wallet details and balance!",
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-700 mb-2">
                <Wallet className="h-5 w-5" />
                <span className="font-medium">Supported Wallets</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "MetaMask",
                  "WalletConnect",
                  "Coinbase Wallet",
                  "Rainbow",
                ].map((wallet) => (
                  <span
                    key={wallet}
                    className="px-2 py-1 bg-white/80 border rounded text-sm"
                  >
                    {wallet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="border-yellow-200 bg-yellow-50 rounded-xl p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
              <p className="text-yellow-800 font-medium">
                Connecting to your wallet...
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                Please check your wallet for connection requests
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
