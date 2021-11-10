import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(createUserData: CreateUserInput): Promise<User> {
    return await this.userRepository.save(createUserData);
  }

  async update(updateUserData: UpdateUserInput): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(updateUserData.id);
    await this.userRepository.update(updateUserData.id, updateUserData);
    return await this.userRepository.findOne(updateUserData.id);
  }

  async remove(deleteUserData: DeleteUserInput): Promise<DeleteResult> {
    return await this.userRepository.delete(deleteUserData.id);
  }
}
