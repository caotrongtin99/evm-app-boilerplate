"use client";

import React from "react";

interface UploadResult {
  hash: string;
  size: number;
  path?: string;
  timestamp?: number;
}

interface UploadHistoryProps {
  uploads: UploadResult[];
  onSelectHash?: (hash: string) => void;
  onCopyHash?: (hash: string) => void;
  onRemove?: (hash: string) => void;
  className?: string;
  maxItems?: number;
}

export default function UploadHistory({
  uploads,
  onSelectHash,
  onCopyHash,
  onRemove,
  className = "",
  maxItems = 10,
}: UploadHistoryProps) {
  const handleCopy = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(`ipfs://${hash}`);
      onCopyHash?.(hash);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString();
  };

  const displayUploads = uploads.slice(0, maxItems);

  return (
    <div className={`upload-history ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">📋 Upload History</h2>
          {uploads.length > maxItems && (
            <span className="text-sm text-gray-500">
              Showing {maxItems} of {uploads.length}
            </span>
          )}
        </div>

        {uploads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📂</div>
            <div>No uploads yet. Try uploading some files!</div>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {displayUploads.map((upload, index) => (
              <div
                key={upload.hash}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono flex-shrink-0">
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-mono text-sm truncate"
                      title={upload.hash}
                    >
                      {upload.hash}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatFileSize(upload.size)}</span>
                      {upload.path && (
                        <>
                          <span>•</span>
                          <span className="truncate" title={upload.path}>
                            {upload.path}
                          </span>
                        </>
                      )}
                      {upload.timestamp && (
                        <>
                          <span>•</span>
                          <span>{formatTimestamp(upload.timestamp)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  {onSelectHash && (
                    <button
                      onClick={() => onSelectHash(upload.hash)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      title="Select for retrieval"
                    >
                      View
                    </button>
                  )}
                  <button
                    onClick={() => handleCopy(upload.hash)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    title="Copy IPFS URI"
                  >
                    Copy
                  </button>
                  {onRemove && (
                    <button
                      onClick={() => onRemove(upload.hash)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      title="Remove from history"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {uploads.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total uploads: {uploads.length}</span>
              <span>
                Total size:{" "}
                {formatFileSize(
                  uploads.reduce((acc, upload) => acc + upload.size, 0)
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
