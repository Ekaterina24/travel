import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;
  }