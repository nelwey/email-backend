import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as QRCode from 'qrcode';
import { Repository } from 'typeorm';
import { WidgetEntity } from '../../database/entities/widget.entity';
import { CreateWidgetDto } from '../../dto/create-widget.dto';
import { GenerateQrDto } from '../../dto/generate-qr.dto';
import { DEFAULT_WIDGETS } from './widgets.seed';

@Injectable()
export class WidgetsService implements OnModuleInit {
  constructor(
    @InjectRepository(WidgetEntity)
    private readonly widgetsRepo: Repository<WidgetEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaultWidgets();
  }

  private async seedDefaultWidgets(): Promise<void> {
    await this.widgetsRepo.delete({ type: 'product-recommendations' });

    for (const widget of DEFAULT_WIDGETS) {
      const exists = await this.widgetsRepo.findOne({
        where: { type: widget.type },
      });
      if (!exists) {
        await this.register(widget);
      }
    }
  }

  async findAll(): Promise<WidgetEntity[]> {
    return this.widgetsRepo.find({
      where: { isActive: true },
      order: { category: 'ASC', label: 'ASC' },
    });
  }

  async findOne(id: string): Promise<WidgetEntity> {
    const widget = await this.widgetsRepo.findOne({ where: { id } });
    if (!widget) {
      throw new NotFoundException(`Виджет с id «${id}» не найден`);
    }
    return widget;
  }

  async findByType(type: string): Promise<WidgetEntity | null> {
    return this.widgetsRepo.findOne({ where: { type } });
  }

  async register(dto: CreateWidgetDto): Promise<WidgetEntity> {
    const existing = await this.findByType(dto.type);
    if (existing) {
      throw new ConflictException(`Виджет типа «${dto.type}» уже зарегистрирован`);
    }

    const entity = this.widgetsRepo.create({
      type: dto.type,
      label: dto.label,
      description: dto.description ?? '',
      category: dto.category ?? 'Прочее',
      defaultConfig: dto.defaultConfig ?? {},
      configSchema: dto.configSchema ?? null,
      metadata: dto.metadata ?? {},
      isActive: dto.isActive ?? true,
    });

    return this.widgetsRepo.save(entity);
  }

  async generateQrImage(dto: GenerateQrDto): Promise<{ dataUrl: string; content: string }> {
    const size = dto.size ?? 160;
    const dataUrl = await QRCode.toDataURL(dto.content, {
      width: size,
      margin: 1,
      errorCorrectionLevel: 'M',
    });
    return { dataUrl, content: dto.content };
  }
}
