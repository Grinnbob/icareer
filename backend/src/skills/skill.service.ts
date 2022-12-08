import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './skill.model';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillRepository: typeof Skill) {}

  async create(dto: CreateSkillDto) {
    return this.skillRepository.create(dto);
  }
}
