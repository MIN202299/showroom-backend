import { SocketGateway } from './websocket/socket.gateway';
import { SetThemeBody } from './app.dto';
export declare class AppController {
    private readonly socketGateway;
    constructor(socketGateway: SocketGateway);
    setTheme(body: SetThemeBody): Promise<string>;
    test(): string;
}
