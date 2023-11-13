// 统一错误响应
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException } from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch(HttpException)
export class CentralizedHttpException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const req = http.getRequest<Request>()
    const res = http.getResponse<Response>()
    const status = exception.getStatus()

    res
      .status(status)
      .json({
        code: status || 401,
        message: '请求失败',
        error: {
          route: req.url,
          detail: exception.message || exception.getResponse(),
        },
        timestamp: +new Date(),
      })
  }
}
