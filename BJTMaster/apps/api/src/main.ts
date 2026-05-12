import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*' });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3001);

  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
