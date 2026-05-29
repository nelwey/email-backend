import { Injectable, Logger } from '@nestjs/common';
import type { WidgetRenderer } from '../../interfaces/widget-renderer.interface';
import type {
  EditorBlock,
  ProductItem,
  TemplateStructure,
} from '../../types/editor.types';
import { wrapEmailDocument } from '../../utils/html.utils';
import { ProductsService } from '../products/products.service';
import {
  buttonRenderer,
  dividerRenderer,
  imageRenderer,
  textRenderer,
} from './renderers/base.renderers';
import { productGridRenderer } from './renderers/product-grid.renderer';
import { qrCodeRenderer } from './renderers/qr-code.renderer';
import { socialRenderer } from './renderers/social.renderer';

@Injectable()
export class HtmlExportService {
  private readonly logger = new Logger(HtmlExportService.name);
  private readonly renderers = new Map<string, WidgetRenderer>();

  constructor(private readonly productsService: ProductsService) {
    const builtIn: WidgetRenderer[] = [
      textRenderer,
      imageRenderer,
      buttonRenderer,
      dividerRenderer,
      productGridRenderer,
      qrCodeRenderer,
      socialRenderer,
    ];
    for (const renderer of builtIn) {
      this.renderers.set(renderer.type, renderer);
    }
  }

  registerRenderer(renderer: WidgetRenderer): void {
    this.renderers.set(renderer.type, renderer);
  }

  async renderBlock(block: EditorBlock): Promise<string> {
    const renderer = this.renderers.get(block.type);
    if (!renderer) {
      this.logger.warn(`Рендерер для типа «${block.type}» не найден`);
      return '';
    }

    let products: ProductItem[] | undefined;

    if (block.type === 'product-grid') {
      const count =
        Number(block.props.rows ?? 1) * Number(block.props.columns ?? 2);
      products = await this.productsService.getRandomProducts(count);
    }

    const result = await renderer.render({ block, products });
    return result;
  }

  async renderBlocks(blocks: EditorBlock[]): Promise<string> {
    const parts: string[] = [];
    for (const block of blocks) {
      parts.push(await this.renderBlock(block));
    }
    return parts.join('\n');
  }

  async generateHtml(structure: TemplateStructure): Promise<string> {
    const body = await this.renderBlocks(structure.blocks);
    return wrapEmailDocument(structure.subject, body);
  }
}
