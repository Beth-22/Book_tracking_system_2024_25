import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEnum([1, 2, 3])
  @IsOptional()
  status?: number;
}
