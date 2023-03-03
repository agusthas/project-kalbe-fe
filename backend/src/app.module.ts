import {
  ClassSerializerInterceptor,
  HttpStatus,
  Module,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        serializers:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                req(req) {
                  req.body = req.raw.body;
                  return req;
                },
              },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
      },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        exceptionFactory: (errors) => {
          const errorMessages = {};
          errors.forEach((erorr) => {
            errorMessages[erorr.property] = Object.values(erorr.constraints);
          });
          return new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Validation failed',
            errors: errorMessages,
          });
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
