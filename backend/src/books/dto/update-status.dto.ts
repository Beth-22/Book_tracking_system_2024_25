import { IsInt, IsIn } from 'class-validator';

export class UpdateBookStatusDto {
  @IsInt()
  @IsIn([1, 2, 3]) // Restrict the status to 1 (Read), 2 (To Be Read), or 3 (Reading)
  status: number;
}
