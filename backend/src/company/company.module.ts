import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkExperience } from 'src/workExperience/workExperience.model';
import { CompanyController } from './company.controller';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
  imports: [SequelizeModule.forFeature([WorkExperience, Company])],
})
export class CompanyModule {}
