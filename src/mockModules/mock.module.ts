import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { MockUserModule } from "./mock-user/mock-user.module";

@Module({
  imports: [
    MockUserModule,
    RouterModule.register([
      { path: "mockFracService/", module: MockUserModule }
    ]),
  ],
})
export class MockFracModule {}
