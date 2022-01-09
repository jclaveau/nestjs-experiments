import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule, Photo } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: '13-mongo-typeorm',
      entities: [Photo],
      synchronize: true,
    }),
    PhotoModule,
  ],
})
export class AppModule {}
