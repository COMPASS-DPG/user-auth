import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { UserRolesEnum } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: MockUserService
  ) {}

  public async signIn(email: string, pass: string, role:UserRolesEnum) {
    // Check email is valid or not
    const user = await this.userService.findOneByEmail(email);
    // If not a valid user then thow an error
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }
    // Check password is valid or not
    if (user?.password !== pass) {
      throw new UnauthorizedException("Incorrect password.");
    }
    // Check user is consumer or not otherwise throw an error
    if (!user.role.includes(role)) {
      throw new ForbiddenException(
        "Invalid user. Authentication failed."
      );
    }
    const payload = {
      userName: user.userName,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
