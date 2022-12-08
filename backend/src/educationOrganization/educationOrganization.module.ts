import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from 'src/education/education.model';
import { EducationOrganizationController } from './educationOrganization.controller';
import { EducationOrganization } from './educationOrganization.model';
import { EducationOrganizationService } from './educationOrganization.service';

@Module({
  providers: [EducationOrganizationService],
  controllers: [EducationOrganizationController],
  imports: [SequelizeModule.forFeature([Education, EducationOrganization])],
})
export class EducationOrganizationModule {}
