import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MockUserModule } from "../mockModules/mock-user/mock-user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    forwardRef(() => MockUserModule),
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to access configuration values.
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>("JWT_CONSTANT_SECRET");
        const jwtTokenExpiry = configService.get<string>("JWT_TOKEN_EXPIRY");
        return {
          secret: jwtSecret, // Get the JWT secret from the configuration.
          signOptions: { expiresIn: jwtTokenExpiry }, // Define token expiration time.
        };
      },
      inject: [ConfigService], // Inject the ConfigService to access configuration values.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
