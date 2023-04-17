import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dtos/add-cv.dto';
import { UpdateCvDto } from './dtos/update-cv.dto';
import { GenericService } from '../generics/generics.service';

@Injectable()
export class CvService extends GenericService<CvEntity,AddCvDto,UpdateCvDto> {
   
    constructor(@InjectRepository(CvEntity)
          private cvRepository:Repository<CvEntity>){
        super(cvRepository);
    }
}