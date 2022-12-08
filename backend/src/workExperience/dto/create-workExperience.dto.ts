import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Company } from 'src/company/company.model';
import { User } from 'src/users/users.model';

export class CreateWorkExperienceDto {
  @ApiProperty({
    example: 'CEO',
    description: 'job Title',
  })
  @IsString({ message: 'Must be string' })
  readonly jobTitle: string;

  @ApiProperty({
    example: 'Moscow',
    description: 'job location',
  })
  @IsString({ message: 'Must be string' })
  readonly location?: string;

  @ApiProperty({
    example: 'Very good university',
    description: 'Education Organization description',
  })
  @IsString({ message: 'Must be string' })
  readonly description?: string;

  @ApiProperty({ example: new Date(), description: 'start date' })
  @IsDate({ message: 'Must be date' })
  readonly startDate?: Date | null;

  @ApiProperty({ example: new Date(), description: 'end date' })
  @IsDate({ message: 'Must be date' })
  readonly endDate?: Date | null;

  @ApiProperty({ example: false, description: 'Is work experience verified?' })
  @IsBoolean({ message: 'Must be boolean' })
  readonly isVerified?: boolean;

  @ApiProperty({ description: 'company' })
  readonly company?: Company;

  @ApiProperty({ description: 'user' })
  readonly user: User;
}
