# EVM DApp Boilerplate

A complete full-stack boilerplate for building EVM-based decentralized applications with modern tooling.

## 🏗️ Architecture

This monorepo contains:

- **Frontend** (`apps/web`): Next.js 15 + React 19 with Web3 integration
- **Backend** (`apps/api`): NestJS API with blockchain interaction capabilities
- **UI Package** (`packages/ui`): Shared shadcn/ui components
- **Web3 Package** (`packages/web3`): Shared Web3 utilities and hooks
- **IPFS Package** (`packages/ipfs`): IPFS integration with React hooks and utilities

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/caotrongtin99/evm-app-boilerplate
cd evm-dapp-boilerplate

# Install dependencies
pnpm install

# Copy environment file
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### Development

```bash
# Start both frontend and backend in development mode
pnpm dev

# Or start individually
pnpm dev --filter=web    # Frontend only
pnpm dev --filter=api    # Backend only
```

### URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs
- **IPFS Demo**: http://localhost:3000/demo/ipfs-complete

## 🔧 Tech Stack

### Frontend

- **Next.js 15** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **RainbowKit** for wallet connections
- **Wagmi** for Ethereum interactions
- **Viem** for blockchain interactions
- **IPFS** integration for decentralized storage

### Backend

- **NestJS** framework
- **TypeScript**
- **Viem** for blockchain interactions
- **Swagger** API documentation
- **Security** (Helmet, CORS, Rate limiting)

### Shared Packages

- **@workspace/ui**: Reusable UI components
- **@workspace/web3**: Web3 utilities and hooks
- **@workspace/eslint-config**: Shared ESLint configuration
- **@workspace/typescript-config**: Shared TypeScript configuration

## 🌐 Web3 Features

- Multi-chain support (Ethereum, Polygon, Arbitrum, Optimism, Base)
- Wallet connection with RainbowKit
- Token balance queries
- Transaction monitoring
- Smart contract interactions
- Testnet support

## 🌍 IPFS Features

- **File Upload**: Upload any file type to IPFS
- **Content Retrieval**: Retrieve and display content from IPFS hashes
- **NFT Metadata**: Create and upload OpenSea-compatible NFT metadata
- **Pin Management**: Pin/unpin content for persistent storage
- **React Hooks**: Easy-to-use hooks for IPFS operations
- **UI Components**: Pre-built components for file uploading and content display
- **Multiple Providers**: Support for different IPFS providers and gateways

## 📁 Project Structure

```
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── components/
│   │   │   └── ipfs/        # IPFS-specific components
│   │   └── src/app/demo/
│   │       └── ipfs-complete/ # Complete IPFS demo
│   └── api/                 # NestJS backend
├── packages/
│   ├── ui/                  # shadcn/ui components
│   ├── web3/                # Web3 utilities
│   ├── ipfs/                # IPFS utilities and hooks
│   │   ├── src/
│   │   │   ├── hooks/       # React hooks for IPFS
│   │   │   ├── utils/       # IPFS utility functions
│   │   │   ├── components/  # Reusable IPFS components
│   │   │   └── types/       # TypeScript type definitions
│   ├── eslint-config/       # ESLint configs
│   └── typescript-config/   # TypeScript configs
└── ...config files
```

## 🔄 Adding UI Components

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the components in `packages/ui/src/components`.

## 📦 Using Shared Packages

### UI Components

```tsx
import { Button } from "@workspace/ui/components/button";
```

### Web3 Hooks

```tsx
import { useWalletInfo } from "@workspace/web3/hooks/useWalletInfo";
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel deploy
```

### Backend (Railway/Heroku/Docker)

```bash
cd apps/api
pnpm build
pnpm start:prod
```

## 📝 Environment Variables

See `.env.local.example` for all required environment variables.

Key variables:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID
- `PORT`: API server port (default: 3001)
- `CORS_ORIGIN`: Allowed origins for CORS
- `NEXT_PUBLIC_IPFS_GATEWAY`: IPFS gateway URL (optional, defaults to ipfs.io)
- `IPFS_API_URL`: IPFS API endpoint (optional, for advanced IPFS operations)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
