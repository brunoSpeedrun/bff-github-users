import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';

import { Repository } from './interfaces/repository.interface';
import { RepositoryType } from './dto/create-repository.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Repository')
    private readonly repositoryModel: Model<Repository>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(createDB: any): Promise<User> {
    const createdUser = new this.userModel(createDB);
    return createdUser.save();
  }

  async findByUserNameMongo(login: string): Promise<User> {
    return await this.userModel.findOne({ login }).exec();
  }
  async findByRepoMongo(name: string): Promise<Repository[]> {
    return await this.repositoryModel.find({ login: name }).exec();
  }
  async createRepo(createDB: RepositoryType) {
    return await this.repositoryModel.insertMany(createDB);
  }
}
