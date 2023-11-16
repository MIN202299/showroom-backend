import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import type { Document } from 'mongoose'
import { TemplatesEnum } from 'src/schemas/config.schema'

export interface Config extends Document {
  readonly _id: string
  readonly themeName: string
  readonly themeType: TemplatesEnum
  readonly detail: string
}

export class ConfigDTO {
  @IsNotEmpty({ message: '请上传主题名称' })
  @IsString()
  themeName: string

  @IsNotEmpty({ message: '请上传文件主题类型' })
  @IsEnum(TemplatesEnum)
  themeType: TemplatesEnum

  @IsNotEmpty({ message: '请上传配置' })
  @IsString()
  detail: string
}
