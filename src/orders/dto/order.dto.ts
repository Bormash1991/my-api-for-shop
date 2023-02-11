import { OrderDetails } from '../shemas/orders.shema';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  IsArray,
  IsOptional,
} from 'class-validator';
export class OrderDto {
  @Length(1, 20, { message: 'must be from 1 to 20 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly username: string;
  @Length(1, 40, { message: 'must be from 1 to 40 letters' })
  @IsDefined()
  @IsNotEmpty({ message: 'must not be empty ' })
  @IsEmail()
  readonly email: string;
  @Length(1, 50, { message: 'must be from 1 to 50 letters' })
  @IsNotEmpty({ message: 'must not be empty ' })
  @IsDefined()
  @IsPhoneNumber('UA')
  readonly phone: string;
  @IsOptional()
  @Length(1, 500, { message: 'must be from 1 to 500 letters' })
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly text: string;
  @IsArray()
  @IsDefined()
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly order: Array<OrderDetails>;
}
