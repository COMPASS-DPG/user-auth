import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Res,
  UseGuards,
  Request,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";
import { UserRolesEnum } from "@prisma/client";
import { getPrismaErrorStatusAndMessage } from "../utils/utils";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  // API to sign in user as a consumer
  @Post("/signIn/user")
  @ApiOperation({ summary: "Login consumer by email and password" })
  @ApiResponse({ status: HttpStatus.OK })
  async loginAsConsumer(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    try {
      this.logger.log("Initated the login of user as a consumer.");
      const userToken = await this.authService.signIn(
        createAuthDto,
        UserRolesEnum.CONSUMER
      );
      this.logger.log("Successfully logged in as a consumer.");
      return res.status(HttpStatus.OK).json({
        message: "Login success",
        userToken: userToken,
      });
    } catch (error) {
      this.logger.log("Failed to login as a consumer.");
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // API to sign in user as a admin
  @Post("/signIn/admin")
  @ApiOperation({ summary: "Login admin by email and password" })
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    try {
      this.logger.log("Initated the login of user as an admin.");
      const userToken = await this.authService.signIn(
        createAuthDto,
        UserRolesEnum.ADMIN
      );
      this.logger.log("Successfully logged in as a admin.");
      return res.status(HttpStatus.OK).json({
        message: "Login success",
        userToken: userToken,
      });
    } catch (error) {
      this.logger.log("Failed to login as an admin.");
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to login as an admin.`,
      });
    }
  }

  // API to get the user details
  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiBearerAuth("jwt")
  getProfile(@Request() req, @Res() res) {
    try {
      this.logger.log(`Successfully fetched the user profile.`);
      return res.status(HttpStatus.OK).json({
        message: "Successfully fetched the user profile.",
        userProfile: req.user,
      });
    } catch (error) {
      this.logger.log("Failed to fetch user profile.");
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to fetch user profile.`,
      });
    }
  }
}
