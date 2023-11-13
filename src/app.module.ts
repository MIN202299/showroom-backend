import process from 'node:process'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { SocketGateway } from './websocket/socket.gateway'
import { UploadService } from './upload.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
    }),
  ],
  controllers: [AppController],
  providers: [SocketGateway, UploadService],
})
export class AppModule {}
