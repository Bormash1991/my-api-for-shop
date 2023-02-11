import { SetMetadata } from '@nestjs/common';

export const roleKey = 'role';

export const Role = (role: string) => SetMetadata(roleKey, role);
