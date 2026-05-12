export type JLevel = 'J5' | 'J4' | 'J3' | 'J2' | 'J1' | 'J1+';
export type UserRole = 'user' | 'admin';
export type Locale = 'ja' | 'en' | 'vi';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  locale: Locale;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  targetRank: JLevel | null;
  currentRank: JLevel | null;
  dailyGoalMin: number;
  examTargetDate: Date | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}
