import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepository {
  constructor(@InjectModel('User') private productModel: Model<User>){}
}
