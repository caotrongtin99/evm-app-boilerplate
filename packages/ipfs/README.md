# @workspace/ipfs

A comprehensive IPFS package for Web3 DApps with React hooks, utilities, and components.

## Features

- 🚀 **Modern IPFS Stack**: Uses Helia and Kubo RPC client
- ⚛️ **React Integration**: Custom hooks and components
- 📦 **Multiple Providers**: Support for local nodes, Infura, Pinata
- 🎨 **UI Components**: Ready-to-use uploader and viewer components
- 🔧 **TypeScript**: Fully typed for better developer experience
- 📱 **Progressive**: Works in both browser and Node.js environments

## Installation

```bash
pnpm add @workspace/ipfs
```

## Quick Start

### 1. Setup Provider

```tsx
import { IPFSProvider } from '@workspace/ipfs';

function App() {
  return (
    <IPFSProvider config={{
      gatewayUrl: 'https://ipfs.io/ipfs/',
      infuraProjectId: 'your-project-id',
      infuraProjectSecret: 'your-project-secret',
    }}>
      <YourComponents />
    </IPFSProvider>
  );
}
```

### 2. Upload Files

```tsx
import { useIPFSUpload } from '@workspace/ipfs';

function FileUploader() {
  const { uploadFile, uploading, progress, result } = useIPFSUpload();

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      console.log('Uploaded:', result.hash);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files?.[0]!)} />
      {uploading && <div>Progress: {progress}%</div>}
      {result && <div>Hash: {result.hash}</div>}
    </div>
  );
}
```

### 3. Display Content

```tsx
import { IPFSImage, IPFSViewer } from '@workspace/ipfs';

function ContentDisplay() {
  return (
    <div>
      {/* Display an image from IPFS */}
      <IPFSImage 
        hash="QmYourImageHash" 
        alt="My NFT" 
        className="w-64 h-64"
      />
      
      {/* Auto-detect and display any content */}
      <IPFSViewer 
        hash="QmYourContentHash" 
        className="mt-4"
      />
    </div>
  );
}
```

## API Reference

### Hooks

#### `useIPFSUpload()`

Upload files, JSON, or strings to IPFS.

```tsx
const {
  uploading,     // boolean: upload in progress
  progress,      // number: upload progress (bytes)
  error,         // string | null: error message
  result,        // UploadResult | null: upload result
  uploadFile,    // (file: File) => Promise<UploadResult>
  uploadJSON,    // (data: any) => Promise<UploadResult>
  uploadString,  // (text: string) => Promise<UploadResult>
  uploadNFTMetadata, // (metadata: NFTMetadata) => Promise<UploadResult>
  reset,         // () => void: reset state
} = useIPFSUpload();
```

#### `useIPFSRetrieve<T>(hash?: string)`

Retrieve content from IPFS.

```tsx
const {
  loading,    // boolean: retrieval in progress
  data,       // T | null: retrieved data
  error,      // string | null: error message
  getFile,    // (hash: string) => Promise<Uint8Array>
  getJSON,    // (hash: string) => Promise<T>
  getString,  // (hash: string) => Promise<string>
} = useIPFSRetrieve<MyDataType>(optionalHash);
```

#### `useIPFSPin()`

Pin/unpin content on IPFS.

```tsx
const {
  loading,  // boolean: operation in progress
  error,    // string | null: error message
  pin,      // (hash: string) => Promise<void>
  unpin,    // (hash: string) => Promise<void>
} = useIPFSPin();
```

### Utilities

#### File Operations

```tsx
import {
  uploadFile,
  uploadJSON,
  uploadString,
  getFile,
  getJSON,
  getString,
  uploadNFTMetadata,
} from '@workspace/ipfs';

// Upload
const result = await uploadFile(file);
const jsonResult = await uploadJSON({ name: 'My NFT' });
const stringResult = await uploadString('Hello IPFS');

// Retrieve
const fileData = await getFile('QmHash');
const jsonData = await getJSON<MyType>('QmHash');
const textData = await getString('QmHash');

// NFT Metadata
const nftResult = await uploadNFTMetadata({
  name: 'My NFT',
  description: 'A unique digital asset',
  image: 'ipfs://QmImageHash',
  attributes: [
    { trait_type: 'Color', value: 'Blue' },
    { trait_type: 'Rarity', value: 'Rare' }
  ]
});
```

#### Helper Functions

```tsx
import {
  getGatewayUrl,
  isValidIPFSHash,
  pinContent,
  unpinContent,
} from '@workspace/ipfs';

// Gateway URL
const url = getGatewayUrl('QmHash'); // https://ipfs.io/ipfs/QmHash
const customUrl = getGatewayUrl('QmHash', 'https://cloudflare-ipfs.com/ipfs/');

// Validation
const isValid = isValidIPFSHash('QmHash');

// Pinning
await pinContent('QmHash');
await unpinContent('QmHash');
```

### Components

#### `<IPFSProvider>`

```tsx
<IPFSProvider config={{
  gatewayUrl?: string;           // Default gateway URL
  useLocalNode?: boolean;        // Use local IPFS node
  infuraProjectId?: string;      // Infura project ID
  infuraProjectSecret?: string;  // Infura project secret
  pinataApiKey?: string;         // Pinata API key
  pinataSecretKey?: string;      // Pinata secret key
}}>
  {children}
</IPFSProvider>
```

#### `<IPFSUploader>`

```tsx
<IPFSUploader
  onUpload={(result) => console.log(result)}
  onError={(error) => console.error(error)}
  accept="image/*"
  multiple={false}
  className="my-uploader"
>
  <CustomUploadUI />
</IPFSUploader>
```

#### `<IPFSImage>`

```tsx
<IPFSImage
  hash="QmImageHash"
  alt="My Image"
  className="w-full"
  gateway="https://cloudflare-ipfs.com/ipfs/"
  fallback={<div>Failed to load</div>}
  onLoad={() => console.log('Loaded')}
  onError={() => console.log('Error')}
/>
```

#### `<IPFSViewer>`

```tsx
<IPFSViewer
  hash="QmContentHash"
  type="auto" // 'auto' | 'image' | 'json' | 'text'
  className="viewer"
  gateway="https://ipfs.io/ipfs/"
/>
```

## Environment Configuration

Create a `.env.local` file:

```env
# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY_URL=https://ipfs.io/ipfs/
NEXT_PUBLIC_IPFS_USE_LOCAL_NODE=false

# Infura IPFS
NEXT_PUBLIC_INFURA_PROJECT_ID=your_project_id
NEXT_PUBLIC_INFURA_PROJECT_SECRET=your_project_secret

# Pinata
NEXT_PUBLIC_PINATA_API_KEY=your_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key
```

## Use Cases

### NFT Metadata Storage

```tsx
import { uploadNFTMetadata } from '@workspace/ipfs';

const mintNFT = async (metadata: NFTMetadata) => {
  // Upload metadata to IPFS
  const { hash } = await uploadNFTMetadata(metadata);
  
  // Use hash in smart contract
  const tokenURI = `ipfs://${hash}`;
  await nftContract.mint(userAddress, tokenURI);
};
```

### Decentralized File Storage

```tsx
import { useIPFSUpload } from '@workspace/ipfs';

function DocumentUploader() {
  const { uploadFile } = useIPFSUpload();
  
  const handleDocumentUpload = async (file: File) => {
    const { hash } = await uploadFile(file);
    
    // Store hash on blockchain or in your database
    await saveToBlockchain(hash);
  };
}
```

### Content Distribution

```tsx
import { IPFSViewer } from '@workspace/ipfs';

function ContentPlatform({ contentHash }: { contentHash: string }) {
  return (
    <div>
      <h1>Decentralized Content</h1>
      <IPFSViewer hash={contentHash} />
    </div>
  );
}
```

## Local Development

### Start Local IPFS Node

```bash
# Install IPFS
npm install -g ipfs

# Initialize and start
ipfs init
ipfs daemon
```

### Use with Local Node

```tsx
<IPFSProvider config={{ useLocalNode: true }}>
  <App />
</IPFSProvider>
```

## Best Practices

1. **Always validate IPFS hashes** before using them
2. **Use pinning services** for important content
3. **Implement fallbacks** for content that might not be available
4. **Consider multiple gateways** for better reliability
5. **Optimize file sizes** before uploading
6. **Use appropriate content types** for better performance

## Troubleshooting

### Common Issues

**CORS Errors**: Configure your IPFS node to allow browser requests:
```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
```

**Slow Loading**: Use multiple gateways and implement retry logic.

**Large Files**: Consider chunking large files before upload.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new functionality
4. Submit a pull request

## License

MIT 