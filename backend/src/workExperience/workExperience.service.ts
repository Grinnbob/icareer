import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { WorkExperience } from './workExperience.model';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectModel(WorkExperience)
    private workExperienceRepository: typeof WorkExperience,
  ) {}

  async create(dto: CreateWorkExperienceDto) {
    return this.workExperienceRepository.create(dto);
  }
}
