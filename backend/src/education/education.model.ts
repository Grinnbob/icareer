import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EducationOrganization } from 'src/educationOrganization/educationOrganization.model';
import { User } from 'src/users/users.model';

export enum EducationType {
  TRAINING = 'TRAINING', // повышение квалификации / курсы
  PRE_MIDDLE = 'PRE_MIDDLE', // неоконченное среднее
  MIDDLE = 'MIDDLE', // среднее
  PRE_HIGHT = 'PRE_HIGHT', // неоконченное высшее
  SPECIALIST = 'SPECIALIST', // специалист
  BACHELOR = 'BACHELOR', // бакалавр
  MASTER = 'MASTER', // магистр
  PRE_PHD = 'PRE_PHD', // кандидат наук
  PHD = 'PHD', // доктор наук
}

interface EducationCreateAttrs {
  qualificationName: string;
  qualificationType: string;
  educationOrganization?: EducationOrganization;
  startDate?: Date | null;
  endDate?: Date | null;
  diplomaNumber?: string;
  isVerified?: boolean;
  user: User;
}

@Table({ tableName: 'educations' })
export class Education extends Model<Education, EducationCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  qualificationName: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(EducationType),
  })
  qualificationType: EducationType;

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
    type: DataType.STRING,
    allowNull: true,
  })
  diplomaNumber?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isVerified?: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => EducationOrganization)
  @Column({ type: DataType.INTEGER })
  educationOrganizationId: number;

  @BelongsTo(() => EducationOrganization)
  educationOrganization: EducationOrganization;
}
