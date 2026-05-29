import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWidgetDto } from '../../dto/create-widget.dto';
import { GenerateQrDto } from '../../dto/generate-qr.dto';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  async findAll() {
    const widgets = await this.widgetsService.findAll();
    return { data: widgets };
  }

  /** Генерация QR-изображения для редактора */
  @Post('qr/generate')
  async generateQr(@Body() dto: GenerateQrDto) {
    const result = await this.widgetsService.generateQrImage(dto);
    return { data: result };
  }

  @Post()
  async register(@Body() dto: CreateWidgetDto) {
    const widget = await this.widgetsService.register(dto);
    return { data: widget };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const widget = await this.widgetsService.findOne(id);
    return { data: widget };
  }
}
