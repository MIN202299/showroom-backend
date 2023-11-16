import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigSchema } from 'src/schemas/config.schema'
import { ConfigService } from './config.service'
import { ConfigController } from './config.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'configs', schema: ConfigSchema }])],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export default class ConfigFileModule {}
