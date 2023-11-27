import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MockUserModule } from "../mockModules/mock-user/mock-user.module";

@Module({
  imports: [
    PrismaModule,
    MockUserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
