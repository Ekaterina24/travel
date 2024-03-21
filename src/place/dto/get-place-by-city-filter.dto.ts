import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetPlaceByCityFilterDto {
  @IsOptional()
  @IsNotEmpty()
  cityId: number;
}
