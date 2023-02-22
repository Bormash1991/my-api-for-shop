import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: '' })
  readonly username: string;

  @IsDefined()
  @IsString({ message: '' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  readonly password: string;
}
