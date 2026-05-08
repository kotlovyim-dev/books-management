import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Min,
} from 'class-validator';

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

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageCount?: number;
}
