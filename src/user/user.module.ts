import { Module } from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
})
export class UserModule {}
