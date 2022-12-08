import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { EducationOrganization } from 'src/educationOrganization/educationOrganization.model';
import { User } from 'src/users/users.model';
import { EducationType } from '../education.model';

export class CreateEducationDto {
  @ApiProperty({
    example: 'Master degree of physics',
    description: 'qualification name',
  })
  @IsString({ message: 'Must be string' })
  readonly qualificationName: string;

  @ApiProperty({
    example: EducationType.MASTER,
    description: 'qualification type',
  })
  readonly qualificationType: EducationType;

  @ApiProperty({
    description: 'Education Organization',
  })
  readonly educationOrganization?: EducationOrganization;

  @ApiProperty({ example: new Date(), description: 'start date' })
  @IsDate({ message: 'Must be date' })
  readonly startDate?: Date | null;

  @ApiProperty({ example: new Date(), description: 'end date' })
  @IsDate({ message: 'Must be date' })
  readonly endDate?: Date | null;

  @ApiProperty({ example: '1234 567890', description: 'diploma number' })
  @IsString({ message: 'Must be string' })
  readonly diplomaNumber?: string;

  @ApiProperty({ example: false, description: 'Is education verified?' })
  @IsBoolean({ message: 'Must be boolean' })
  readonly isVerified?: boolean;

  @ApiProperty({ description: 'user' })
  readonly user: User;
}
