import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  })
  app.enableCors()
  await app.listen(8421)
}
bootstrap()
