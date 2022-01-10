import { ObjectLiteral } from 'typeorm'

export class PhotoDto {

  // TODO improve it based on this https://stackoverflow.com/questions/55583732/what-is-the-purpose-of-object-assign-in-the-constructor-of-a-typescript-object
  // Use Interface?
  constructor(data: ObjectLiteral) {
    Object.assign(this, data)
  }

  name: string
  description: string
  filename: string
  isPublished: boolean
}
