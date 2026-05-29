import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../../database/entities/template.entity';
import { CreateTemplateDto } from '../../dto/create-template.dto';
import { UpdateTemplateDto } from '../../dto/update-template.dto';
import type { TemplateStructure } from '../../types/editor.types';
import { HtmlExportService } from '../export/html-export.service';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templatesRepo: Repository<TemplateEntity>,
    private readonly htmlExportService: HtmlExportService,
  ) {}

  async findAll(): Promise<TemplateEntity[]> {
    return this.templatesRepo.find({ order: { updatedAt: 'DESC' } });
  }

  async findOne(id: string): Promise<TemplateEntity> {
    const template = await this.templatesRepo.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Шаблон с id «${id}» не найден`);
    }
    return template;
  }

  async create(dto: CreateTemplateDto): Promise<TemplateEntity> {
    const structure: TemplateStructure = {
      subject: dto.subject ?? 'Новая рассылка',
      blocks: dto.blocks,
    };
    const html = await this.htmlExportService.generateHtml(structure);

    const entity = this.templatesRepo.create({
      name: dto.name,
      subject: structure.subject,
      structure,
      html,
    });

    return this.templatesRepo.save(entity);
  }

  async update(id: string, dto: UpdateTemplateDto): Promise<TemplateEntity> {
    const template = await this.findOne(id);

    if (dto.name !== undefined) template.name = dto.name;

    const structure: TemplateStructure = {
      subject: dto.subject ?? template.structure.subject,
      blocks: dto.blocks ?? template.structure.blocks,
    };

    template.subject = structure.subject;
    template.structure = structure;
    template.html = await this.htmlExportService.generateHtml(structure);

    return this.templatesRepo.save(template);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findOne(id);
    await this.templatesRepo.remove(template);
  }
}
