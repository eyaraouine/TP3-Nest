import { Injectable, NotFoundException } from '@nestjs/common';

import { DeepPartial, Equal, Repository} from 'typeorm';

@Injectable()
export class GenericService<T,AddDTO, UpdateDTO > {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.createQueryBuilder()
    .where('id = :id', { id })
    .getOne();
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} is not found`);
    }
    return entity;
  }

  async create(dto: AddDTO ): Promise<T> {
    return this.repository.save(dto as DeepPartial<T>);
  }

  async update(id: number, dto: UpdateDTO): Promise<T> {
    const entity=await this.repository.preload({
        id,
        ...(dto as DeepPartial<T>)
       })
       return await this.repository.save(entity);
  }

  async delete(id: number): Promise<T> {
    const entityToDelete = await this.repository.createQueryBuilder()
    .where('id = :id', { id })
    .getOne();
    if(!entityToDelete){
        throw new NotFoundException("Le skill d'id ${id} n'existe pas");
    }

        return await this.repository.remove(entityToDelete);
}

}
