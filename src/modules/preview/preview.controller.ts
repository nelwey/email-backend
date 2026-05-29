import { Body, Controller, Post } from '@nestjs/common';
import { PreviewDto } from '../../dto/preview.dto';
import { HtmlExportService } from '../export/html-export.service';

@Controller('preview')
export class PreviewController {
  constructor(private readonly htmlExportService: HtmlExportService) {}

  @Post()
  async preview(@Body() dto: PreviewDto) {
    const subject = dto.subject ?? 'Предпросмотр';
    const html = await this.htmlExportService.generateHtml({
      subject,
      blocks: dto.blocks,
    });
    return {
      data: {
        subject,
        html,
        blockCount: dto.blocks.length,
      },
    };
  }
}
