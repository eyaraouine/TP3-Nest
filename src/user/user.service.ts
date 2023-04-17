import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GenericService } from '../generics/generics.service';

@Injectable()
export class UserService extends GenericService<UserEntity,CreateUserDto,UpdateUserDto> {
  constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
    super(userRepository);
  }

}
