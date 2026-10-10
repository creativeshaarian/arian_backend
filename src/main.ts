import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

function getCorsOrigins(config: ConfigService): string[] {
  const origins = new Set<string>();

  const frontendUrl = config.get<string>('FRONTEND_URL');
  if (frontendUrl) origins.add(frontendUrl.trim());

  const corsOrigins = config.get<string>('CORS_ORIGINS', '');
  for (const origin of corsOrigins.split(',')) {
    const trimmed = origin.trim();
    if (trimmed) origins.add(trimmed);
  }

  if (origins.size === 0) {
    origins.add('http://localhost:3000');
    origins.add('http://localhost:3001');
  }

  return Array.from(origins);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // Strip unknown fields (id, createdAt, etc.) instead of 400/500ing admin forms
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = getCorsOrigins(config);
      // Allow non-browser / same-origin tools
      if (!origin) return callback(null, true);
      if (allowed.includes(origin) || allowed.includes('*')) {
        return callback(null, true);
      }
      // Allow Vercel preview + production admin/front hosts when listed via CORS_ORIGINS
      if (
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  const port = config.get<number>('PORT', 3002);
  await app.listen(port);

  const apiUrl = config.get<string>('API_URL', `http://localhost:${port}`);
  console.log(`API running on ${apiUrl}/api`);
}

bootstrap();
