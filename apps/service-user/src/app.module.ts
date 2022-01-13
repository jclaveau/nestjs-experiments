import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'

import { getDBConfig } from './configs/ormconfig';
import './configs/dotenv';
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { AppService } from './app.service'
import { AppController } from './app.controller'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory: async () => {
        const dbConfig = await getDBConfig()
        return dbConfig
      }
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
