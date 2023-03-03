import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: value,
        },
      });

      if (!user) return true;
    } catch (e) {
      return false;
    }

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'User with this email already exists';
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
