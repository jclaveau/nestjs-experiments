import { IsDefined, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
