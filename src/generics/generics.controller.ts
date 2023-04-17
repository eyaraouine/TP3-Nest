import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { GenericService } from './generics.service';


@Controller()
export class GenericController<T,AddDTO,UpdateDTO> {
  constructor(private readonly service: GenericService<T,AddDTO,UpdateDTO >) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: AddDTO): Promise<T> {
    return this.service.create(dto);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() dto: UpdateDTO): Promise<T> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id: number): Promise<T> {
    return this.service.delete(id);
  }
}
