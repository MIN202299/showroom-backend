import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import type { File, FileDTO } from './file.interface'

@Injectable()
export class FileService {
  constructor(
    @InjectModel('files')
    private readonly fileModel: Model<File>,
  ) {}

  async add(body: FileDTO): Promise<void> {
    await this.fileModel.create(body)
  }

  async findAll(): Promise<File[]> {
    return await this.fileModel.find()
  }

  async deleteOne(_id: string): Promise<void> {
    await this.fileModel.findByIdAndDelete(_id)
  }
}
