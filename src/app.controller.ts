import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { SocketGateway } from './websocket/socket.gateway'

import { SetThemeBody } from './app.dto'

@Controller()
export class AppController {
  constructor(private readonly socketGateway: SocketGateway) {}

  @Post('setTheme')
  async setTheme(@Body() body: SetThemeBody) {
    this.socketGateway.sendToAllClient('server', body.theme)
    Logger.log(`设置主题${body.theme}`)
    return 'ok'
  }

  @Get('')
  test() {
    return 'hello world'
  }
}
