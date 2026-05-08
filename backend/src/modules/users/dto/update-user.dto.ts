import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import type { UserRole } from '../../auth/types/jwt-payload';

const USER_ROLES: UserRole[] = ['user', 'admin'];

function AtLeastOneField(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      propertyName,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          return args.constraints.some(
            (prop) => (args.object as Record<string, unknown>)[prop as string] !== undefined,
          );
        },
        defaultMessage() {
          return 'At least one field must be provided';
        },
      },
    });
  };
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password?: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRole;

  @AtLeastOneField(['name', 'email', 'password', 'role'], {
    message: 'At least one field must be provided',
  })
  private readonly _atLeastOne?: unknown;
}
