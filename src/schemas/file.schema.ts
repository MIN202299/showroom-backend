// 上传文件
import { Schema } from 'mongoose'

export const FileSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    require: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
}, { timestamps: true })
