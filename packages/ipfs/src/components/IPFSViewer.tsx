import React from "react";
import { useIPFSRetrieve } from "../hooks";
import { IPFSImage } from "./IPFSImage";

export interface IPFSViewerProps {
  hash: string;
  type?: "auto" | "image" | "json" | "text";
  className?: string;
  style?: React.CSSProperties;
  gateway?: string;
}

export function IPFSViewer({
  hash,
  type = "auto",
  className,
  style,
  gateway,
}: IPFSViewerProps) {
  const { loading, data, error } = useIPFSRetrieve(hash);

  if (loading) {
    return (
      <div className={`ipfs-viewer-loading ${className || ""}`} style={style}>
        Loading IPFS content...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`ipfs-viewer-error ${className || ""}`} style={style}>
        Error loading content: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`ipfs-viewer-empty ${className || ""}`} style={style}>
        No content found
      </div>
    );
  }

  // Auto-detect content type if not specified
  if (type === "auto") {
    if (typeof data === "object") {
      type = "json";
    } else if (typeof data === "string") {
      type = "text";
    } else if (data instanceof Uint8Array) {
      // Check if it's an image by trying to detect image headers
      const view = new DataView(data.buffer);
      const firstBytes = view.getUint32(0);

      // Common image format signatures
      if (
        firstBytes === 0x89504e47 || // PNG
        firstBytes === 0xffd8ffe0 || // JPEG
        firstBytes === 0x47494638 // GIF
      ) {
        type = "image";
      } else {
        type = "text";
      }
    }
  }

  const renderContent = () => {
    switch (type) {
      case "image":
        return (
          <IPFSImage
            hash={hash}
            gateway={gateway}
            className={className}
            style={style}
          />
        );

      case "json":
        return (
          <pre className="ipfs-json-content">
            {JSON.stringify(data, null, 2)}
          </pre>
        );

      case "text":
        return (
          <div className="ipfs-text-content">
            {typeof data === "string"
              ? data
              : new TextDecoder().decode(data as Uint8Array)}
          </div>
        );

      default:
        return <div className="ipfs-unknown-content">Unknown content type</div>;
    }
  };

  return (
    <div className={`ipfs-viewer ${className || ""}`} style={style}>
      {renderContent()}
    </div>
  );
}
