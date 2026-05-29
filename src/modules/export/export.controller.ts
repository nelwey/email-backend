import { Body, Controller, Post } from '@nestjs/common';
import { ExportHtmlDto } from '../../dto/export-html.dto';
import { HtmlExportService } from './html-export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly htmlExportService: HtmlExportService) {}

  @Post('html')
  async exportHtml(@Body() dto: ExportHtmlDto) {
    const html = await this.htmlExportService.generateHtml({
      subject: dto.subject ?? 'Письмо',
      blocks: dto.blocks,
    });
    return { data: { html } };
  }
}
