import { Input } from "./input.js";

// Example usage of the Input component
export function InputExamples() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Input Component Examples</h2>

        {/* Basic Input */}
        <div>
          <h3 className="text-md font-medium mb-2">Basic Input</h3>
          <Input placeholder="Enter your name..." />
        </div>

        {/* Input with Label */}
        <div>
          <h3 className="text-md font-medium mb-2">With Label</h3>
          <Input
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />
        </div>

        {/* Input with Helper Text */}
        <div>
          <h3 className="text-md font-medium mb-2">With Helper Text</h3>
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            helperText="Must be at least 8 characters long"
          />
        </div>

        {/* Input with Error */}
        <div>
          <h3 className="text-md font-medium mb-2">With Error</h3>
          <Input
            label="Username"
            placeholder="username"
            error="Username is already taken"
            defaultValue="invalid-user"
          />
        </div>

        {/* Different Sizes */}
        <div>
          <h3 className="text-md font-medium mb-2">Different Sizes</h3>
          <div className="space-y-2">
            <Input inputSize="sm" placeholder="Small input" />
            <Input inputSize="default" placeholder="Default input" />
            <Input inputSize="lg" placeholder="Large input" />
          </div>
        </div>

        {/* Different Variants */}
        <div>
          <h3 className="text-md font-medium mb-2">Different Variants</h3>
          <div className="space-y-2">
            <Input variant="default" placeholder="Default variant" />
            <Input variant="success" placeholder="Success variant" />
            <Input variant="destructive" placeholder="Destructive variant" />
          </div>
        </div>

        {/* Disabled State */}
        <div>
          <h3 className="text-md font-medium mb-2">Disabled State</h3>
          <Input
            label="Disabled Input"
            placeholder="This is disabled"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
