import React, { useCallback, useState } from "react";
import { useIPFSUpload } from "../hooks";

export interface IPFSUploaderProps {
  onUpload?: (result: { hash: string; size: number }) => void;
  onError?: (error: string) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function IPFSUploader({
  onUpload,
  onError,
  accept,
  multiple = false,
  className,
  children,
}: IPFSUploaderProps) {
  const { uploading, progress, error, uploadFile } = useIPFSUpload();
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file) return;

      try {
        const result = await uploadFile(file);
        onUpload?.(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        onError?.(errorMessage);
      }
    },
    [uploadFile, onUpload, onError]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
    },
    [handleFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <div
      className={`ipfs-uploader ${className || ""} ${dragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={uploading}
        style={{ display: "none" }}
        id="ipfs-file-input"
      />
      <label htmlFor="ipfs-file-input" style={{ cursor: "pointer" }}>
        {children || (
          <div
            style={{
              padding: "2rem",
              border: "2px dashed #ccc",
              textAlign: "center",
            }}
          >
            {uploading ? (
              <div>
                <div>Uploading... {Math.round(progress)}%</div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "8px",
                      backgroundColor: "#007bff",
                      borderRadius: "4px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>📁 Click to upload or drag & drop files</div>
                <small>Upload to IPFS</small>
              </div>
            )}
          </div>
        )}
      </label>
      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>
      )}
    </div>
  );
}
