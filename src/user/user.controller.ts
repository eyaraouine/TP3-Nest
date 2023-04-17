import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from 'src/generics/generics.service';
import { UserEntity } from './entities/user.entity';
import { GenericController } from '../generics/generics.controller';

@Controller('user')
export class UserController extends GenericController<UserEntity,CreateUserDto,UpdateUserDto>{
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}