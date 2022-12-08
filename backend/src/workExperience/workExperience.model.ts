import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { User } from 'src/users/users.model';

interface WorkExperienceCreateAttrs {
  jobTitle: string;
  location?: string;
  description?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  isVerified?: boolean;
  company?: Company;
  user: User;
}

@Table({ tableName: 'workExperiences' })
export class WorkExperience extends Model<
  WorkExperience,
  WorkExperienceCreateAttrs
> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Chief Executive Officer', description: 'Job title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  jobTitle: string;

  @ApiProperty({ example: 'Moscow', description: 'Job location' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate?: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate?: Date | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerified: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
