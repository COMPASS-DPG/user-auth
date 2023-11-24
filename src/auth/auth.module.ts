import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MockUserModule } from "src/mockModules/mock-user/mock-user.module";
import { jwtConstants } from "./constant";

@Module({
  imports: [
    PrismaModule,
    MockUserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
