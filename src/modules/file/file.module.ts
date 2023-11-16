import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FileSchema } from 'src/schemas/file.schema'
import { FileService } from './file.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'files', schema: FileSchema }])],
  controllers: [],
  providers: [FileService],
  exports: [FileService],
})
export default class FileModule {}
