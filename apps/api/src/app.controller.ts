import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @ApiOperation({ summary: "Health check endpoint" })
  getHealth(): { status: string; timestamp: string; uptime: number } {
    return this.appService.getHealth();
  }

  @Get()
  @ApiOperation({ summary: "API information" })
  getInfo(): { name: string; version: string; description: string } {
    return this.appService.getInfo();
  }
}
