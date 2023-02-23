import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: RequestWithUser) {
    const user = await this.usersService.getById(req.user.id, {
      withRelations: true,
    });
    return {
      status: 'success',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMe(
    @Request() req: RequestWithUser,
    @Body() userData: UpdateUserDto,
  ) {
    const user = await this.usersService.update(req.user.id, userData);
    return {
      status: 'success',
      data: user,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getById(+id, {
      withRelations: true,
    });
    delete user.password;
    return {
      status: 'success',
      data: user,
    };
  }
}
