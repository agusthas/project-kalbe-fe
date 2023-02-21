export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  bio: string;
  avatar?: string;
}
