import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { getMongoManager, Repository } from "typeorm";
import { User, UserService, UserController } from '.'
export * from '.'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // Repository<User>
  ],
  exports: [UserService],
})
export class UserModule {}
