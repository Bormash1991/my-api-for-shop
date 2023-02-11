import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  Max,
} from 'class-validator';
export class AddCommentDto {
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly text: string;
  @Max(5, { message: 'must be less 5' })
  @IsDefined()
  @IsNumber({}, { message: 'must be a number ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly stars: number;
}
