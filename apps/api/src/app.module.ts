import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";
import { Web3Module } from "./modules/web3/web3.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // requests per minute
      },
    ]),
    ScheduleModule.forRoot(),
    BlockchainModule,
    Web3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
