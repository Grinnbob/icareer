import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EducationOrganization } from 'src/educationOrganization/educationOrganization.model';
import { User } from 'src/users/users.model';
import { EducationController } from './education.controller';
import { Education } from './education.model';
import { EducationService } from './education.service';

@Module({
  providers: [EducationService],
  controllers: [EducationController],
  imports: [
    SequelizeModule.forFeature([User, Education, EducationOrganization]),
  ],
})
export class EducationModule {}
