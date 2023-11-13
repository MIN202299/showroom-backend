/// <reference types="multer" />
import { SocketGateway } from './websocket/socket.gateway';
import { SetExpertBody, SetThemeBody, UploadChunk } from './app.dto';
import { UploadService } from './upload.service';
export declare class AppController {
    private readonly socketGateway;
    private readonly uploadService;
    constructor(socketGateway: SocketGateway, uploadService: UploadService);
    test(): string;
    setTheme(body: SetThemeBody): Promise<string>;
    setExpert(body: SetExpertBody): Promise<string>;
    handleSplitUpload(file: Express.Multer.File, body: UploadChunk): Promise<import("./utils").ResponseData<string>>;
    handleMerge(): Promise<void>;
    handleUpload(file: Express.Multer.File): Promise<import("./utils").ResponseData<{
        uri: string;
        fileUrl: string;
    }>>;
}
