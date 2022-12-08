import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { WorkExperience } from 'src/workExperience/workExperience.model';

interface CompanyCreateAttrs {
  name: string;
  website?: string;
  description?: string;
}

@Table({ tableName: 'companies' })
export class Company extends Model<Company, CompanyCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Apple', description: 'Company name' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'www.apple.com', description: 'Company websie' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website?: string;

  @ApiProperty({
    example: 'Some company information',
    description: 'Company description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => WorkExperience)
  workExperiences: WorkExperience[];
}
