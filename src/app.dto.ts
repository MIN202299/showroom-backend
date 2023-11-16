import { IsEnum, IsHash, IsInt, IsNotEmpty, IsString } from 'class-validator'

enum Theme {
  DEFAULT,
  COMPANY_INTRO,
  DROPLETON,
}

export class SetThemeBody {
  @IsEnum(Theme)
  theme: Theme
}

export class SetExpertBody {
  @IsString()
  name: string
}

export class UploadChunk {
  @IsNotEmpty({ message: '请上传文件hash' })
  @IsHash('md5')
  hash: string

  @IsNotEmpty({ message: '请上传分片名称' })
  @IsString()
  hashName: string

  @IsNotEmpty({ message: '请上传文件名称' })
  @IsString()
  filename: string
}

export class MergeChunk {
  @IsNotEmpty({ message: '请上传文件名称' })
  @IsString()
  filename: string

  @IsNotEmpty({ message: '请上传文件hash' })
  @IsHash('md5')
  hash: string

  @IsNotEmpty({ message: '请上传分片大小' })
  @IsInt()
  chunkSize: number

  @IsNotEmpty({ message: '请上传文件mimeType' })
  @IsString()
  mimeType: string

  @IsNotEmpty({ message: '请上传文件大小' })
  @IsInt()
  size: number
}

export class PreUploadChunk {
  @IsNotEmpty({ message: '请上传文件名称' })
  @IsString()
  filename: string

  @IsNotEmpty({ message: '请上传文件hash' })
  @IsHash('md5')
  hash: string
}

export class UploadTinyFile {
  @IsNotEmpty({ message: '请上传文件hash' })
  @IsHash('md5')
  hash: string
}
