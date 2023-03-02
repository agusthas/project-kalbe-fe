import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto';
import { UserEntity } from './entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@AuthUser('id') userId: number) {
    const user = await this.usersService.getById(userId, {
      withRelations: true,
    });
    return {
      status: 'success',
      data: new UserEntity(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMe(
    @AuthUser('id') userId: number,
    @Body() userData: UpdateUserDto,
  ) {
    const user = await this.usersService.update(userId, userData);
    return {
      status: 'success',
      data: new UserEntity(user),
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getById(+id, {
      withRelations: true,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      status: 'success',
      data: new UserEntity(user),
    };
  }
}
