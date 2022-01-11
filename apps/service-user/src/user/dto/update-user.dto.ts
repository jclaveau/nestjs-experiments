import { IsDefined, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
