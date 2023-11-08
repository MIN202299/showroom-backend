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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const socket_gateway_1 = require("./websocket/socket.gateway");
const app_dto_1 = require("./app.dto");
let AppController = class AppController {
    constructor(socketGateway) {
        this.socketGateway = socketGateway;
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
    test() {
        return 'hello world';
    }
};
exports.AppController = AppController;
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
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [socket_gateway_1.SocketGateway])
], AppController);
//# sourceMappingURL=app.controller.js.map