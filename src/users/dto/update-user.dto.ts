import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly username: string;
  @IsEmail({}, { message: 'incorrect email' })
  @IsOptional()
  readonly email: string;
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  readonly newPassword: string;
  @Length(3, 60, { message: 'must be from 3 to 60 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly password: string;
}
