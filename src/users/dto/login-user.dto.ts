import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
} from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  @IsString({ message: '' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: '' })
  @IsNotEmpty({ message: 'must not be empty' })
  readonly password: string;
}
