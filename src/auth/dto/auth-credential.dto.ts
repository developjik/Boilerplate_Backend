import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  id: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  name: string;

  email: string;

  phone: string;
}
