import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import type { Document } from 'mongoose'

// update 防止后面添加配置麻烦
// import { TemplatesEnum } from 'src/schemas/config.schema'

export interface Config extends Document {
  readonly _id: string
  readonly themeName: string
  readonly themeType: number
  readonly detail: string
}

export class ConfigDTO {
  @IsNotEmpty({ message: '请上传主题名称' })
  @IsString()
  themeName: string

  @IsNotEmpty({ message: '请上传文件主题类型' })
  @IsInt()
  themeType: number

  @IsNotEmpty({ message: '请上传配置' })
  @IsString()
  detail: string
}
