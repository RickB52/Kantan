import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/app.config';
import type { UserRole } from '@bjt/types';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<AppConfig>('app')?.jwtSecret ?? 'change-me',
    });
  }

  validate(payload: JwtPayload): Pick<JwtPayload, 'sub' | 'email' | 'role'> {
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
