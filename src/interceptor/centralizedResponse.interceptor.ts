// 统一正确响应
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import type { ResponseData } from '../utils'

@Injectable()
export class CentralizedResponse implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((...args) => {
          const { data, code, message } = args[0] as ResponseData
          return {
            code: code || 200,
            message: message || '请求成功',
            data: data || args[0],
            timestamp: +new Date(),
          }
        }),
      )
  }
}
