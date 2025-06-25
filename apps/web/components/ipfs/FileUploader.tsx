"use client";

import React from "react";

// TODO: Import real hooks when package is built
// import { useIPFSUpload } from '@workspace/ipfs';

// Mock implementation until package is built
const useIPFSUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      const mockResult = {
        hash: mockHash,
        size: file.size,
        path: file.name,
      };

      setResult(mockResult);
      setUploading(false);
      return mockResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploading(false);
      throw err;
    }
  };

  const uploadJSON = async (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const file = new File([blob], "data.json", { type: "application/json" });
    return uploadFile(file);
  };

  const reset = () => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  };

  return {
    uploading,
    progress,
    error,
    result,
    uploadFile,
    uploadJSON,
    reset,
  };
};

interface FileUploaderProps {
  onUploadComplete?: (result: any) => void;
  onError?: (error: string) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function FileUploader({
  onUploadComplete,
  onError,
  accept,
  multiple = false,
  className = "",
  children,
}: FileUploaderProps) {
  const { uploading, progress, error, result, uploadFile, reset } =
    useIPFSUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];
      if (!file) return;
      const result = await uploadFile(file);
      onUploadComplete?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      onError?.(errorMessage);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];
      if (!file) return;
      const result = await uploadFile(file);
      onUploadComplete?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      onError?.(errorMessage);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`file-uploader ${className}`}>
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          {uploading ? (
            <div className="space-y-4">
              <div className="text-2xl">📤</div>
              <div className="text-lg font-semibold">Uploading to IPFS...</div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">{progress}% Complete</div>
            </div>
          ) : children ? (
            children
          ) : (
            <div className="space-y-3">
              <div className="text-6xl">📁</div>
              <div className="text-xl font-semibold">Upload to IPFS</div>
              <div className="text-gray-600">
                Support all file types: images, videos, documents, JSON
              </div>
              <div className="text-sm text-blue-600">
                Click here or drag files to upload
              </div>
            </div>
          )}
        </label>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm">
            <strong>Error:</strong> {error}
          </div>
          <button
            onClick={reset}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Try again
          </button>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-800 text-sm">
            <strong>✅ Upload successful!</strong>
            <div className="mt-1 font-mono text-xs break-all">
              Hash: {result.hash}
            </div>
            <div className="text-xs">Size: {result.size} bytes</div>
          </div>
        </div>
      )}
    </div>
  );
}
