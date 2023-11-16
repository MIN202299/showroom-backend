import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigDTO } from './config.interface'

@Controller('config')
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get('getAll')
  async getAll() {
    return await this.configService.findAll()
  }

  @Post('create')
  async createConfig(@Body() body: ConfigDTO) {
    return await this.configService.add(body)
  }

  @Put('update/:id')
  async updateConfig(@Param('id') id: string, @Body() body: ConfigDTO) {
    return await this.configService.updateOne(id, body)
  }

  @Delete('delete/:id')
  async deleteConfig(@Param('id') id: string) {
    return await this.configService.deleteOne(id)
  }
}
