import { Module, forwardRef } from "@nestjs/common";
import { MockUserService } from "./mock-user.service";
import { MockUserController } from "./mock-user.controller";
import { AuthModule } from "../../auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PrismaModule
  ],
  controllers: [MockUserController],
  providers: [MockUserService],
  exports: [MockUserService],
})
export class MockUserModule {}
