import { useState, useEffect, useCallback } from "react";
import {
  uploadFile,
  uploadJSON,
  uploadString,
  getFile,
  getJSON,
  getString,
  uploadNFTMetadata,
  getGatewayUrl,
  isValidIPFSHash,
  pinContent,
  unpinContent,
} from "./utils";
import type { UploadOptions, UploadResult, NFTMetadata } from "./utils";
import { getIPFSClient } from "./client";

export interface UseIPFSUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  result: UploadResult | null;
}

export interface UseIPFSRetrieveState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

/**
 * Hook for uploading files to IPFS
 */
export function useIPFSUpload() {
  const [state, setState] = useState<UseIPFSUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    result: null,
  });

  const uploadFileToIPFS = useCallback(
    async (
      file: File | Blob | Buffer | Uint8Array,
      options: UploadOptions = {}
    ) => {
      setState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: null,
      }));

      try {
        const result = await uploadFile(file, {
          ...options,
          progress: (bytes) => {
            setState((prev) => ({ ...prev, progress: bytes }));
            options.progress?.(bytes);
          },
        });

        setState((prev) => ({ ...prev, uploading: false, result }));
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        setState((prev) => ({
          ...prev,
          uploading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const uploadJSONToIPFS = useCallback(
    async <T = any>(data: T, options: UploadOptions = {}) => {
      setState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: null,
      }));

      try {
        const result = await uploadJSON(data, {
          ...options,
          progress: (bytes) => {
            setState((prev) => ({ ...prev, progress: bytes }));
            options.progress?.(bytes);
          },
        });

        setState((prev) => ({ ...prev, uploading: false, result }));
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        setState((prev) => ({
          ...prev,
          uploading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const uploadStringToIPFS = useCallback(
    async (text: string, options: UploadOptions = {}) => {
      setState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: null,
      }));

      try {
        const result = await uploadString(text, {
          ...options,
          progress: (bytes) => {
            setState((prev) => ({ ...prev, progress: bytes }));
            options.progress?.(bytes);
          },
        });

        setState((prev) => ({ ...prev, uploading: false, result }));
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        setState((prev) => ({
          ...prev,
          uploading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const uploadNFTMetadataToIPFS = useCallback(
    async (metadata: NFTMetadata, options: UploadOptions = {}) => {
      return uploadJSONToIPFS(metadata, options);
    },
    [uploadJSONToIPFS]
  );

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      result: null,
    });
  }, []);

  return {
    ...state,
    uploadFile: uploadFileToIPFS,
    uploadJSON: uploadJSONToIPFS,
    uploadString: uploadStringToIPFS,
    uploadNFTMetadata: uploadNFTMetadataToIPFS,
    reset,
  };
}

/**
 * Hook for retrieving data from IPFS
 */
export function useIPFSRetrieve<T = any>(hash?: string) {
  const [state, setState] = useState<UseIPFSRetrieveState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const getFileFromIPFS = useCallback(async (ipfsHash: string) => {
    if (!isValidIPFSHash(ipfsHash)) {
      throw new Error("Invalid IPFS hash");
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getFile(ipfsHash);
      setState((prev) => ({ ...prev, loading: false, data: data as T }));
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Retrieval failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const getJSONFromIPFS = useCallback(async (ipfsHash: string) => {
    if (!isValidIPFSHash(ipfsHash)) {
      throw new Error("Invalid IPFS hash");
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getJSON<T>(ipfsHash);
      setState((prev) => ({ ...prev, loading: false, data }));
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Retrieval failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const getStringFromIPFS = useCallback(async (ipfsHash: string) => {
    if (!isValidIPFSHash(ipfsHash)) {
      throw new Error("Invalid IPFS hash");
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getString(ipfsHash);
      setState((prev) => ({ ...prev, loading: false, data: data as T }));
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Retrieval failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  // Auto-fetch if hash is provided
  useEffect(() => {
    if (hash && isValidIPFSHash(hash)) {
      getJSONFromIPFS(hash).catch(() => {
        // Try as string if JSON fails
        getStringFromIPFS(hash).catch(() => {
          // Try as file if string fails
          getFileFromIPFS(hash).catch(console.error);
        });
      });
    }
  }, [hash, getJSONFromIPFS, getStringFromIPFS, getFileFromIPFS]);

  return {
    ...state,
    getFile: getFileFromIPFS,
    getJSON: getJSONFromIPFS,
    getString: getStringFromIPFS,
  };
}

/**
 * Hook for pinning/unpinning content
 */
export function useIPFSPin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pin = useCallback(async (hash: string) => {
    if (!isValidIPFSHash(hash)) {
      throw new Error("Invalid IPFS hash");
    }

    setLoading(true);
    setError(null);

    try {
      await pinContent(hash);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Pin failed";
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, []);

  const unpin = useCallback(async (hash: string) => {
    if (!isValidIPFSHash(hash)) {
      throw new Error("Invalid IPFS hash");
    }

    setLoading(true);
    setError(null);

    try {
      await unpinContent(hash);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unpin failed";
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, []);

  return {
    loading,
    error,
    pin,
    unpin,
  };
}

/**
 * Hook for IPFS client initialization
 */
export function useIPFSClient() {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      const client = getIPFSClient();
      await client.initialize();
      setInitialized(true);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Initialization failed";
      setError(errorMessage);
      setInitialized(false);
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      const client = getIPFSClient();
      await client.stop();
      setInitialized(false);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Stop failed";
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    initialize();

    return () => {
      stop();
    };
  }, [initialize, stop]);

  return {
    initialized,
    error,
    initialize,
    stop,
    getGatewayUrl,
    isValidIPFSHash,
  };
}
