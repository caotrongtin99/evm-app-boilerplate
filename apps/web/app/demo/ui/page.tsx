"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useState } from "react";

export default function UIDemo() {
  const [inputValue, setInputValue] = useState("");
  const [errorInput, setErrorInput] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 UI Components Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beautiful, accessible UI components built with Tailwind CSS and
            Radix UI primitives. Explore different variants and states below.
          </p>
        </div>

        {/* Button Components */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-lg p-2 mr-3">
                🔘
              </span>
              Button Components
            </h2>

            {/* Button Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Button States */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button className="opacity-75 cursor-not-allowed">Loading...</Button>
              </div>
            </div>

            {/* Buttons with Icons */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </Button>
                <Button variant="destructive">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </Button>
                <Button variant="destructive">
                  Delete
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Components */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-lg p-2 mr-3">
                📝
              </span>
              Input Components
            </h2>

            {/* Input Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  placeholder="Default input"
                  label="Default"
                  helperText="This is a default input"
                />
                <Input
                  placeholder="Success input"
                  variant="success"
                  label="Success"
                  helperText="This input is valid"
                />
                <Input
                  placeholder="Error input"
                  variant="destructive"
                  label="Error"
                  error="This field has an error"
                />
              </div>
            </div>

            {/* Input Sizes */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  placeholder="Small input"
                  inputSize="sm"
                  label="Small"
                />
                <Input
                  placeholder="Default input"
                  inputSize="default"
                  label="Default"
                />
                <Input
                  placeholder="Large input"
                  inputSize="lg"
                  label="Large"
                />
              </div>
            </div>

            {/* Input Types */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input
                  type="text"
                  placeholder="Enter text"
                  label="Text"
                />
                <Input
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                />
                <Input
                  type="password"
                  placeholder="Enter password"
                  label="Password"
                />
                <Input
                  type="number"
                  placeholder="Enter number"
                  label="Number"
                />
                <Input
                  type="tel"
                  placeholder="Enter phone"
                  label="Phone"
                />
                <Input
                  type="url"
                  placeholder="Enter URL"
                  label="URL"
                />
              </div>
            </div>

            {/* Interactive Example */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Interactive Example</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something..."
                    label="Controlled Input"
                    helperText={`You typed: ${inputValue.length} characters`}
                  />
                </div>
                <div>
                  <Input
                    value={errorInput}
                    onChange={(e) => setErrorInput(e.target.value)}
                    placeholder="Type to see validation"
                    label="Validation Example"
                    error={errorInput.length > 0 && errorInput.length < 3 ? "Must be at least 3 characters" : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3">
                🎨
              </span>
              Color Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="w-full h-16 bg-primary rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Primary</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-secondary rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Secondary</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-destructive rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Destructive</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-accent rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Accent</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-muted rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Muted</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-green-500 rounded-lg mb-2"></div>
                <p className="text-sm text-gray-600">Success</p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Combinations */}
        <section>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
                🔧
              </span>
              Component Combinations
            </h2>

            {/* Form Example */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Form Example</h3>
              <div className="max-w-md">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="John Doe"
                    label="Full Name"
                    helperText="Enter your full name"
                  />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    label="Email Address"
                  />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    label="Password"
                    helperText="Must be at least 8 characters"
                  />
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Group */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Action Groups</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive" size="sm">
                  Filter
                </Button>
                <Button variant="secondary" size="sm">
                  Sort
                </Button>
                <Button variant="secondary" size="sm">
                  Export
                </Button>
                <Button size="sm">
                  New Item
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="secondary" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
