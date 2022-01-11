import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserService } from '.'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<User>

  const usersArray = ([
    {
      name: 'User #1',
      email: 'user_1@app.com',
      password: 'password_1',
      token: 'azertyu',
      active: true,
      confirmed: true,
    },
    {
      name: 'User #2',
      email: 'user_2@app.com',
      password: 'password_2',
      token: 'poiuytr',
      active: true,
      confirmed: true,
    },
  ])
  .map(userData => Object.assign(new User(), userData))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(
              usersArray
            ),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return an array of users', async () => {
    const users = await service.findAll()
    expect(users).toEqual(usersArray)
  })
})
