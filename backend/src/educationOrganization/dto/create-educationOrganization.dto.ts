import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EducationOrganizationType } from '../educationOrganization.model';

export class CreateEducationOrganizationDto {
  @ApiProperty({
    example: 'Moscow Institute of Physics and Technology',
    description: 'Education Organization name',
  })
  @IsString({ message: 'Must be string' })
  readonly name: string;

  @ApiProperty({
    example: 'MIPT',
    description: 'Education Organization short name',
  })
  @IsString({ message: 'Must be string' })
  readonly shortName?: string;

  @ApiProperty({
    example: 'Very good university',
    description: 'Education Organization description',
  })
  @IsString({ message: 'Must be string' })
  readonly description?: string;

  @ApiProperty({
    example: 'www.mipt.ru',
    description: 'Education Organization website',
  })
  @IsString({ message: 'Must be string' })
  readonly website?: string;

  @ApiProperty({
    example: EducationOrganizationType.UNIVERSITY,
    description: 'Education Organization type',
  })
  readonly type?: EducationOrganizationType;
}
