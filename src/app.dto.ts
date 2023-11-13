import { IsEnum, IsHash, IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

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
  @IsNotEmpty({ message: '请上传文件md5' })
  @IsHash('md5')
  md5: string

  @IsNotEmpty({ message: '请上传文件序号' })
  @Type(() => Number)
  @IsInt()
  num: number
}
