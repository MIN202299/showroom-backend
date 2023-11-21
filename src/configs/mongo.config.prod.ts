import process from 'node:process'
import { registerAs } from '@nestjs/config'

import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { Logger } from '@nestjs/common'

function MongoConfigProd(): MongooseModuleFactoryOptions {
  Logger.log(process.env.NODE_ENV, process.env.HOST)
  return {
    uri: `mongodb://${process.env.HOST}:${process.env.PORT}/`,
    auth: {
      username: process.env.USER,
      password: process.env.PASSWORD,
    },
    dbName: process.env.DB_NAME,
  }
}

export default registerAs('mongo.config.prod', MongoConfigProd)
