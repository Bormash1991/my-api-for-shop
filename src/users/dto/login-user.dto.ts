import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
} from 'class-validator';

export class LoginUserDto {
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: 'must not be empty' })
  @IsNotEmpty({ message: 'must be a string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: 'must not be empty' })
  @IsNotEmpty({ message: 'must be a string' })
  readonly password: string;
}
