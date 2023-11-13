import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { CentralizedResponse } from './interceptor/centralizedResponse.interceptor'
import { RequestStat } from './interceptor/requestStat.interceptor'
import { CentralizedHttpException } from './filter/centralizedHttpException.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log'],
  })
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new CentralizedHttpException())
  app.useGlobalInterceptors(new CentralizedResponse(), new RequestStat())
  app.useStaticAssets('public', {
    prefix: '/public/',
  })
  await app.listen(8421)
}
bootstrap()
