import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MockUserService } from '../mockModules/mock-user/mock-user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: MockUserService
  ) { }

  public async signIn(email: string, pass: string) {
    // Check email is valid or not
    const user = await this.userService.findOneByEmail(email)
      
    // If not a valid user then thow an error
    if (!user) {
      // Handle the case when the user is not found.
      throw new Error("User not found");
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
