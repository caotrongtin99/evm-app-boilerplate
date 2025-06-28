import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            EVM DApp Boilerplate
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Production-ready full-stack boilerplate for building decentralized
            applications on EVM-compatible blockchains with modern React,
            TypeScript, and comprehensive Web3 integrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
              ⚛️ React 19
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              🔗 RainbowKit
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
              🌐 Web3 Hooks
            </span>
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">
              🎨 Tailwind CSS
            </span>
            <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium">
              📝 TypeScript
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Explore Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the power of our comprehensive Web3 development stack with
            interactive demos and examples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* IPFS Demo */}
          <Link href="/demo/ipfs" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  🌌 IPFS Complete Demo
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive IPFS integration showcase with file upload,
                content retrieval, NFT metadata storage, and decentralized
                content distribution.
              </p>
              <div className="mt-4 text-sm text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                Try full IPFS features →
              </div>
            </div>
          </Link>

          {/* Web3 Integration */}
          <Link href="/demo/web3" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ⚡ Web3 Integration
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Multi-chain wallet connections, token balances, smart contract
                interactions with RainbowKit and Wagmi.
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                Connect & interact →
              </div>
            </div>
          </Link>

          {/* API Backend */}
          <Link href="/demo/api" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12l6-6m-6 6l6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  🔧 API Backend
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                NestJS backend with Swagger documentation, blockchain data
                fetching, and RESTful API endpoints.
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium group-hover:text-green-700 transition-colors">
                Test API endpoints →
              </div>
            </div>
          </Link>

          {/* Subgraph */}
          <Link href="/demo/subgraph" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  📊 Subgraph
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The Graph Protocol integration for indexing blockchain data with
                GraphQL queries and real-time updates.
              </p>
              <div className="mt-4 text-sm text-yellow-600 font-medium group-hover:text-yellow-700 transition-colors">
                Query blockchain data →
              </div>
            </div>
          </Link>

          {/* UI Components */}
          <Link href="/demo/ui" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  🎨 UI Components
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Beautiful, accessible UI components built with Tailwind CSS and
                Radix UI primitives.
              </p>
              <div className="mt-4 text-sm text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                Browse components →
              </div>
            </div>
          </Link>

          {/* TypeScript */}
          <Link href="/demo/typescript" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl text-white mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  📝 TypeScript
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Full TypeScript support with proper types for Web3, smart
                contracts, and API interactions.
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                See type examples →
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Tech Stack Overview */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🛠️ Tech Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies and best practices for scalable
              Web3 development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "Next.js 15", icon: "⚛️" },
              { name: "TypeScript", icon: "📝" },
              { name: "RainbowKit", icon: "🌈" },
              { name: "Wagmi", icon: "🔗" },
              { name: "Viem", icon: "⚡" },
              { name: "NestJS", icon: "🛡️" },
              { name: "Tailwind", icon: "🎨" },
              { name: "IPFS", icon: "🌌" },
              { name: "The Graph", icon: "📊" },
              { name: "Turborepo", icon: "🚀" },
              { name: "pnpm", icon: "📦" },
              { name: "Docker", icon: "🐳" },
            ].map((tech) => (
              <div key={tech.name} className="text-center">
                <div className="text-4xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium text-gray-700">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            🔗 Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="https://github.com/caotrongtin99/evm-app-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                Documentation
              </h3>
              <p className="text-gray-600">
                Complete setup guides and API references
              </p>
            </a>

            <a
              href="https://github.com/caotrongtin99/evm-app-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                GitHub Repository
              </h3>
              <p className="text-gray-600">
                Star, fork, and contribute to the project
              </p>
            </a>

            <a
              href="/api/v1/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                API Documentation
              </h3>
              <p className="text-gray-600">
                Interactive Swagger API documentation
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
