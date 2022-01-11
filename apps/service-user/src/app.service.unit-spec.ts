import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AppService } from './app.service'
import { User, UserService } from './user/user.module'
import { constants, LocalStrategy, AuthService } from './auth'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: constants.jwt.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [],
      providers: [
        LocalStrategy,
        UserService,
        AuthService,
        AppService,
        {
          provide: getRepositoryToken(User),
          useValue: {
          },
        },
        {
          provide: 'JWT_MODULE_OPTIONS',
          useValue: {
          },
        },
      ],
    }).compile()

    appService = app.get<AppService>(AppService)
  })

  describe('app service', () => {
    it('should return "Coucou! :)"', () => {
      expect(appService.getHello()).toBe('Coucou! :)')
    })
  })
})
