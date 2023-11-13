// 统计接口返回时间
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'

import type { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class RequestStat implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = +new Date()
    const http = context.switchToHttp()
    const req = http.getRequest()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const url = urlObj.pathname
    let args = ''
    if (Object.keys(req.body).length)
      args += JSON.stringify(req.body)

    if (Object.keys(req.query).length)
      args += JSON.stringify(req.query)

    if (Object.keys(req.params).length)
      args += JSON.stringify(req.params)
    return next
      .handle()
      .pipe(
        tap(value =>
          Logger.log(`>>> route: ${url}, 耗时: ${+new Date() - start}ms`),
        ),
      )
  }
}
