import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { Repository, getMongoManager } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

import { User } from './user'
import { AppModule } from './app.module'

describe('E2E JWT Sample', () => {
  let app: INestApplication
  let userRepository: Repository<User>

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          host: 'localhost',
          database: 'service-user',
          entities: [User],
          synchronize: true,
          useUnifiedTopology: true,
        }),
      ],
    }).compile()

    app = modRef.createNestApplication()

    userRepository = app.get(getRepositoryToken(User))
    try {
      await userRepository.clear()
    } catch(e) {
      if (e.codeName == 'NamespaceNotFound') {
        console.log('Mongo user collection already droped')
      } else {
        throw e
      }
    }

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
    // curl -X POST http://localhost:3000/auth/login -d '{"username": "user@app.com", "password": "password"}' -H "Content-Type: application/json"
    const manager = getMongoManager()
    const user = new User()
    Object.assign(user, {
      email: 'user@app.com',
      password: 'password',
    })
    const newUser = await manager.save(user)

    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user@app.com', password: 'password' })
      .expect(201)

    const token = loginReq.body.access_token
    // console.log(token)

    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'user@app.com',
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
