import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MockUserService } from "../mockModules/mock-user/mock-user.service";
import { UserRolesEnum } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(()=>MockUserService))
    private userService: MockUserService
  ) {}

  public async signIn(createAuthDto:CreateAuthDto, role: UserRolesEnum) {
    // Check email is valid or not
    const user = await this.userService.findOneByEmail(createAuthDto.email);
    // If not a valid user then thow an error
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }
    // Compare the entered password with the password fetched from database
    const isPasswordValid = await this.comparePasswords(
      user.password,
      createAuthDto.password
    );
    // Check password is valid or not
    if (!isPasswordValid) throw new BadRequestException("Incorrect password");

    // Check user is consumer or not otherwise throw an error
    if (!user.role.includes(role)) {
      throw new ForbiddenException("Invalid user. Authentication failed.");
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

  // generate hash for a given password
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  public async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
