import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  //@ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  readonly value: string;

  //@ApiProperty({ example: '12345', description: 'User password' })
  readonly description: string;
}
