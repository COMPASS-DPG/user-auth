import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMockUserDto } from "./dto/create-mock-user.dto";
import { ResponseMockUserDto } from "./dto/response-mock-user.dto";
import { UpdateMockUserDto } from "./dto/update-mock-user.dto";
import { MockUserService } from "./mock-user.service";
import { getPrismaErrorStatusAndMessage } from "src/utils/utils";

@Controller("user")
@ApiTags("mockFracService/user")
export class MockUserController {
  constructor(private readonly mockUserService: MockUserService) {}
  private readonly logger = new Logger(MockUserController.name);

  // API to create a new Mock user
  @Post()
  @ApiOperation({ summary: "create new mock user" })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseMockUserDto })
  async create(@Body() createMockUserDto: CreateMockUserDto, @Res() res) {
    try {
      this.logger.log("Initated the creation of a new user.");
      const user = await this.mockUserService.create(createMockUserDto);
      this.logger.log("Successfully created a new user.");
      return res
        .status(HttpStatus.OK)
        .json({ data: user, message: "Successfully created a new user." });
    } catch (error) {
      this.logger.log("Failed to create a new user.");
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed  to create a new user.`,
      });
    }
  }

  // API to fetch all mock users
  @Get()
  @ApiOperation({ summary: "get all mock user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseMockUserDto,
    isArray: true,
  })
  async findAll(@Res() res) {
    try {
      this.logger.log("Initated the fetching of all users.");
      const user = await this.mockUserService.findAll();
      this.logger.log("Successfully fetched all users.");
      return res
        .status(HttpStatus.OK)
        .json({ data: user, message: "Successfully fetched all users." });
    } catch (error) {
      this.logger.log("Failed to fetch all users.");
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to fetch all users.`,
      });
    }
  }

  // API to fetch a user with userId
  @Get(":userId")
  @ApiOperation({ summary: "get mock user by userId" })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseMockUserDto })
  async findOne(@Param("userId", ParseUUIDPipe) userId: string, @Res() res) {
    try {
      this.logger.log(`Initated the fetching of user with id ${userId}`);
      const user = await this.mockUserService.findOne(userId);
      this.logger.log("Successfully fetched the user.");
      return res
        .status(HttpStatus.OK)
        .json({ data: user, message: "Successfully fetched the user." });
    } catch (error) {
      this.logger.log(`Failed to fetch user with id#${userId}`);
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to fetch user with id#${userId}`,
      });
    }
  }

  // API to update a user with userId
  @Patch(":userId")
  @ApiOperation({ summary: "update mock user by userId" })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseMockUserDto })
  async update(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() updateMockUserDto: UpdateMockUserDto,
    @Res() res
  ) {
    try {
      this.logger.log(`Initiated updating user with id #${userId}.`);
      const user = await this.mockUserService.update(userId, updateMockUserDto);
      this.logger.log("Successfully updated the user.");
      return res
        .status(HttpStatus.OK)
        .json({ data: user, message: "Successfully updated the user." });
    } catch (error) {
      this.logger.log(`Failed to update user with id#${userId}`);
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to update user with id#${userId}`,
      });
    }
  }

  // API to delete a user by userId
  @Delete(":userId")
  @ApiOperation({ summary: "delete mock user by userId" })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseMockUserDto })
  async remove(@Param("userId", ParseUUIDPipe) userId: string, @Res() res) {
    try {
      this.logger.log(`Initiated deleting user with id #${userId}.`);
      const user = await this.mockUserService.remove(userId);
      this.logger.log("Successfully deleted the user.");
      return res
        .status(HttpStatus.OK)
        .json({ data: user, message: "Successfully deleted the user." });
    } catch (error) {
      this.logger.log(`Failed to delete user with id#${userId}`);
       const { errorMessage, statusCode } =
         getPrismaErrorStatusAndMessage(error);
       return res.status(statusCode).json({
         statusCode,
         message: errorMessage || `Failed to delete user with id#${userId}`,
       });
    }
  }
}
