import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    console.log(process.env);

    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;

    const uri =`mongodb://${host}:${port}`;

    console.log('uri: ', uri);
    return { uri, useNewUrlParser:true , dbName: name };
  }
}
