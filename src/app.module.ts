import process from 'node:process'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { SocketGateway } from './websocket/socket.gateway'
import { UploadService } from './upload.service'
import FileModule from './modules/file/file.module'
import ConfigFileModule from './modules/config/config.module'
import MongoConfigDev from './configs/mongo.config.dev'
import MongoConfigProd from './configs/mongo.config.prod'

const host = 'localhost'
const port = '27017'
const db = 'showroom'
const user = 'admin'
const password = '123456'
@Module({
  imports: [
    // 导入环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
      load: [MongoConfigDev, MongoConfigProd],
    }),
    // 导入mongoose
    // MongooseModule.forRoot(`mongodb://${host}:${port}/`, {
    //   auth: {
    //     username: user,
    //     password,
    //   },
    //   dbName: db,
    // }),
    MongooseModule.forRootAsync({
      useFactory: process.env.NODE_ENV === 'production' ? MongoConfigProd : MongoConfigDev,
    }),
    FileModule,
    ConfigFileModule,
  ],
  controllers: [AppController],
  providers: [SocketGateway, UploadService],
})
export class AppModule {}
