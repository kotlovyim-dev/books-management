import type { Roles } from '../../../../generated/prisma/client';

export type UserRole = Roles;

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
