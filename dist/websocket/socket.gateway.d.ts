import type { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SocketGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
    socketServer: Server;
    onMessage(client: Socket, body: unknown): void;
    afterInit(server: any): any;
    handleConnection(client: any, ...args: any[]): any;
    handleDisconnect(client: any): any;
    sendToAllClient<T>(type: string | string, data: T): void;
}
