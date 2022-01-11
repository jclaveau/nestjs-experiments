import { Controller, Get } from '@nestjs/common';
import { User, UserService } from '.';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
}
