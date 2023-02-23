export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  phone: string;
  bio: string;
  avatar?: string;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}
