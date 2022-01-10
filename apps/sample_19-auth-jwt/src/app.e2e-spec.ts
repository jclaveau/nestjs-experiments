import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './app.module'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('E2E JWT Sample', () => {
  let app: INestApplication

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule,
      ],
    }).compile()

    app = modRef.createNestApplication()
    await app.init()
  })

  it('should display "Coucou! :)"', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Coucou! :)')
      
  })

  it('should throw 401 Unauthorized if the credentials are wrong', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'unknown_user', password: 'changeme' })
      .expect(401)

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'wrong_password' })
      .expect(401)

  })

  it('should get a JWT then successfully make a call', async () => {
    // curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' })
      .expect(201)

    const token = loginReq.body.access_token
    return request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ userId: 1, username: 'john' })
  })

  afterAll(async () => {
    await app.close()
  })
})
