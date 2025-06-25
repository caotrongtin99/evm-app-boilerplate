import React, { useState } from "react";
import { getGatewayUrl, isValidIPFSHash } from "../utils";

export interface IPFSImageProps {
  hash: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  gateway?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export function IPFSImage({
  hash,
  alt,
  className,
  style,
  gateway,
  fallback,
  onLoad,
  onError,
}: IPFSImageProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!isValidIPFSHash(hash)) {
    return <div className="ipfs-image-error">Invalid IPFS hash</div>;
  }

  const imageUrl = getGatewayUrl(hash, gateway);

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setImageError(true);
    onError?.();
  };

  if (imageError) {
    return (
      <div className={`ipfs-image-fallback ${className || ""}`} style={style}>
        {fallback || <div>Failed to load image from IPFS</div>}
      </div>
    );
  }

  return (
    <div className={`ipfs-image-container ${className || ""}`} style={style}>
      {loading && <div className="ipfs-image-loading">Loading...</div>}
      <img
        src={imageUrl}
        alt={alt || `IPFS Image ${hash}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: loading ? "none" : "block",
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
