import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SocketGateway } from 'src/websocket/socket.gateway'
import type { Config, ConfigDTO } from './config.interface'

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel('configs')
    private readonly configModel: Model<Config>,
    private readonly socketGateway: SocketGateway,
  ) {}

  async add(body: ConfigDTO): Promise<string> {
    await this.configModel.create(body)
    this.socketGateway.sendToAllClient('refresh', null)
    return 'ok'
  }

  async findAll(): Promise<Config[]> {
    return await this.configModel.find()
  }

  async updateOne(_id: string, body: ConfigDTO): Promise<string> {
    await this.configModel.findByIdAndUpdate(_id, body)
    this.socketGateway.sendToAllClient('refresh', null)
    return 'ok'
  }

  async deleteOne(_id: string): Promise<string> {
    await this.configModel.findByIdAndDelete(_id)
    this.socketGateway.sendToAllClient('refresh', null)
    return 'ok'
  }
}
