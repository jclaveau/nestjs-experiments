import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, Repository } from "typeorm";
import { Photo } from './photo.entity';
import { PhotoDto } from './photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(createPhotoDTO: PhotoDto): Promise<Photo>{
    const manager = getMongoManager();
    const photo = new Photo();
    Object.assign(photo, createPhotoDTO);
    const newPhoto = await manager.save(photo);
    return newPhoto;
  }

  async findAll(): Promise<Photo[]> {
    // console.log(this.photoRepository)
    //https://stackoverflow.com/questions/69362941/cannot-read-property-prototype-of-undefined-nestjs-with-typeorm-and-mongodb
    return await this.photoRepository.find();
  }

  async truncate(): Promise<void> {
    return await this.photoRepository.clear();
  }
}
