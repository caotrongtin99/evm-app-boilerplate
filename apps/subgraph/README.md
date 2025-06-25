# Subgraph Boilerplate

This is a Subgraph boilerplate for indexing blockchain data using The Graph Protocol.

## Prerequisites

- Node.js (v14+)
- pnpm
- Docker (for local development)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Generate AssemblyScript types:
```bash
pnpm codegen
```

3. Build the subgraph:
```bash
pnpm build
```

## Development

### Local Development

1. Start a local Graph Node:
```bash
docker-compose up
```

2. Create a local subgraph:
```bash
pnpm create-local
```

3. Deploy to local node:
```bash
pnpm deploy-local
```

### Production Deployment

1. Create a new subgraph on [The Graph Studio](https://thegraph.com/studio)

2. Deploy to The Graph:
```bash
pnpm deploy
```

## Project Structure

```
subgraph/
├── abis/              # Contract ABIs
├── src/              # AssemblyScript mappings
├── schema.graphql    # GraphQL schema
├── subgraph.yaml     # Subgraph manifest
└── package.json      # Dependencies and scripts
```

## Testing

Run tests:
```bash
pnpm test
```

## Resources

- [The Graph Documentation](https://thegraph.com/docs/)
- [AssemblyScript Documentation](https://www.assemblyscript.org/)
- [GraphQL Documentation](https://graphql.org/learn/) 