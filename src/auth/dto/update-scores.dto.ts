import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class UpdateScoresDto {

    scores: number;

  }