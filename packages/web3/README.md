# @workspace/web3

Shared Web3 utilities, hooks, and ABIs for Web3 projects using RainbowKit and Wagmi.

## 📦 Installation

```bash
# This package is used internally within the workspace
# Dependencies will be installed automatically through the workspace
```

## 🚀 Usage

### 1. Setup Provider

Wrap your application with `Web3Provider`:

```tsx
import { Web3Provider } from "@workspace/web3/components/Web3Provider"

function App() {
  return (
    <Web3Provider>
      <YourApp />
    </Web3Provider>
  )
}
```

### 2. Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_APP_DESCRIPTION=Your app description
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Using Hooks

#### useWalletInfo

```tsx
import { useWalletInfo } from "@workspace/web3/hooks/useWalletInfo"

function WalletInfo() {
  const {
    address,
    formattedAddress,
    formattedBalance,
    isConnected,
    chainId,
    disconnect
  } = useWalletInfo()

  if (!isConnected) {
    return <div>Please connect wallet</div>
  }

  return (
    <div>
      <p>Address: {formattedAddress}</p>
      <p>Balance: {formattedBalance} ETH</p>
      <p>Chain ID: {chainId}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
```

#### useContractWrite

```tsx
import { useContractWrite } from "@workspace/web3/hooks/useContractWrite"
import { ERC20_ABI } from "@workspace/web3/abi/erc20"

function TokenTransfer() {
  const { execute, isLoading, transactionHash, error } = useContractWrite({
    address: "0x...", // Token contract address
    abi: ERC20_ABI,
  })

  const handleTransfer = async () => {
    try {
      const hash = await execute("transfer", [
        "0x...", // recipient
        BigInt("1000000000000000000") // 1 ETH in wei
      ])
      console.log("Transaction hash:", hash)
    } catch (err) {
      console.error("Transfer failed:", err)
    }
  }

  return (
    <div>
      <button onClick={handleTransfer} disabled={isLoading}>
        {isLoading ? "Transferring..." : "Transfer Token"}
      </button>
      {transactionHash && <p>Hash: {transactionHash}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}
```

### 4. Utilities

#### Format Utils

```tsx
import { 
  formatAddress, 
  formatBalance, 
  formatTokenBalance 
} from "@workspace/web3/utils/format"

// Format address: "0x1234...5678"
const shortAddress = formatAddress("0x1234567890123456789012345678901234567890")

// Format ETH balance: "1.2345"
const ethBalance = formatBalance(BigInt("1234500000000000000"))

// Format token balance: "100.25"
const tokenBalance = formatTokenBalance(
  BigInt("100250000000000000000"), 
  18 // decimals
)
```

#### Validation Utils

```tsx
import { 
  isValidAddress, 
  isValidAmount, 
  isValidTransactionHash 
} from "@workspace/web3/utils/validation"

const isValid = isValidAddress("0x...")
const isAmountValid = isValidAmount("1.5")
const isTxValid = isValidTransactionHash("0x...")
```

### 5. Types

```tsx
import type { 
  WalletAddress, 
  TransactionHash, 
  Token,
  WalletState 
} from "@workspace/web3/types"

const token: Token = {
  address: "0x...",
  name: "My Token",
  symbol: "MTK",
  decimals: 18,
  chainId: 1
}
```

### 6. Chain Configuration

```tsx
import { 
  supportedChains, 
  getChainById, 
  isMainnetChain 
} from "@workspace/web3/config/chains"

const chain = getChainById(1) // Ethereum mainnet
const isMainnet = isMainnetChain(1) // true
```

### 7. ABIs

```tsx
import { ERC20_ABI } from "@workspace/web3/abi/erc20"
import { useReadContract } from "wagmi"

function TokenInfo({ tokenAddress }: { tokenAddress: string }) {
  const { data: name } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "name",
  })

  return <div>Token: {name}</div>
}
```

## 📁 Structure

```
packages/web3/
├── src/
│   ├── abi/           # Smart contract ABIs
│   │   ├── erc20.ts   # ERC20 standard ABI
│   │   └── index.ts
│   ├── components/    # React components
│   │   └── Web3Provider.tsx
│   ├── config/        # Configuration
│   │   ├── chains.ts  # Supported chains
│   │   ├── wagmi.ts   # Wagmi config
│   │   └── index.ts
│   ├── hooks/         # Custom React hooks
│   │   ├── useWalletInfo.ts
│   │   ├── useContractWrite.ts
│   │   └── index.ts
│   ├── types/         # TypeScript types
│   │   └── index.ts
│   ├── utils/         # Utility functions
│   │   ├── format.ts  # Format functions
│   │   ├── validation.ts # Validation functions
│   │   └── index.ts
│   └── index.ts       # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Customization

### Adding a New Chain

Edit `packages/web3/src/config/chains.ts`:

```tsx
import { newChain } from "viem/chains"

export const supportedMainnetChains: Chain[] = [
  mainnet,
  polygon,
  newChain, // Add new chain
]
```

### Adding a New ABI

Create a new file in `packages/web3/src/abi/`:

```tsx
// packages/web3/src/abi/myContract.ts
export const MY_CONTRACT_ABI = [
  // ABI definition here
] as const
```

### Adding a New Hook

Create a new file in `packages/web3/src/hooks/`:

```tsx
// packages/web3/src/hooks/useMyHook.ts
export function useMyHook() {
  // Hook logic here
}
```

## 🤝 Contributing

1. Add new features to the corresponding directory
2. Export in index.ts
3. Update README if needed
4. Test thoroughly before committing 