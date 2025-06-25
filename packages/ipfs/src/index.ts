// Core client
export { IPFSClient, getIPFSClient, setIPFSClient } from "./client";
export type { IPFSConfig, IPFSProviders } from "./client";

// Utilities
export {
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
export type { UploadOptions, UploadResult, NFTMetadata } from "./utils";

// React hooks
export {
  useIPFSUpload,
  useIPFSRetrieve,
  useIPFSPin,
  useIPFSClient,
} from "./hooks";
export type { UseIPFSUploadState, UseIPFSRetrieveState } from "./hooks";

// Components
export { IPFSProvider } from "./provider";
export { IPFSUploader } from "./components/IPFSUploader";
export { IPFSImage } from "./components/IPFSImage";
export { IPFSViewer } from "./components/IPFSViewer";

// Re-export common types
export type { CID } from "multiformats/cid";
