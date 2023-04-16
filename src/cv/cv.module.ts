import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CvEntity } from "./entities/cv.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([CvEntity])
],
  providers: [CvService],
  controllers: [CvController]
})
export class CvModule {}
