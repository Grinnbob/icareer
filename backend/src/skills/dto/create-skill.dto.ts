import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { User } from 'src/users/users.model';
import { SkillLevel } from '../skill.model';

export class CreateSkillDto {
  @ApiProperty({
    example: 'Java',
    description: 'skill name',
  })
  @IsString({ message: 'Must be string' })
  readonly name: string;

  @ApiProperty({
    example: 'programming',
    description: 'skill type',
  })
  @IsString({ message: 'Must be string' })
  readonly type?: string;

  @ApiProperty({
    example: SkillLevel.MIDDLE,
    description: 'Skill Level',
  })
  readonly level?: SkillLevel;

  @ApiProperty({ example: false, description: 'Is skill still active?' })
  @IsBoolean({ message: 'Must be boolean' })
  readonly isActive?: boolean;

  @ApiProperty({ description: 'user' })
  readonly user: User;
}
