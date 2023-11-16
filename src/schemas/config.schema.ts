// 配置文件
import { Schema } from 'mongoose'

export enum TemplatesEnum {
  'screen_3',
  'screen_8',
  'rfid',
}

export const ConfigSchema = new Schema({
  themeName: {
    type: String,
    required: true,
  },
  themeType: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
}, { timestamps: true })
