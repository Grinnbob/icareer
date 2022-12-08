import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { SkillController } from './skill.controller';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Module({
  providers: [SkillService],
  controllers: [SkillController],
  imports: [SequelizeModule.forFeature([User, Skill])],
})
export class SkillModule {}
