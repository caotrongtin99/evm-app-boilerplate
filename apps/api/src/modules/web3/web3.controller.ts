import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from "@nestjs/swagger";
import { Web3Service } from "./web3.service";

@ApiTags("web3")
@Controller("web3")
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Get("chains")
  @ApiOperation({ summary: "Get supported blockchain networks" })
  getSupportedChains() {
    return this.web3Service.getSupportedChains();
  }

  @Get("balance/:address")
  @ApiOperation({ summary: "Get ETH balance for an address" })
  @ApiParam({ name: "address", description: "Wallet address" })
  @ApiQuery({
    name: "chainId",
    required: false,
    description: "Chain ID (default: 1)",
  })
  async getBalance(
    @Param("address") address: string,
    @Query("chainId") chainId?: string
  ) {
    const chain = chainId ? parseInt(chainId, 10) : 1;
    return this.web3Service.getBalance(address, chain);
  }

  @Get("token-balance/:tokenAddress/:walletAddress")
  @ApiOperation({ summary: "Get ERC20 token balance for an address" })
  @ApiParam({ name: "tokenAddress", description: "Token contract address" })
  @ApiParam({ name: "walletAddress", description: "Wallet address" })
  @ApiQuery({
    name: "chainId",
    required: false,
    description: "Chain ID (default: 1)",
  })
  async getTokenBalance(
    @Param("tokenAddress") tokenAddress: string,
    @Param("walletAddress") walletAddress: string,
    @Query("chainId") chainId?: string
  ) {
    const chain = chainId ? parseInt(chainId, 10) : 1;
    return this.web3Service.getTokenBalance(tokenAddress, walletAddress, chain);
  }

  @Get("block-number")
  @ApiOperation({ summary: "Get current block number" })
  @ApiQuery({
    name: "chainId",
    required: false,
    description: "Chain ID (default: 1)",
  })
  async getBlockNumber(@Query("chainId") chainId?: string) {
    const chain = chainId ? parseInt(chainId, 10) : 1;
    return { blockNumber: await this.web3Service.getBlockNumber(chain) };
  }

  @Get("transaction/:hash")
  @ApiOperation({ summary: "Get transaction details by hash" })
  @ApiParam({ name: "hash", description: "Transaction hash" })
  @ApiQuery({
    name: "chainId",
    required: false,
    description: "Chain ID (default: 1)",
  })
  async getTransaction(
    @Param("hash") hash: string,
    @Query("chainId") chainId?: string
  ) {
    const chain = chainId ? parseInt(chainId, 10) : 1;
    return this.web3Service.getTransaction(hash, chain);
  }
}
