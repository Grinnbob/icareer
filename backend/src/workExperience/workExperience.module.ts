import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from 'src/company/company.model';
import { User } from 'src/users/users.model';
import { WorkExperienceController } from './workExperience.controller';
import { WorkExperience } from './workExperience.model';
import { WorkExperienceService } from './workExperience.service';

@Module({
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
  imports: [SequelizeModule.forFeature([User, WorkExperience, Company])],
})
export class WorkExperienceModule {}
