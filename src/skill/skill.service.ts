import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { GenericService } from '../generics/generics.service';

@Injectable()
export class SkillService extends GenericService<SkillEntity,CreateSkillDto,UpdateSkillDto> {
  constructor(@InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>) {
    super(skillRepository);
  }


  }

