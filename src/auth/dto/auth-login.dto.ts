import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthLoginDto {

    @IsEmail()
    email: string;
  
    // @IsString()
    // @MinLength(8)
    // @MaxLength(20)
    // @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //   message: 'password too weak',
    // })
    password: string;
  }