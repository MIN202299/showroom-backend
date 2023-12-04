import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigSchema } from 'src/schemas/config.schema'
import { SocketGateway } from 'src/websocket/socket.gateway'
import { ConfigService } from './config.service'
import { ConfigController } from './config.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'configs', schema: ConfigSchema }])],
  controllers: [ConfigController],
  providers: [ConfigService, SocketGateway],
  exports: [ConfigService],
})
export default class ConfigFileModule {}
