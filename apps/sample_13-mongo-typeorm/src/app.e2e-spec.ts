import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { Photo } from './photo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppModule } from './app.module'

describe('E2E Basic CRUD', () => {
  let app: INestApplication
  let photoRepository: Repository<Photo>

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mongodb',
          host: 'localhost',
          database: '13-mongo-typeorm',
          entities: [Photo],
          synchronize: true,
        }),
        Repository,
        Photo,
        AppModule,
      ],
    }).compile()

    app = modRef.createNestApplication()

    photoRepository = app.get('PhotoRepository')
    try {
      await photoRepository.clear()
    } catch(e) {
      if (e.codeName == 'NamespaceNotFound') {
        console.log('Mongo photo collection already droped')
      } else {
        throw e
      }
    }

    await app.init()
  })

  const photo_1_data = {
    name: 'Photo 1',
    description: 'My first new photo',
    filename: 'my_first_photo.jpg',
    isPublished: 'false',
  }

  const photo_2_data = {
    name: 'Photo 2',
    description: 'My second new photo',
    filename: 'my_second_photo.jpg',
    isPublished: 'true',
  }

  it('should display an empty list', async () => {
    await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([])
  })

  it('should create a photo and return it', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/photo/create')
      .query(photo_1_data)
      .expect(200)
      .expect('Content-Type', /json/)
      

    expect(body)
      .toEqual({id: expect.any(String), ...photo_1_data})
  })

  it('should display a list of 1', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      

    expect(body)
      .toEqual([{id: expect.any(String), ...photo_1_data}])
  })

  it('should create a second photo and return it', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/photo/create')
      .query(photo_2_data)
      .expect(200)
      .expect('Content-Type', /json/)
      

    expect(body)
      .toEqual({id: expect.any(String), ...photo_2_data})
  })

  it('should display a list of 2', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      

    expect(body)
      .toEqual([
        {id: expect.any(String), ...photo_1_data},
        {id: expect.any(String), ...photo_2_data},
      ])
  })

  afterAll(async () => {
    await app.close()
  })
})
