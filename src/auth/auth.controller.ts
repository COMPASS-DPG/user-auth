import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/user/signIn")
  @ApiOperation({ summary: "login consumer by user email and password" })
  @ApiResponse({ status: HttpStatus.OK })
  async loginAsConsumer(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    try {
      const userToken = await this.authService.signInAsConsumer(
        createAuthDto.email,
        createAuthDto.password
      );
      return res.status(HttpStatus.OK).json({
        message: "login success",
        userToken: userToken,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post("/admin/signIn")
  @ApiOperation({ summary: "login user by userId and password" })
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    try {
      const userToken = await this.authService.signInAsAdmin(
        createAuthDto.email,
        createAuthDto.password
      );
      return res.status(HttpStatus.OK).json({
        message: "login success",
        userToken: userToken,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
