import type {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(8422, { cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  socketServer: Server

  @SubscribeMessage('message')
  onMessage(@ConnectedSocket() client: Socket, @MessageBody() body: unknown) {}

  afterInit(server: any): any {
    Logger.log('socket 初始化！')
  }

  handleConnection(client: any, ...args): any {
    Logger.log(`建立连接客户端id:${client.id}`)
  }

  handleDisconnect(client: any): any {
    Logger.log(`断开连接客户端id:${client.id}`)
  }

  sendToAllClient<T>(type: string | string, data: T) {
    this.socketServer.emit(type, data)
  }
}
