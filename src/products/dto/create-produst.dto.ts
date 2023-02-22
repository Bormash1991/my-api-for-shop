import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
export class CreateProductDto {
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly name: string;
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly description: string;
  @Min(1, { message: 'must be more 1' })
  @Max(999999, { message: 'must be less 999999' })
  @IsDefined()
  @IsNumber({}, { message: 'must be a number ' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly price: number;
  @Min(1, { message: 'must be less 1' })
  @Max(2000, { message: 'must be less 2000' })
  @IsDefined()
  @IsNumber({}, { message: 'must be a number ' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly quantity: number;
  @Length(1, 50, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly guarantee: string;
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly color: string;
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly cssColor: string;
  @IsOptional()
  @Type(() => Array<string>)
  readonly otherIds: string;
  readonly files: string;
}
