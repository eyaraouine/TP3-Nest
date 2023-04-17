import { Controller } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';
import { GenericController } from '../generics/generics.controller';

@Controller('skill')
export class SkillController extends GenericController<SkillEntity,CreateSkillDto,UpdateSkillDto>{
  constructor(private readonly skillService: SkillService) {
    super(skillService); 
  }
}