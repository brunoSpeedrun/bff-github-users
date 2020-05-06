import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongose-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: () =>{
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT;
        const name = process.env.DB_NAME;

        const uri =`mongodb://${host}:${port}`;

        console.log('uri: ', uri);
        return { uri, useNewUrlParser:true , dbName: name };
      }

    }),

  ],
  providers:[MongooseConfigService]
})
export class AppModule {}
