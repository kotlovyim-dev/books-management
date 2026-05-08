import { IsInt, IsString, MaxLength, MinLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  author!: string;

  @IsInt()
  @Min(1)
  pageCount!: number;
}
