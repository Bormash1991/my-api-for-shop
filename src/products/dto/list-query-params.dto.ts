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
  IsInt,
} from 'class-validator';
export class ListQueryParamsDto {
  @IsOptional()
  @Length(1, 2000, { message: 'must be from 1 to 2000 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  sort: string;
  @Min(1)
  @Max(200)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  limit: number;
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  filter: string | string[];
}
