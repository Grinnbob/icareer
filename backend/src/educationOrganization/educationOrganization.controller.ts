import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEducationOrganizationDto } from './dto/create-educationOrganization.dto';
import { EducationOrganization } from './educationOrganization.model';
import { EducationOrganizationService } from './educationOrganization.service';

@ApiTags('EducationOrganization')
@Controller('educationOrganizations')
export class EducationOrganizationController {
  constructor(
    private educationOrganizationService: EducationOrganizationService,
  ) {}

  @ApiOperation({ summary: 'Create educationOrganization' })
  @ApiResponse({ status: 200, type: EducationOrganization })
  @Post()
  create(
    @Body() educationOrganizationDto: CreateEducationOrganizationDto,
  ): Promise<EducationOrganization> {
    return this.educationOrganizationService.createEducationOrganization(
      educationOrganizationDto,
    );
  }

  @ApiOperation({ summary: 'Get educationOrganizations' })
  @ApiResponse({ status: 200, type: [EducationOrganization] })
  @Get()
  getAll() {
    return this.educationOrganizationService.getAllEducationOrganizations();
  }
}
