import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: MockUserService
  ) {}

  public async signInAsConsumer(email: string, pass: string) {
    // Check email is valid or not
    const user = await this.userService.findOneByEmail(email);
    // If not a valid user then thow an error
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }
    // Check user is consumer or not otherwise throw an error
    if (!user.role.includes("CONSUMER")) {
      throw new Error("Not a valid User");
    }
    // Check password is valid or not
    if (user?.password !== pass) {
      throw new UnauthorizedException();
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

  public async signInAsAdmin(email: string, pass: string) {
    // Check email is valid or not
    const user = await this.userService.findOneByEmail(email);
    // If not a valid user then thow an error
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }
    // Check user is consumer or not otherwise throw an error
    if (!user.role.includes("ADMIN")) {
      throw new Error("Not a valid User");
    }
    // Check password is valid or not
    if (user?.password !== pass) {
      throw new UnauthorizedException();
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
