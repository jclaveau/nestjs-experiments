import { Controller, Get, Request } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { Photo } from './photo.entity'
import { PhotoDto } from './photo.dto'

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('/create')
  create(@Request() request): Promise<Photo> {
    // console.log(request.query)
    const dto : PhotoDto = new PhotoDto(request.query)
    // console.log(dto)
    return this.photoService.create(dto)
  }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll()
  }
}
