import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User, UserService } from '../user/user.module'
import { constants, LocalStrategy, JwtStrategy, AuthService } from '.'

describe('AuthService', () => {
  let authService: AuthService
  let userRepository: Repository<User>

  const usersArray = ([
    {
      id: 1,
      name: 'User #1',
      email: 'user_1@app.com',
      password: 'password_1',
      token: 'azertyu',
      active: true,
      confirmed: true,
    },
    {
      id: 2,
      name: 'User #2',
      email: 'user_2@app.com',
      password: 'password_2',
      token: 'poiuytr',
      active: true,
      confirmed: true,
    },
  ])
  .map(userData => Object.assign(new User(), userData))

  const findOneMock = jest.fn()

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: constants.jwt.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        UserService,
        LocalStrategy,
        JwtStrategy,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: findOneMock,
            findAll: jest.fn().mockResolvedValue(usersArray),
          },
        },
      ],
    }).compile()

    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User))
    authService = moduleRef.get<AuthService>(AuthService)

    // console.log(userRepository)

    // const user = {
    //   id: 'azrtTYdFHJk',
    //   email: 'lala@lala.com',
    //   password: 'lala_password',
    // };
    // const findOneSpy = jest
    //   .spyOn(userRepository, 'findOne')
    //   .mockResolvedValue(Object.assign(new User, user));

    // const foundUser = await userRepository.findOne();
    // console.log(foundUser)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should return null when credentials are invalid', async () => {
    findOneMock.mockResolvedValueOnce(null)
    const res = await authService.validateUser('xxx', 'xxx')
    expect(res).toBeNull()
  })

  it('should return a user object when credentials are valid', async () => {
    findOneMock.mockResolvedValueOnce(usersArray[0])
    const user = await authService.validateUser('user_1@app.com', 'password_1')
    expect(user.id).toEqual(1)
  })

  it('should return JWT object when credentials are valid', async () => {
    const res = await authService.login({ username: 'user_1@app.com', userId: 1 })
    expect(res.access_token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
  })

})

