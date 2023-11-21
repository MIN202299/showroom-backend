"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const node_process_1 = __importDefault(require("node:process"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const socket_gateway_1 = require("./websocket/socket.gateway");
const upload_service_1 = require("./upload.service");
const file_module_1 = __importDefault(require("./modules/file/file.module"));
const config_module_1 = __importDefault(require("./modules/config/config.module"));
const mongo_config_dev_1 = __importDefault(require("./configs/mongo.config.dev"));
const mongo_config_prod_1 = __importDefault(require("./configs/mongo.config.prod"));
const host = 'localhost';
const port = '27017';
const db = 'showroom';
const user = 'admin';
const password = '123456';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: node_process_1.default.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
                load: [mongo_config_dev_1.default, mongo_config_prod_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: node_process_1.default.env.NODE_ENV === 'production' ? mongo_config_prod_1.default : mongo_config_dev_1.default,
            }),
            file_module_1.default,
            config_module_1.default,
        ],
        controllers: [app_controller_1.AppController],
        providers: [socket_gateway_1.SocketGateway, upload_service_1.UploadService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map