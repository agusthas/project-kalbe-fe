import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserExistsRule } from './user-exists-rule';

@Module({
  providers: [UsersService, PrismaService, UserExistsRule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
