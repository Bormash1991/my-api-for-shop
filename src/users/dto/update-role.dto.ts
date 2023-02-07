import {
  IsIn,
} from 'class-validator';

export class UpdateRoleDto {
  @IsIn(['USER', 'ADMIN'], { message: 'must be ADMIN or USER' })
  readonly role: 'ADMIN' | 'USER';
}
