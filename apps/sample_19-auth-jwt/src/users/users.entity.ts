import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Users {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  email: string
}
