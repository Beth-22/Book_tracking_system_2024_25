import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEnum([1, 2, 3])
  @IsOptional()
  status?: number;
}
