import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UserService } from '../user'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    return await this.userService.findByCredentials(username, password)
  }

  async login(user: any) {
    const contentToWriteInToken = {
      id: user.id,
      email: user.email,
    }

    return {
      access_token: this.jwtService.sign(contentToWriteInToken),
    }
  }
}
