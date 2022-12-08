import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEducationOrganizationDto } from './dto/create-educationOrganization.dto';
import { EducationOrganization } from './educationOrganization.model';

@Injectable()
export class EducationOrganizationService {
  constructor(
    @InjectModel(EducationOrganization)
    private educationOrganizationRepository: typeof EducationOrganization,
  ) {}

  async createEducationOrganization(dto: CreateEducationOrganizationDto) {
    return this.educationOrganizationRepository.create(dto);
  }

  async getAllEducationOrganizations() {
    const educationOrganizations =
      await this.educationOrganizationRepository.findAll({
        include: { all: true },
      });
    return educationOrganizations;
  }
}
