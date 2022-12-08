import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@ApiTags('Company')
@Controller('companys')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({ status: 200, type: Company })
  @Post()
  create(@Body() companyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(companyDto);
  }

  @ApiOperation({ summary: 'Get companies' })
  @ApiResponse({ status: 200, type: [Company] })
  @Get()
  getAll() {
    return this.companyService.getAllCompanies();
  }
}
