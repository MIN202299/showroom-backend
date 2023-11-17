/// <reference types="multer" />
import { SocketGateway } from './websocket/socket.gateway';
import { MergeChunk, PreUploadChunk, SetExpertBody, SetThemeBody, UploadChunk, UploadTinyFile } from './app.dto';
import { UploadService } from './upload.service';
export declare class AppController {
    private readonly socketGateway;
    private readonly uploadService;
    constructor(socketGateway: SocketGateway, uploadService: UploadService);
    test(): string;
    setTheme(body: SetThemeBody): Promise<string>;
    setExpert(body: SetExpertBody): Promise<string>;
    handleSplitUpload(file: Express.Multer.File, body: UploadChunk): Promise<import("./utils").ResponseData<string>>;
    handleMerge(body: MergeChunk): Promise<import("./utils").ResponseData<{
        uri: string;
        fileUrl: string;
    }>>;
    handleUploadTinyFile(file: Express.Multer.File, body: UploadTinyFile): Promise<import("./utils").ResponseData<{
        uri: string;
        fileUrl: string;
    }>>;
    handlePreUpload(body: PreUploadChunk): Promise<import("./utils").ResponseData<{
        shouldUpload: boolean;
        file: {
            uri: string;
            fileUrl: string;
        };
    }> | import("./utils").ResponseData<{
        shouldUpload: boolean;
        existChunkName: any[];
    }>>;
}
