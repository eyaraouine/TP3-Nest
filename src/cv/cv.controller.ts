import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { CvService } from './cv.service';
import { AddCvDto } from './dtos/add-cv.dto';
import { UpdateCvDto } from './dtos/update-cv.dto';
import { GenericController } from '../generics/generics.controller';

@Controller('cv')
export class CvController extends GenericController<CvEntity,AddCvDto,UpdateCvDto> {
    constructor(private readonly cvService:CvService){
        super(cvService);
    }
}