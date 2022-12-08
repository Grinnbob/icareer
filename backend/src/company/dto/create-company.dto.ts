import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Apple', description: 'Company name' })
  @IsString({ message: 'Must be string' })
  readonly name: string;

  @ApiProperty({ example: 'www.apple.com', description: 'Company website' })
  @IsString({ message: 'Must be string' })
  readonly website?: string;

  @ApiProperty({
    example: 'Some company info',
    description: 'Company description',
  })
  @IsString({ message: 'Must be string' })
  readonly description?: string;
}
