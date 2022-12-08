import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Skill } from 'src/skills/skill.model';
import { Role } from 'src/roles/roles.model';
import { Education } from 'src/education/education.model';
import { WorkExperience } from 'src/workExperience/workExperience.model';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

interface UserCreateAttrs {
  email: string;
  password: string;
  roleId: number;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  location?: string | null;
  gender?: UserGender | null;
  birthDate?: Date | null;
  emailValidated: boolean;
  emailValidationCode?: string | null;
  emailValidationCodeSentAt?: Date | null;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string; // TODO: change to passwordHash

  @ApiProperty({ example: 'Grigoriy', description: 'User name' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName?: string | null;

  @ApiProperty({ example: 'Ivanov', description: 'User sername' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string | null;

  @ApiProperty({ example: '+7 999 000 88 77', description: 'User phone' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string | null;

  @ApiProperty({ example: 'Moscow', description: 'User location' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location?: string | null;

  @ApiProperty({ example: UserGender.MALE, description: 'User gender' })
  @Column({
    type: DataType.ENUM,
    allowNull: true,
    values: Object.values(UserGender),
  })
  gender?: UserGender | null;

  @ApiProperty({ example: 'male', description: 'User birthday' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate?: Date | null;

  @ApiProperty({ example: false, description: 'Email validation' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailValidated: boolean;

  @ApiProperty({ example: '1234abcd', description: 'Email validation code' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emailValidationCode?: string | null;

  @ApiProperty({ example: new Date(), description: 'Email validation date' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  emailValidationCodeSentAt?: Date | null;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Education)
  education: Education[];

  @HasMany(() => Skill)
  skills: Skill[];

  @HasMany(() => WorkExperience)
  workExperience: WorkExperience[];
}
