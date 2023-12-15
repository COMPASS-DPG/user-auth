import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MockFracModule } from './mockModules/mock.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MockFracModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
