"use client";

import React, { useState } from "react";

// TODO: Import real hooks when package is built
// import { useIPFSRetrieve } from '@workspace/ipfs';

// Mock implementation until package is built
const useIPFSRetrieve = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const retrieveContent = async (hash: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock different content types
      const mockContents = {
        image: { type: "image", url: `https://ipfs.io/ipfs/${hash}` },
        json: {
          type: "json",
          data: {
            name: "Demo NFT",
            description: "A sample NFT from IPFS",
            image: `ipfs://${hash}`,
            attributes: [
              { trait_type: "Color", value: "Blue" },
              { trait_type: "Rarity", value: "Legendary" },
            ],
          },
        },
        text: {
          type: "text",
          content: `This is content retrieved from IPFS hash: ${hash}`,
        },
      };

      const randomType =
        Math.random() > 0.6 ? "json" : Math.random() > 0.3 ? "text" : "image";
      const content = mockContents[randomType];

      setData(content);
      setLoading(false);
      return content;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retrieval failed");
      setLoading(false);
      throw err;
    }
  };

  const reset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return {
    loading,
    data,
    error,
    retrieveContent,
    reset,
  };
};

interface ContentRetrieverProps {
  onContentRetrieved?: (content: any) => void;
  onError?: (error: string) => void;
  className?: string;
  placeholder?: string;
  quickFillOptions?: Array<{ hash: string; label: string }>;
}

export default function ContentRetriever({
  onContentRetrieved,
  onError,
  className = "",
  placeholder = "QmYourIPFSHash... or select from uploads",
  quickFillOptions = [],
}: ContentRetrieverProps) {
  const [selectedHash, setSelectedHash] = useState("");
  const { loading, data, error, retrieveContent, reset } = useIPFSRetrieve();

  const handleRetrieve = async () => {
    if (!selectedHash.trim()) return;

    try {
      const content = await retrieveContent(selectedHash.trim());
      onContentRetrieved?.(content);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Retrieval failed";
      onError?.(errorMessage);
    }
  };

  const handleQuickFill = (hash: string) => {
    setSelectedHash(hash);
    reset();
  };

  return (
    <div className={`content-retriever ${className}`}>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={selectedHash}
            onChange={(e) => setSelectedHash(e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={handleRetrieve}
            disabled={!selectedHash.trim() || loading}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
          >
            {loading ? "Retrieving..." : "Retrieve"}
          </button>
        </div>

        {/* Quick Fill Buttons */}
        {quickFillOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 self-center">
              Quick fill:
            </span>
            {quickFillOptions.slice(0, 3).map((option) => (
              <button
                key={option.hash}
                onClick={() => handleQuickFill(option.hash)}
                disabled={loading}
                className="px-3 py-1 text-xs bg-gray-100 border rounded-lg hover:bg-gray-200 transition-colors font-mono disabled:opacity-50"
              >
                {option.label || `${option.hash.slice(0, 12)}...`}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 text-sm">
              Retrieving content from IPFS...
            </span>
          </div>
        </div>
      )}

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

      {data && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-800 text-sm mb-3">
            <strong>✅ Content retrieved successfully!</strong>
            <span className="ml-2 text-xs bg-green-200 px-2 py-1 rounded">
              Type: {data.type.toUpperCase()}
            </span>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            {data.type === "image" && (
              <div className="text-center">
                <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg p-8">
                  <div className="text-6xl mb-4">🖼️</div>
                  <div className="text-sm text-gray-600">Image Content</div>
                  <div className="text-xs text-gray-500 mt-2 font-mono break-all">
                    {selectedHash}
                  </div>
                  <button
                    onClick={() => window.open(data.url, "_blank")}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Open in Gateway
                  </button>
                </div>
              </div>
            )}

            {data.type === "json" && (
              <div>
                <div className="mb-3 text-sm font-semibold text-gray-700">
                  JSON Data:
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border max-h-64">
                  {JSON.stringify(data.data, null, 2)}
                </pre>
              </div>
            )}

            {data.type === "text" && (
              <div>
                <div className="mb-3 text-sm font-semibold text-gray-700">
                  Text Content:
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  {data.content}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
