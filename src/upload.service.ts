import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import { BadRequestException, Injectable } from '@nestjs/common'
import type { Express } from 'express'
import type { MergeChunk, PreUploadChunk, UploadChunk, UploadTinyFile } from './app.dto'
import { setResponse } from './utils'
import { moveFile } from './utils/upload'
import { UPLOAD_DIR } from './constants/upload'
import { FileService } from './modules/file/file.service'

@Injectable()
export class UploadService {
  constructor(
    private readonly fileService: FileService,
  ) {}

  async uploadChunk(file: Express.Multer.File, body: UploadChunk) {
    const fileDir = path.join(process.cwd(), UPLOAD_DIR, body.hash)
    const filepath = path.join(fileDir, body.hashName)
    if (!fs.existsSync(fileDir))
      fs.mkdirSync(fileDir, { recursive: true })
    if (fs.existsSync(filepath))
      return setResponse('ok')
    fs.writeFileSync(filepath, file.buffer)
    return setResponse('ok')
  }

  async mergeChunk(body: MergeChunk) {
    const fileDir = path.join(process.cwd(), UPLOAD_DIR, body.hash)
    const filepath = path.join(fileDir, body.filename)
    const uri = `${UPLOAD_DIR}/${body.hash}/${body.filename}`

    if (fs.existsSync(filepath)) {
      return setResponse({
        uri,
        fileUrl: `${process.env.PUBLIC_PATH}/${uri}`,
      })
    }
    if (!fs.existsSync(fileDir))
      throw new BadRequestException(new Error('合并失败, 请重新上传'))

    const filenames: string[] = fs.readdirSync(fileDir)

    filenames.sort((name1, name2) => {
      return Number(name1.split('-')[1]) - Number(name2.split('-')[1])
    })

    filenames.forEach((name, idx) => {
      const chunkPath = path.join(fileDir, name)
      const readStream = fs.createReadStream(chunkPath)
      const writeStream = fs.createWriteStream(filepath, {
        start: idx * body.chunkSize,
      })
      readStream.on('end', async () => {
        await fs.unlinkSync(chunkPath)
      })
      readStream.on('error', () => {
        throw new BadRequestException(new Error('合并失败, 请重新上传'))
      })
      writeStream.on('error', () => {
        throw new BadRequestException(new Error('合并失败, 请重新上传'))
      })
      readStream.pipe(writeStream)
    })
    // 保存到数据库
    await this.fileService.add({
      filename: body.filename,
      mimeType: body.mimeType,
      size: body.size,
      hash: body.hash,
      uri,
    })

    return setResponse({
      uri,
      fileUrl: `${process.env.PUBLIC_PATH}/${uri}`,
    })
  }

  async handlePreUpload(body: PreUploadChunk) {
    const fileDir = path.join(process.cwd(), UPLOAD_DIR, body.hash)
    const filepath = path.join(fileDir, body.filename)
    const uri = `${UPLOAD_DIR}/${body.hash}/${body.filename}`
    if (fs.existsSync(filepath)) {
      return setResponse({
        shouldUpload: false,
        file: {
          uri,
          fileUrl: `${process.env.PUBLIC_PATH}/${uri}`,
        },
      })
    }
    if (!fs.existsSync(fileDir)) {
      return setResponse({
        shouldUpload: true,
        chunksName: [],
      })
    }
    const filenames: string[] = fs.readdirSync(fileDir)
    return setResponse({
      shouldUpload: true,
      existChunkName: filenames,
    })
  }

  async handleUploadTinyFile(file: Express.Multer.File, body: UploadTinyFile) {
    const fileDir = path.join(process.cwd(), UPLOAD_DIR, body.hash)
    const filepath = path.join(fileDir, file.originalname)
    const uri = `${UPLOAD_DIR}/${body.hash}/${file.originalname}`

    if (!fs.existsSync(fileDir))
      fs.mkdirSync(fileDir, { recursive: true })

    if (fs.existsSync(filepath)) {
      return setResponse({
        uri,
        fileUrl: `${process.env.PUBLIC_PATH}/${uri}`,
      })
    }

    moveFile(path.join(file.destination, file.originalname), filepath)

    // 保存到数据库
    await this.fileService.add({
      filename: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      hash: body.hash,
      uri,
    })

    return setResponse({
      uri,
      fileUrl: `${process.env.PUBLIC_PATH}/${uri}`,
    })
  }
}
