import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CombineModule } from './modules/combine.module';
import { ServicesModule } from './services/services.module';
import databaseConfig from './database/database.config';
import { LoggerModule } from './commons/logger/logger.module';
import { CustomRateLimitGuard } from './commons/guards/rate-limit.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig],
    }),
    LoggerModule,
    DatabaseModule,
    ServicesModule,
    CombineModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomRateLimitGuard,
    },
  ],
})
export class AppModule {}
