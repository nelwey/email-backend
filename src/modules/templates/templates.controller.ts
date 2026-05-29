import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTemplateDto } from '../../dto/create-template.dto';
import { UpdateTemplateDto } from '../../dto/update-template.dto';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll() {
    const templates = await this.templatesService.findAll();
    return { data: templates };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const template = await this.templatesService.findOne(id);
    return { data: template };
  }

  @Post()
  async create(@Body() dto: CreateTemplateDto) {
    const template = await this.templatesService.create(dto);
    return { data: template };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    const template = await this.templatesService.update(id, dto);
    return { data: template };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.templatesService.remove(id);
    return { data: { success: true } };
  }
}
