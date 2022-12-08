import { Body, Controller, Post } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { EducationService } from './education.service';

@Controller('posts')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Post()
  createPost(@Body() dto: CreateEducationDto) {
    return this.educationService.create(dto);
  }
}
