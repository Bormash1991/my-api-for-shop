import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class deleteCommentDto {
  @IsDefined()
  @IsString({ message: 'must be a string ' })
  @IsNotEmpty({ message: 'must not be empty ' })
  readonly id: string;
}
