import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { BlockchainService } from "./blockchain.service";

@ApiTags("blockchain")
@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get("network-stats")
  @ApiOperation({ summary: "Get network statistics" })
  @ApiQuery({
    name: "chainId",
    required: false,
    description: "Chain ID (default: 1)",
  })
  async getNetworkStats(@Query("chainId") chainId?: string) {
    const chain = chainId ? parseInt(chainId, 10) : 1;
    return this.blockchainService.getNetworkStats(chain);
  }
}
