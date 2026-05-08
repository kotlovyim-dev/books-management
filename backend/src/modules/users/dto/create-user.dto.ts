import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import type { UserRole } from '../../auth/types/jwt-payload';

const USER_ROLES: UserRole[] = ['user', 'admin'];

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password!: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRole;
}
