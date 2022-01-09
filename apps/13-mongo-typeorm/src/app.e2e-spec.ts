import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as chai from 'chai';
import * as like from 'chai-like';
import { AppModule } from './app.module';
// TODO ivestigate how to manipulate TypeOrm directly here
import { TypeOrmModule } from '@nestjs/typeorm';

describe('E2E Basic CRUD', () => {
  let app: INestApplication;

  chai.should();
  chai.use(like);
  const expect = chai.expect;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [
        AppModule,
        // TypeOrmModule
      ],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  const photo_1_data = {
    name: 'Photo 1',
    description: 'My first new photo',
    filename: 'my_first_photo.jpg',
    isPublished: "false",
  }

  const photo_2_data = {
    name: 'Photo 2',
    description: 'My second new photo',
    filename: 'my_second_photo.jpg',
    isPublished: "true",
  }

  it('should create a photo to initialize db and photo collection', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo/create')
      .query(photo_1_data)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => res.body.should.like(photo_1_data))
      ;
  });

  it('should flush the photos and return 200', async () => {
    await request(app.getHttpServer())
      .get('/photo/truncate')
      .expect(200)
      ;
  });

  it('should display an empty list', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([]);
  });

  it('should create a photo and return it', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo/create')
      .query(photo_1_data)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => res.body.should.like(photo_1_data))
      ;
  });

  it('should display a list of 1', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body).to.have.lengthOf(1))
      .expect(res => res.body[0].should.like(photo_1_data))
      ;
  });

  it('should create a second photo and return it', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo/create')
      .query(photo_2_data)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => res.body.should.like(photo_2_data))
      ;
  });

  it('should display a list of 2', async () => {
    const photos = await request(app.getHttpServer())
      .get('/photo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body).to.have.lengthOf(2))
      .expect(res => res.body[0].should.like(photo_1_data))
      .expect(res => res.body[1].should.like(photo_2_data))
      ;
  });

  afterAll(async () => {
    await app.close();
  });
});
