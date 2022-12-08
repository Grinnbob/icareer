import { Body, Controller, Post } from '@nestjs/common';
import { CreateWorkExperienceDto } from './dto/create-workExperience.dto';
import { WorkExperienceService } from './workExperience.service';

@Controller('posts')
export class WorkExperienceController {
  constructor(private workExperienceService: WorkExperienceService) {}

  @Post()
  createPost(@Body() dto: CreateWorkExperienceDto) {
    return this.workExperienceService.create(dto);
  }
}
