import { Body, Controller, Post } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillService } from './skill.service';

@Controller('posts')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post()
  createPost(@Body() dto: CreateSkillDto) {
    return this.skillService.create(dto);
  }
}
