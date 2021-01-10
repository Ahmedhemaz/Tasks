import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipeExceptionFactory } from './shared-kernal/exceptions/validation-pipe-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: validationPipeExceptionFactory
  }));
  await app.listen(3000);
}
bootstrap();
