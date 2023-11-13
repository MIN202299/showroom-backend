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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadChunk = exports.SetExpertBody = exports.SetThemeBody = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Theme;
(function (Theme) {
    Theme[Theme["DEFAULT"] = 0] = "DEFAULT";
    Theme[Theme["COMPANY_INTRO"] = 1] = "COMPANY_INTRO";
    Theme[Theme["DROPLETON"] = 2] = "DROPLETON";
})(Theme || (Theme = {}));
class SetThemeBody {
}
exports.SetThemeBody = SetThemeBody;
__decorate([
    (0, class_validator_1.IsEnum)(Theme),
    __metadata("design:type", Number)
], SetThemeBody.prototype, "theme", void 0);
class SetExpertBody {
}
exports.SetExpertBody = SetExpertBody;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetExpertBody.prototype, "name", void 0);
class UploadChunk {
}
exports.UploadChunk = UploadChunk;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请上传文件md5' }),
    (0, class_validator_1.IsHash)('md5'),
    __metadata("design:type", String)
], UploadChunk.prototype, "md5", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请上传文件序号' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UploadChunk.prototype, "num", void 0);
//# sourceMappingURL=app.dto.js.map