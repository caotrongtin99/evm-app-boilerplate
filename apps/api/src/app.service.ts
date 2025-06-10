import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly startTime = Date.now();

  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
    };
  }

  getInfo(): { name: string; version: string; description: string } {
    return {
      name: "Web3 DApp API",
      version: "1.0.0",
      description: "NestJS API for Web3 DApp with blockchain integration",
    };
  }
}
