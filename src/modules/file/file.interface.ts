import { IsHash, IsInt, IsNotEmpty, IsString } from 'class-validator'
import type { Document } from 'mongoose'

export interface File extends Document {
  readonly _id: string
  readonly filename: string
  readonly mimeType: string
  readonly size: number
  readonly uri: string
  readonly hash: string
}

export class FileDTO {
  @IsNotEmpty()
  @IsString()
  filename: string

  @IsNotEmpty()
  @IsString()
  mimeType: string

  @IsNotEmpty()
  @IsString()
  uri: string

  @IsHash('md5')
  hash: string

  @IsNotEmpty()
  @IsInt()
  size: number
}
