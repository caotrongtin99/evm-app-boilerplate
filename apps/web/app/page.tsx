import { Button, Input } from "@workspace/ui/components";
import { ERC20_ABI } from "@workspace/web3/abi";

export default function Page() {
  console.log({ ERC20_ABI });
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-muted">Hello World</h1>
        <Button size="sm">Button</Button>
        <Input />
      </div>
    </div>
  );
}
