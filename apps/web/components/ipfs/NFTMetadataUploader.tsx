"use client";

import React, { useState } from "react";

// TODO: Import real hooks when package is built
// import { useIPFSUpload } from '@workspace/ipfs';

// Mock implementation until package is built
const useIPFSUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>(null);

  const uploadJSON = async (data: any) => {
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
        size: JSON.stringify(data).length,
        path: "metadata.json",
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
    uploadJSON,
    reset,
  };
};

interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: NFTAttribute[];
  external_url?: string;
  animation_url?: string;
  background_color?: string;
}

interface NFTMetadataUploaderProps {
  onUploadComplete?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
  preset?: "gaming" | "art" | "collectible" | "custom";
}

const presets = {
  gaming: {
    name: "Legendary Sword #001",
    description: "A powerful sword forged in the fires of Mount Doom",
    image: "ipfs://QmImageHash...",
    attributes: [
      { trait_type: "Weapon Type", value: "Sword" },
      { trait_type: "Rarity", value: "Legendary" },
      { trait_type: "Attack Power", value: 95 },
      { trait_type: "Durability", value: 100 },
      { trait_type: "Element", value: "Fire" },
    ],
  },
  art: {
    name: "Abstract Composition #42",
    description:
      "A vibrant digital artwork exploring the intersection of color and form",
    image: "ipfs://QmArtHash...",
    attributes: [
      { trait_type: "Style", value: "Abstract" },
      { trait_type: "Medium", value: "Digital" },
      { trait_type: "Color Palette", value: "Vibrant" },
      { trait_type: "Year", value: 2024 },
    ],
  },
  collectible: {
    name: "Rare Trading Card #123",
    description: "A limited edition trading card from the Genesis collection",
    image: "ipfs://QmCardHash...",
    attributes: [
      { trait_type: "Series", value: "Genesis" },
      { trait_type: "Edition", value: "Limited" },
      { trait_type: "Card Number", value: 123 },
      { trait_type: "Condition", value: "Mint" },
    ],
  },
};

export default function NFTMetadataUploader({
  onUploadComplete,
  onError,
  className = "",
  preset = "custom",
}: NFTMetadataUploaderProps) {
  const [metadata, setMetadata] = useState<NFTMetadata>(
    preset !== "custom"
      ? presets[preset]
      : {
          name: "",
          description: "",
          image: "",
          attributes: [],
        }
  );

  const { uploading, progress, error, result, uploadJSON, reset } =
    useIPFSUpload();

  const handleUpload = async () => {
    if (!metadata.name || !metadata.description || !metadata.image) {
      onError?.("Please fill in all required fields");
      return;
    }

    try {
      const result = await uploadJSON(metadata);
      onUploadComplete?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      onError?.(errorMessage);
    }
  };

  const addAttribute = () => {
    setMetadata((prev) => ({
      ...prev,
      attributes: [...(prev.attributes || []), { trait_type: "", value: "" }],
    }));
  };

  const removeAttribute = (index: number) => {
    setMetadata((prev) => ({
      ...prev,
      attributes: prev.attributes?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateAttribute = (
    index: number,
    field: keyof NFTAttribute,
    value: string | number
  ) => {
    setMetadata((prev) => ({
      ...prev,
      attributes:
        prev.attributes?.map((attr, i) =>
          i === index ? { ...attr, [field]: value } : attr
        ) || [],
    }));
  };

  const loadPreset = (presetName: keyof typeof presets) => {
    setMetadata(presets[presetName]);
    reset();
  };

  return (
    <div className={`nft-metadata-uploader ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            🎨 NFT Metadata
            <span className="ml-2 text-sm font-normal text-gray-500">
              OpenSea Compatible
            </span>
          </h2>

          {/* Preset Selector */}
          <div className="flex space-x-2">
            <button
              onClick={() => loadPreset("gaming")}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
            >
              Gaming
            </button>
            <button
              onClick={() => loadPreset("art")}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Art
            </button>
            <button
              onClick={() => loadPreset("collectible")}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Collectible
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Basic Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.name}
              onChange={(e) =>
                setMetadata((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter NFT name..."
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={metadata.description}
              onChange={(e) =>
                setMetadata((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your NFT..."
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image IPFS Hash <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.image}
              onChange={(e) =>
                setMetadata((prev) => ({ ...prev, image: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ipfs://QmImageHash... or upload image first"
              disabled={uploading}
            />
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                External URL
              </label>
              <input
                type="url"
                value={metadata.external_url || ""}
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    external_url: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-dapp.com"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Animation URL
              </label>
              <input
                type="text"
                value={metadata.animation_url || ""}
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    animation_url: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ipfs://QmAnimationHash..."
                disabled={uploading}
              />
            </div>
          </div>

          {/* Attributes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Attributes (Traits)
              </label>
              <button
                onClick={addAttribute}
                disabled={uploading}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                + Add Attribute
              </button>
            </div>

            {metadata.attributes && metadata.attributes.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {metadata.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="flex space-x-2 items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="text"
                      value={attr.trait_type}
                      onChange={(e) =>
                        updateAttribute(index, "trait_type", e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Trait type"
                      disabled={uploading}
                    />
                    <input
                      type="text"
                      value={attr.value}
                      onChange={(e) =>
                        updateAttribute(
                          index,
                          "value",
                          isNaN(Number(e.target.value))
                            ? e.target.value
                            : Number(e.target.value)
                        )
                      }
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Value"
                      disabled={uploading}
                    />
                    <button
                      onClick={() => removeAttribute(index)}
                      disabled={uploading}
                      className="px-2 py-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Preview:
            </div>
            <pre className="text-xs text-gray-600 overflow-x-auto max-h-32">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              !metadata.name ||
              !metadata.description ||
              !metadata.image
            }
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading... {progress}%</span>
              </div>
            ) : (
              "📤 Upload NFT Metadata to IPFS"
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Success Display */}
        {result && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-green-800 text-sm">
              <strong>✅ NFT Metadata uploaded successfully!</strong>
              <div className="mt-1 font-mono text-xs break-all">
                IPFS Hash: {result.hash}
              </div>
              <div className="text-xs">
                Use this URI in your smart contract:{" "}
                <code>ipfs://{result.hash}</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
