import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { AuthTokens, UserRole } from '@bjt/types';
import type { SignUpDto } from './dto/sign-up.dto';
import type { SignInDto } from './dto/sign-in.dto';

/** Minimal in-memory user store — replace with DB service in future tasks */
interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  private readonly users = new Map<string, StoredUser>();

  constructor(private readonly jwt: JwtService) {}

  async signUp(dto: SignUpDto): Promise<AuthTokens> {
    if (this.users.has(dto.email)) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const id = crypto.randomUUID();
    const user: StoredUser = { id, email: dto.email, passwordHash, role: 'user' };
    this.users.set(dto.email, user);

    return this.issueTokens(user);
  }

  async signIn(dto: SignInDto): Promise<AuthTokens> {
    const user = this.users.get(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokens(user);
  }

  private issueTokens(user: StoredUser): AuthTokens {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
