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
export class UpdateProductDto {
  @IsOptional()
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly name: string;
  @IsOptional()
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly description: string;
  @IsOptional()
  @Min(1, { message: 'must be more 1' })
  @Max(999999, { message: 'must be less 999999' })
  @IsDefined()
  @IsNumber({}, { message: 'must be a number ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  @Type(() => Number)
  readonly price: number;
  @IsOptional()
  @Min(1, { message: 'must be less 1' })
  @Max(2000, { message: 'must be less 2000' })
  @IsDefined()
  @IsNumber({}, { message: 'must be a number ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  @Type(() => Number)
  quantity: number;
  @IsOptional()
  readonly files: string;
}
