import { SocketGateway } from './websocket/socket.gateway';
import { SetExpertBody, SetThemeBody } from './app.dto';
export declare class AppController {
    private readonly socketGateway;
    constructor(socketGateway: SocketGateway);
    setTheme(body: SetThemeBody): Promise<string>;
    setExpert(body: SetExpertBody): Promise<string>;
    test(): string;
}
