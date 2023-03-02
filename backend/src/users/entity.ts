import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  phone: string;
  avatar: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
