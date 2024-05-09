import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPlaceByCityFilterDto {
  @IsOptional()
  @IsNotEmpty()
  cityId: number;

  @IsOptional()
  search: number;

  @IsOptional()
  category: string;

}
