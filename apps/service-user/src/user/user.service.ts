import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { getMongoManager, ObjectLiteral, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

/**
 * Update entity values accord Dto
 * @param entity
 * @param dto
 */
 export const mapFromDto = (entity: any, dto: any): void => {
  Object.keys(dto).forEach((key) => {
    entity[key] = dto[key];
  })
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User>{
    const manager = getMongoManager();
    const { email } = await this.findByEmail(createUserDTO.email);
    if (email){
      throw new BadRequestException('Email already in use');
    }

    const user = new User();
    user.active = true;
    user.confirmed = false;
    mapFromDto(user, createUserDTO);
    const newUser = await manager.save(user);
    return newUser;
  }

  async update(): Promise<User>{
    //TODO: Implement
    return
  }

  async delete(id: string): Promise<string> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      throw new Error('Trying to delete a non-existing user: '+id)
    }
    await this.userRepository.delete(id);
    return id;
  }

  async findAll(): Promise<User[]>{
    const users = await this.userRepository.find();
    users.map((user) => user.deletePassword());
    users.map((user) => user.deleteToken());
    return users
  }

  async findOne(query: ObjectLiteral): Promise<User | undefined> {
    return this.userRepository.findOne(query)
  }

  async findByCredentials(email: string, password: string): Promise<User|null> {
    const user = await this.findOne({
      where: {
        email: email,
        password: User.hashPassword(password),
      }
    });

    user && user.deletePassword()

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByToken(token: string): Promise<User> {
    return await this.userRepository.findOne({ where: { token } });
  }

  async findById(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async saveTokenToDB(userId: string, token: string): Promise<void>{
    const user = await this.userRepository.findOne(userId);

    if (! user)
      throw new Error('Trying to save a token for a non existing user')

    user.token = token;
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async signOut(userId: string): Promise<void>{
    const user = await this.findById(userId);
    user.token = null;
    await this.userRepository.save(user);
  }
}
