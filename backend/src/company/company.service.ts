import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
  ) {}

  async createCompany(dto: CreateCompanyDto) {
    return this.companyRepository.create(dto);
  }

  async getAllCompanies() {
    const companies = await this.companyRepository.findAll({
      include: { all: true },
    });
    return companies;
  }
}
