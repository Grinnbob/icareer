import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './education.model';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
  ) {}

  async create(dto: CreateEducationDto) {
    return this.educationRepository.create(dto);
  }
}
