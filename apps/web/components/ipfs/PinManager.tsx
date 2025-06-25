"use client";

import React, { useState, useEffect } from "react";

// TODO: Import real hooks when package is built
// import { useIPFSPin } from '@workspace/ipfs';

// Mock implementation until package is built
const useIPFSPin = () => {
  const [pinnedItems, setPinnedItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const mockPins = [
    {
      hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      name: "my-awesome-nft.json",
      size: 1024,
      pinned: true,
      pinnedAt: new Date(Date.now() - 86400000).toISOString(),
      type: "metadata",
    },
    {
      hash: "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4",
      name: "profile-picture.jpg",
      size: 256000,
      pinned: true,
      pinnedAt: new Date(Date.now() - 172800000).toISOString(),
      type: "image",
    },
    {
      hash: "QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D",
      name: "dapp-data.json",
      size: 512,
      pinned: false,
      pinnedAt: null,
      type: "data",
    },
  ];

  const listPins = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPinnedItems(mockPins);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to list pins");
    } finally {
      setLoading(false);
    }
  };

  const pinContent = async (hash: string, name?: string) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setPinnedItems((prev) =>
        prev.map((item) =>
          item.hash === hash
            ? { ...item, pinned: true, pinnedAt: new Date().toISOString() }
            : item
        )
      );

      return { hash, pinned: true };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to pin content");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unpinContent = async (hash: string) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPinnedItems((prev) =>
        prev.map((item) =>
          item.hash === hash ? { ...item, pinned: false, pinnedAt: null } : item
        )
      );

      return { hash, pinned: false };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unpin content");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listPins();
  }, []);

  return {
    pinnedItems,
    loading,
    error,
    listPins,
    pinContent,
    unpinContent,
  };
};

interface PinItem {
  hash: string;
  name?: string;
  size: number;
  pinned: boolean;
  pinnedAt: string | null;
  type: "image" | "metadata" | "data" | "unknown";
}

interface PinManagerProps {
  onPinSuccess?: (hash: string) => void;
  onUnpinSuccess?: (hash: string) => void;
  onError?: (error: string) => void;
  className?: string;
  showAddPin?: boolean;
}

export default function PinManager({
  onPinSuccess,
  onUnpinSuccess,
  onError,
  className = "",
  showAddPin = true,
}: PinManagerProps) {
  const [newHash, setNewHash] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "pinned" | "unpinned">("all");

  const { pinnedItems, loading, error, listPins, pinContent, unpinContent } =
    useIPFSPin();

  const handlePin = async (hash: string, name?: string) => {
    try {
      await pinContent(hash, name);
      onPinSuccess?.(hash);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Pin failed";
      onError?.(errorMessage);
    }
  };

  const handleUnpin = async (hash: string) => {
    try {
      await unpinContent(hash);
      onUnpinSuccess?.(hash);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unpin failed";
      onError?.(errorMessage);
    }
  };

  const handleAddPin = async () => {
    if (!newHash.trim()) return;

    await handlePin(newHash.trim(), newName.trim() || undefined);
    setNewHash("");
    setNewName("");
    setShowAddForm(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "Not pinned";
    return (
      new Date(dateStr).toLocaleDateString() +
      " " +
      new Date(dateStr).toLocaleTimeString()
    );
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case "image":
        return "🖼️";
      case "metadata":
        return "📋";
      case "data":
        return "📊";
      default:
        return "📄";
    }
  };

  const filteredItems = pinnedItems.filter((item) => {
    if (filter === "pinned") return item.pinned;
    if (filter === "unpinned") return !item.pinned;
    return true;
  });

  return (
    <div className={`pin-manager ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold">📌 Pin Manager</h2>
            <span className="text-sm text-gray-500">
              {pinnedItems.filter((item) => item.pinned).length} pinned items
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Filter Buttons */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pinned")}
                className={`px-3 py-1 text-sm border-l border-gray-300 ${
                  filter === "pinned"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pinned
              </button>
              <button
                onClick={() => setFilter("unpinned")}
                className={`px-3 py-1 text-sm border-l border-gray-300 ${
                  filter === "unpinned"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Unpinned
              </button>
            </div>

            <button
              onClick={listPins}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              🔄 Refresh
            </button>

            {showAddPin && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                + Add Pin
              </button>
            )}
          </div>
        </div>

        {/* Add Pin Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Add New Pin</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IPFS Hash <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newHash}
                  onChange={(e) => setNewHash(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="my-file.json"
                  disabled={loading}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddPin}
                  disabled={loading || !newHash.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Pinning..." : "Pin Content"}
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading pins...</span>
          </div>
        )}

        {/* Pin List */}
        {!loading && (
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {filter === "all"
                  ? "No pins found"
                  : `No ${filter} items found`}
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.hash}
                  className={`p-4 border rounded-lg transition-all ${
                    item.pinned
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {getTypeIcon(item.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {item.name || "Unnamed"}
                          </div>
                          <div className="text-xs font-mono text-gray-500 truncate">
                            {item.hash}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📏 {formatFileSize(item.size)}</span>
                        <span>📅 {formatDate(item.pinnedAt)}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.pinned
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.pinned ? "📌 Pinned" : "⏸️ Unpinned"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(item.hash)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        title="Copy hash"
                      >
                        📋
                      </button>

                      <button
                        onClick={() =>
                          window.open(
                            `https://ipfs.io/ipfs/${item.hash}`,
                            "_blank"
                          )
                        }
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        title="View on IPFS gateway"
                      >
                        🔗
                      </button>

                      {item.pinned ? (
                        <button
                          onClick={() => handleUnpin(item.hash)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          Unpin
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePin(item.hash, item.name)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          Pin
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Summary */}
        {!loading && filteredItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              Total: {filteredItems.length} items • Pinned:{" "}
              {filteredItems.filter((item) => item.pinned).length} • Unpinned:{" "}
              {filteredItems.filter((item) => !item.pinned).length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
