import { Double } from "typeorm";

export class CreateCityDto {
    name: string;
    lat: Double;
    lon: Double;
  }