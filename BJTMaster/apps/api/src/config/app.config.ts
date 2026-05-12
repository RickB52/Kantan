import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  allowedOrigins: string[];
}

export default registerAs('app', (): AppConfig => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),
}));
