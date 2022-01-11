import {Md5} from 'ts-md5/dist/md5'
import * as bcrypt from 'bcrypt'
import { Column, Entity, ObjectID, ObjectIdColumn, BeforeInsert} from 'typeorm'

@Entity()
export class User {

  async deletePassword() : Promise<User>{
    delete this['password']
    return this
  }

  async deleteToken() : Promise<User> {
    delete this['token']
    return this
  }

  @BeforeInsert()
  async beforeInsert() {
    this.password = Md5.hashStr(this.password)
  }

  public static hashPassword(password: string): string {
    return Md5.hashStr(password)
  }

  hasPassword(password: string): boolean {
    return bcrypt.compareSync(User.hashPassword(password), this.password)
  }

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  token: string

  @Column({ name: 'confirmToken', nullable: true })
  confirmToken: string

  @Column({ default: true })
  active: boolean

  @Column({ default: true })
  confirmed: boolean
}
