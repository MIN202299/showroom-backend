"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const centralizedResponse_interceptor_1 = require("./interceptor/centralizedResponse.interceptor");
const requestStat_interceptor_1 = require("./interceptor/requestStat.interceptor");
const centralizedHttpException_filter_1 = require("./filter/centralizedHttpException.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log'],
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new centralizedHttpException_filter_1.CentralizedHttpException());
    app.useGlobalInterceptors(new centralizedResponse_interceptor_1.CentralizedResponse(), new requestStat_interceptor_1.RequestStat());
    app.useStaticAssets('public', {
        prefix: '/public/',
    });
    await app.listen(8421);
}
bootstrap();
//# sourceMappingURL=main.js.map