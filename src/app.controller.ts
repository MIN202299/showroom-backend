import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import { Body, Controller, Get, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { diskStorage, memoryStorage } from 'multer'
import { SocketGateway } from './websocket/socket.gateway'
import { MergeChunk, PreUploadChunk, SetExpertBody, SetThemeBody, UploadChunk, UploadTinyFile } from './app.dto'
import { UploadService } from './upload.service'
import { MAX_FILE_SIZE, UPLOAD_DIR } from './constants/upload'

@Controller()
export class AppController {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly uploadService: UploadService,
  ) {}

  @Get('')
  test() {
    return 'hello world'
  }

  @Post('setTheme')
  async setTheme(@Body() body: SetThemeBody) {
    this.socketGateway.sendToAllClient('server', body.theme)
    Logger.log(`设置主题${body.theme}`)
    return 'ok'
  }

  @Post('setExpert')
  async setExpert(@Body() body: SetExpertBody) {
    this.socketGateway.sendToAllClient('expert', body.name)
    Logger.log(`设置主题${body.name}`)
    return 'ok'
  }

  @Post('splitUpload')
  // 分片上传使用自定义上传
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  }))
  async handleSplitUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadChunk,
  ) {
    return this.uploadService.uploadChunk(file, body)
  }

  @Post('merge')
  async handleMerge(@Body() body: MergeChunk) {
    return this.uploadService.mergeChunk(body)
  }

  // todo 文件存在时直接返回
  //     - 能否拦截multer自动保存存文件
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        // req.body() = {} 这里获取不到请求参数？？
        // console.log(req.body)
        const publicPath = path.resolve(process.cwd(), UPLOAD_DIR)
        if (!fs.existsSync(publicPath))
          fs.mkdirSync(publicPath, { recursive: true })
        cb(null, publicPath)
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    }),
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
      cb(null, true)
    },
  }))

  async handleUploadTinyFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadTinyFile) {
    return this.uploadService.handleUploadTinyFile(file, body)
  }

  // 上传前校验
  @Post('preUpload')
  async handlePreUpload(@Body() body: PreUploadChunk) {
    return this.uploadService.handlePreUpload(body)
  }
}
