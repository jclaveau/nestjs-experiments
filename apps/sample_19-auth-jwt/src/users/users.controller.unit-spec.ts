import { Test, TestingModule } from '@nestjs/testing'
import {
  UsersController,
  UsersService,
} from '.'

describe('Users Controller', () => {
  let controller: UsersController
  let service: UsersService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                username: 'username_1',
                password: 'password_1',
                name: 'User Name 1',
                email: 'user_1@app.com',
              },
              {
                username: 'username_2',
                password: 'password_2',
                name: 'User Name 2',
                email: 'user_2@app.com',
              },
              {
                username: 'username_3',
                password: 'password_3',
                name: 'User Name 3',
                email: 'user_3@app.com',
              },
            ]),
          },
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  describe('findAll()', () => {
    it('should return an array of users', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          username: 'username_1',
          password: 'password_1',
          name: 'User Name 1',
          email: 'user_1@app.com',
        },
        {
          username: 'username_2',
          password: 'password_2',
          name: 'User Name 2',
          email: 'user_2@app.com',
        },
        {
          username: 'username_3',
          password: 'password_3',
          name: 'User Name 3',
          email: 'user_3@app.com',
        },
      ])
    })
  })
})
