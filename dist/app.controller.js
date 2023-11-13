"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = __importDefault(require("node:fs"));
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const socket_gateway_1 = require("./websocket/socket.gateway");
const app_dto_1 = require("./app.dto");
const upload_service_1 = require("./upload.service");
const upload_1 = require("./constants/upload");
const utils_1 = require("./utils");
let AppController = class AppController {
    constructor(socketGateway, uploadService) {
        this.socketGateway = socketGateway;
        this.uploadService = uploadService;
    }
    test() {
        return 'hello world';
    }
    async setTheme(body) {
        this.socketGateway.sendToAllClient('server', body.theme);
        common_1.Logger.log(`设置主题${body.theme}`);
        return 'ok';
    }
    async setExpert(body) {
        this.socketGateway.sendToAllClient('expert', body.name);
        common_1.Logger.log(`设置主题${body.name}`);
        return 'ok';
    }
    async handleSplitUpload(file, body) {
        return this.uploadService.uploadChunk(file, body);
    }
    async handleMerge() { }
    async handleUpload(file) {
        const uri = `${upload_1.UPLOAD_DIR}/${file.originalname}`;
        return (0, utils_1.setResponse)({
            uri,
            fileUrl: `${node_process_1.default.env.PUBLIC_PATH}/${uri}`,
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('setTheme'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_dto_1.SetThemeBody]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setTheme", null);
__decorate([
    (0, common_1.Post)('setExpert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_dto_1.SetExpertBody]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setExpert", null);
__decorate([
    (0, common_1.Post)('splitUpload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: {
            fileSize: upload_1.SPLIT_MAX_SIZE,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, app_dto_1.UploadChunk]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleSplitUpload", null);
__decorate([
    (0, common_1.Post)('merge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleMerge", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const publicPath = node_path_1.default.resolve(node_process_1.default.cwd(), upload_1.UPLOAD_DIR);
                if (!node_fs_1.default.existsSync(publicPath))
                    node_fs_1.default.mkdirSync(publicPath, { recursive: true });
                cb(null, publicPath);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
        limits: {
            fileSize: upload_1.MAX_SIZE,
        },
        fileFilter: (req, file, cb) => {
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleUpload", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [socket_gateway_1.SocketGateway,
        upload_service_1.UploadService])
], AppController);
//# sourceMappingURL=app.controller.js.map