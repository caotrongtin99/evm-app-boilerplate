"use client";

import React, { useState, useEffect } from "react";

// Types for the demo
interface UploadResult {
  hash: string;
  size: number;
  path?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
}

export default function IPFSCompleteDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadResult[]>([]);
  const [selectedHash, setSelectedHash] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [retrievedContent, setRetrievedContent] = useState<any>(null);
  const [contentType, setContentType] = useState<
    "image" | "json" | "text" | "unknown"
  >("unknown");

  // Mock upload function (in real implementation, this would use IPFS hooks)
  const mockUploadFile = async (file: File): Promise<UploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const result: UploadResult = {
      hash: mockHash,
      size: file.size,
      path: file.name,
    };

    setIsUploading(false);
    setUploadedFiles((prev) => [result, ...prev]);
    return result;
  };

  // Mock retrieve function
  const mockRetrieveContent = async (hash: string) => {
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

    setContentType(content.type as any);
    setRetrievedContent(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🌌 IPFS Complete Demo
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive showcase of InterPlanetary File System integration
            with React hooks, utilities, and components
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              📁 File Upload
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              🔍 Content Retrieval
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              🎨 NFT Metadata
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              📌 Pinning
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                📁 File Upload
                <span className="ml-2 text-sm font-normal text-gray-500">
                  Drag & Drop or Click
                </span>
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) await mockUploadFile(file);
                  }}
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  {isUploading ? (
                    <div className="space-y-4">
                      <div className="text-2xl">📤</div>
                      <div className="text-lg font-semibold">
                        Uploading to IPFS...
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {uploadProgress}% Complete
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-6xl">📁</div>
                      <div className="text-xl font-semibold">
                        Upload to IPFS
                      </div>
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
            </div>

            {/* NFT Metadata Upload */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                🎨 NFT Metadata
                <span className="ml-2 text-sm font-normal text-gray-500">
                  OpenSea Compatible
                </span>
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {`{
  "name": "Legendary Dragon #001",
  "description": "A magnificent fire-breathing dragon",
  "image": "ipfs://QmImageHash...",
  "attributes": [
    { "trait_type": "Element", "value": "Fire" },
    { "trait_type": "Rarity", "value": "Legendary" },
    { "trait_type": "Power", "value": 95 }
  ],
  "external_url": "https://your-dapp.com"
}`}
                </pre>
              </div>

              <button
                onClick={async () => {
                  const metadata: NFTMetadata = {
                    name: "Legendary Dragon #001",
                    description: "A magnificent fire-breathing dragon",
                    image: "ipfs://QmImageHash...",
                    attributes: [
                      { trait_type: "Element", value: "Fire" },
                      { trait_type: "Rarity", value: "Legendary" },
                      { trait_type: "Power", value: 95 },
                    ],
                  };

                  const blob = new Blob([JSON.stringify(metadata, null, 2)], {
                    type: "application/json",
                  });
                  const file = new File([blob], "nft-metadata.json", {
                    type: "application/json",
                  });
                  await mockUploadFile(file);
                }}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 font-semibold"
              >
                📤 Upload NFT Metadata to IPFS
              </button>
            </div>

            {/* Upload History */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">📋 Upload History</h2>

              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📂</div>
                  <div>No uploads yet. Try uploading some files!</div>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={file.hash}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono">
                          #{index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm truncate">
                            {file.hash}
                          </div>
                          <div className="text-xs text-gray-500">
                            {file.size} bytes
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedHash(file.hash)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(`ipfs://${file.hash}`)
                          }
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Retrieval & Display Section */}
          <div className="space-y-6">
            {/* Content Retrieval */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                🔍 Content Retrieval
                <span className="ml-2 text-sm font-normal text-gray-500">
                  Enter IPFS Hash
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={selectedHash}
                    onChange={(e) => setSelectedHash(e.target.value)}
                    placeholder="QmYourIPFSHash... or select from uploads"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() =>
                      selectedHash && mockRetrieveContent(selectedHash)
                    }
                    disabled={!selectedHash}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                  >
                    Retrieve
                  </button>
                </div>

                {/* Quick Fill Buttons */}
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-500 self-center">
                      Quick fill:
                    </span>
                    {uploadedFiles.slice(0, 3).map((file) => (
                      <button
                        key={file.hash}
                        onClick={() => setSelectedHash(file.hash)}
                        className="px-3 py-1 text-xs bg-gray-100 border rounded-lg hover:bg-gray-200 transition-colors font-mono"
                      >
                        {file.hash.slice(0, 12)}...
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Display */}
            {retrievedContent && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  📄 Retrieved Content
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    Type: {contentType.toUpperCase()}
                  </span>
                </h2>

                <div className="border rounded-lg p-4">
                  {contentType === "image" && (
                    <div className="text-center">
                      <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg p-8">
                        <div className="text-6xl mb-4">🖼️</div>
                        <div className="text-sm text-gray-600">
                          Image Content
                        </div>
                        <div className="text-xs text-gray-500 mt-2 font-mono">
                          {selectedHash}
                        </div>
                        <button
                          onClick={() =>
                            window.open(
                              `https://ipfs.io/ipfs/${selectedHash}`,
                              "_blank"
                            )
                          }
                          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Open in Gateway
                        </button>
                      </div>
                    </div>
                  )}

                  {contentType === "json" && (
                    <div>
                      <div className="mb-3 text-sm font-semibold text-gray-700">
                        JSON Data:
                      </div>
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                        {JSON.stringify(retrievedContent.data, null, 2)}
                      </pre>
                    </div>
                  )}

                  {contentType === "text" && (
                    <div>
                      <div className="mb-3 text-sm font-semibold text-gray-700">
                        Text Content:
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        {retrievedContent.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* IPFS Features Showcase */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">🌐 IPFS Features</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">🔗</div>
                  <div className="font-semibold text-sm">
                    Content Addressing
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Hash-based addressing
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="font-semibold text-sm">Distributed</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Peer-to-peer network
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="font-semibold text-sm">Immutable</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Tamper-proof content
                  </div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-semibold text-sm">Fast Retrieval</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Cached globally
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">
            ⚙️ Technical Implementation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🎣 React Hooks</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded font-mono">
                  useIPFSUpload()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  useIPFSRetrieve()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  useIPFSPin()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  useIPFSClient()
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🧩 Components</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded font-mono">
                  &lt;IPFSUploader /&gt;
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  &lt;IPFSImage /&gt;
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  &lt;IPFSViewer /&gt;
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  &lt;IPFSProvider /&gt;
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🔧 Utilities</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded font-mono">
                  uploadFile()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  uploadJSON()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  getGatewayUrl()
                </div>
                <div className="bg-gray-50 p-2 rounded font-mono">
                  pinContent()
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Ready for Production</h3>
          <p className="mb-4">
            This IPFS package is production-ready with TypeScript support, error
            handling, and comprehensive testing.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">
              Multiple Providers
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">
              React Integration
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">
              TypeScript
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">
              Error Handling
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
