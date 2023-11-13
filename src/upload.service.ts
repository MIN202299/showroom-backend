import { Injectable } from '@nestjs/common'
import type { Express } from 'express'
import type { UploadChunk } from './app.dto'
import { setResponse } from './utils'

@Injectable()
export class UploadService {
  constructor() {}

  async uploadChunk(file: Express.Multer.File, body: UploadChunk) {
    // console.log(file, body)
    return setResponse('ok')
  }
}
