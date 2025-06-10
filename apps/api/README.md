# Web3 DApp API

NestJS API backend for the Web3 DApp with blockchain integration capabilities.

## Features

- 🔗 Multi-chain support (Ethereum, Polygon, Arbitrum, Optimism, Base)
- 📊 Real-time blockchain data
- 🪙 Token balance queries
- 📈 Transaction monitoring
- 📚 Auto-generated Swagger documentation
- 🔒 Security headers and rate limiting

## Quick Start

### Development

```bash
# Start in development mode
pnpm dev

# Or from root
turbo dev --filter=api
```

### Production

```bash
# Build
pnpm build

# Start production server
pnpm start:prod
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Server
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Optional: Add RPC endpoints for better performance
ETHEREUM_RPC_URL=https://your-ethereum-rpc.com
POLYGON_RPC_URL=https://your-polygon-rpc.com
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Health check
- `GET /api/v1/` - API information

### Web3 Operations
- `GET /api/v1/web3/chains` - Supported blockchain networks
- `GET /api/v1/web3/balance/:address` - Get ETH balance
- `GET /api/v1/web3/token-balance/:tokenAddress/:walletAddress` - Get ERC20 token balance
- `GET /api/v1/web3/block-number` - Get current block number
- `GET /api/v1/web3/transaction/:hash` - Get transaction details

### Blockchain Operations
- `GET /api/v1/blockchain/network-stats` - Network statistics

## Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:3001/api/docs
- API JSON: http://localhost:3001/api/docs-json

## Architecture

```
src/
├── modules/
│   ├── web3/           # Web3 blockchain interactions
│   └── blockchain/     # Additional blockchain operations
├── common/             # Shared utilities
├── config/             # Configuration files
├── app.module.ts       # Main application module
├── app.controller.ts   # Root controller
├── app.service.ts      # Root service
└── main.ts            # Application entry point
```

## Dependencies

- **@nestjs/core** - Core NestJS framework
- **viem** - Ethereum library for blockchain interactions
- **@workspace/web3** - Shared Web3 utilities
- **@nestjs/swagger** - API documentation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing 