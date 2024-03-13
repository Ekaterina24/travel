import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetPlacesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  q: string;

  @IsOptional()
  @IsNotEmpty()
  type: string;
}
