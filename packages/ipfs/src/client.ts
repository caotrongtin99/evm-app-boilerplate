import { create as createIpfsClient } from "kubo-rpc-client";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { json } from "@helia/json";
import { strings } from "@helia/strings";
import type { Helia } from "helia";
import type { UnixFS } from "@helia/unixfs";
import type { JSON } from "@helia/json";
import type { Strings } from "@helia/strings";

export interface IPFSConfig {
  gatewayUrl?: string;
  apiUrl?: string;
  pinataApiKey?: string;
  pinataSecretKey?: string;
  infuraProjectId?: string;
  infuraProjectSecret?: string;
  useLocalNode?: boolean;
}

export interface IPFSProviders {
  kubo?: any;
  helia?: Helia;
  unixfs?: UnixFS;
  json?: JSON;
  strings?: Strings;
}

export class IPFSClient {
  private config: IPFSConfig;
  private providers: IPFSProviders = {};
  private initialized = false;

  constructor(config: IPFSConfig = {}) {
    this.config = {
      gatewayUrl: config.gatewayUrl || "https://ipfs.io/ipfs/",
      apiUrl: config.apiUrl || "https://ipfs.infura.io:5001/api/v0",
      useLocalNode: config.useLocalNode || false,
      ...config,
    };
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize Kubo RPC client for HTTP API
      if (this.config.useLocalNode) {
        this.providers.kubo = createIpfsClient({
          url: "http://localhost:5001/api/v0",
        });
      } else if (this.config.infuraProjectId) {
        this.providers.kubo = createIpfsClient({
          url: "https://ipfs.infura.io:5001/api/v0",
          headers: {
            authorization: `Basic ${Buffer.from(
              `${this.config.infuraProjectId}:${this.config.infuraProjectSecret}`
            ).toString("base64")}`,
          },
        });
      }

      // Initialize Helia for modern IPFS features
      this.providers.helia = await createHelia();
      this.providers.unixfs = unixfs(this.providers.helia);
      this.providers.json = json(this.providers.helia);
      this.providers.strings = strings(this.providers.helia);

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize IPFS client:", error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (this.providers.helia) {
      await this.providers.helia.stop();
    }
    this.initialized = false;
  }

  getProviders(): IPFSProviders {
    if (!this.initialized) {
      throw new Error("IPFS client not initialized. Call initialize() first.");
    }
    return this.providers;
  }

  getGatewayUrl(hash: string): string {
    return `${this.config.gatewayUrl}${hash}`;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

// Singleton instance
let ipfsClient: IPFSClient | null = null;

export function getIPFSClient(config?: IPFSConfig): IPFSClient {
  if (!ipfsClient) {
    ipfsClient = new IPFSClient(config);
  }
  return ipfsClient;
}

export function setIPFSClient(client: IPFSClient): void {
  ipfsClient = client;
}
