import { getIPFSClient } from "./client";
import { CID } from "multiformats/cid";

export interface UploadOptions {
  pin?: boolean;
  progress?: (progress: any) => void;
  timeout?: number;
}

export interface UploadResult {
  hash: string;
  size: number;
  path?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
  background_color?: string;
  animation_url?: string;
}

/**
 * Upload a file to IPFS
 */
export async function uploadFile(
  file: File | Blob | Buffer | Uint8Array,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.unixfs) {
    throw new Error("UnixFS provider not available");
  }

  try {
    let data: Uint8Array;

    if (file instanceof File || file instanceof Blob) {
      data = new Uint8Array(await file.arrayBuffer());
    } else if (file instanceof Buffer) {
      data = new Uint8Array(file);
    } else {
      data = file;
    }

    const cid = await providers.unixfs.addBytes(data, {
      onProgress: options.progress,
    });

    return {
      hash: cid.toString(),
      size: data.length,
    };
  } catch (error) {
    console.error("Failed to upload file to IPFS:", error);
    throw error;
  }
}

/**
 * Upload JSON data to IPFS
 */
export async function uploadJSON<T = any>(
  data: T,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.json) {
    throw new Error("JSON provider not available");
  }

  try {
    const cid = await providers.json.add(data, {
      onProgress: options.progress,
    });

    const jsonString = JSON.stringify(data);

    return {
      hash: cid.toString(),
      size: new TextEncoder().encode(jsonString).length,
    };
  } catch (error) {
    console.error("Failed to upload JSON to IPFS:", error);
    throw error;
  }
}

/**
 * Upload string to IPFS
 */
export async function uploadString(
  text: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.strings) {
    throw new Error("Strings provider not available");
  }

  try {
    const cid = await providers.strings.add(text, {
      onProgress: options.progress,
    });

    return {
      hash: cid.toString(),
      size: new TextEncoder().encode(text).length,
    };
  } catch (error) {
    console.error("Failed to upload string to IPFS:", error);
    throw error;
  }
}

/**
 * Retrieve file from IPFS
 */
export async function getFile(hash: string): Promise<Uint8Array> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.unixfs) {
    throw new Error("UnixFS provider not available");
  }

  try {
    const cid = CID.parse(hash);
    const chunks: Uint8Array[] = [];

    for await (const chunk of providers.unixfs.cat(cid)) {
      chunks.push(chunk);
    }

    // Concatenate all chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  } catch (error) {
    console.error("Failed to retrieve file from IPFS:", error);
    throw error;
  }
}

/**
 * Retrieve JSON from IPFS
 */
export async function getJSON<T = any>(hash: string): Promise<T> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.json) {
    throw new Error("JSON provider not available");
  }

  try {
    const cid = CID.parse(hash);
    const data = await providers.json.get(cid);
    return data as T;
  } catch (error) {
    console.error("Failed to retrieve JSON from IPFS:", error);
    throw error;
  }
}

/**
 * Retrieve string from IPFS
 */
export async function getString(hash: string): Promise<string> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.strings) {
    throw new Error("Strings provider not available");
  }

  try {
    const cid = CID.parse(hash);
    const text = await providers.strings.get(cid);
    return text;
  } catch (error) {
    console.error("Failed to retrieve string from IPFS:", error);
    throw error;
  }
}

/**
 * Upload NFT metadata to IPFS
 */
export async function uploadNFTMetadata(
  metadata: NFTMetadata,
  options: UploadOptions = {}
): Promise<UploadResult> {
  return uploadJSON(metadata, options);
}

/**
 * Get IPFS gateway URL for a hash
 */
export function getGatewayUrl(hash: string, gateway?: string): string {
  const client = getIPFSClient();
  return gateway ? `${gateway}${hash}` : client.getGatewayUrl(hash);
}

/**
 * Check if a string is a valid IPFS hash
 */
export function isValidIPFSHash(hash: string): boolean {
  try {
    CID.parse(hash);
    return true;
  } catch {
    return false;
  }
}

/**
 * Pin content to IPFS (if using a pinning service)
 */
export async function pinContent(hash: string): Promise<void> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.kubo) {
    throw new Error("Kubo provider not available for pinning");
  }

  try {
    const cid = CID.parse(hash);
    await providers.kubo.pin.add(cid);
  } catch (error) {
    console.error("Failed to pin content:", error);
    throw error;
  }
}

/**
 * Unpin content from IPFS
 */
export async function unpinContent(hash: string): Promise<void> {
  const client = getIPFSClient();
  await client.initialize();

  const providers = client.getProviders();

  if (!providers.kubo) {
    throw new Error("Kubo provider not available for unpinning");
  }

  try {
    const cid = CID.parse(hash);
    await providers.kubo.pin.rm(cid);
  } catch (error) {
    console.error("Failed to unpin content:", error);
    throw error;
  }
}
