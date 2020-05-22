import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { UserType } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(createDB: UserType): Promise<User> {
    const createdUser = new this.userModel(createDB);
    return createdUser.save();
  }

  async findByUserNameMongo(login: string): Promise<User> {
    return await this.userModel.findOne({ login }).exec();
  }
}
