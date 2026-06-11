import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products/products.service';
import { HtmlExportService } from './html-export.service';
import { sampleExportPayload } from '../../../test/utils/sample-blocks';

describe('HtmlExportService', () => {
  let service: HtmlExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmlExportService, ProductsService],
    }).compile();

    service = module.get(HtmlExportService);
  });

  it('генерирует валидный HTML-документ с темой', async () => {
    const html = await service.generateHtml({
      subject: 'Тест',
      blocks: sampleExportPayload.blocks,
    });

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('@media only screen and (max-width: 520px)');
    expect(html).toContain('class="u-row-container"');
    expect(html).toContain('background-color:#F7F8F9');
    expect(html).not.toContain('border-radius:8px');
    expect(html).toContain('<title>Тест</title>');
    expect(html).toContain('Заголовок письма');
    expect(html).toContain('Перейти в магазин');
  });

  it('включает inline-стили для email-совместимости', async () => {
    const html = await service.generateHtml({
      subject: 'Стили',
      blocks: [
        {
          id: '1',
          type: 'button',
          props: {
            label: 'CTA',
            url: 'https://example.com',
            align: 'center',
            backgroundColor: '#ff0000',
            textColor: '#ffffff',
          },
        },
      ],
    });

    expect(html).toContain('style=');
    expect(html).toContain('background-color:#ff0000');
    expect(html).toContain('class="email-button"');
  });

  it('рендерит product-grid с программами', async () => {
    const html = await service.generateHtml({
      subject: 'Направления',
      blocks: [
        {
          id: 'p1',
          type: 'product-grid',
          props: {
            title: 'Популярные направления подготовки',
            rows: 1,
            columns: 2,
            spacing: 12,
          },
        },
      ],
    });

    expect(html).toContain('Популярные направления подготовки');
    expect(html).toContain('Бакалавриат');
    expect(html).toContain('border:1px solid #e4e4e7');
  });

  it('рендерит product-grid с пользовательскими изображениями из props.items', async () => {
    const customImage = 'https://example.com/custom-ivt.png';
    const html = await service.generateHtml({
      subject: 'Направления',
      blocks: [
        {
          id: 'p2',
          type: 'product-grid',
          props: {
            title: 'Направления',
            rows: 1,
            columns: 1,
            spacing: 12,
            items: [
              {
                name: 'Информатика и вычислительная техника',
                image: customImage,
                subtitle: 'Бакалавриат · 4 года',
              },
            ],
          },
        },
      ],
    });

    expect(html).toContain(customImage);
    expect(html).toContain('Информатика и вычислительная техника');
  });

  it('рендерит QR-код как data URL', async () => {
    const html = await service.generateHtml({
      subject: 'QR',
      blocks: [
        {
          id: 'q1',
          type: 'qr-code',
          props: { content: 'https://example.com', caption: 'Сканируйте', size: 120 },
        },
      ],
    });

    expect(html).toContain('data:image/png;base64,');
    expect(html).toContain('Сканируйте');
  });

  it('рендерит social widget со ссылками', async () => {
    const html = await service.generateHtml({
      subject: 'Social',
      blocks: [
        {
          id: 's1',
          type: 'social',
          props: {
            align: 'center',
            iconSize: 36,
            links: [{ network: 'telegram', url: 'https://t.me/test', label: 'TG' }],
          },
        },
      ],
    });

    expect(html).toContain('https://t.me/test');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('text-align:center');
    expect(html).toContain('margin:0 auto;');
  });

  it('рендерит social widget с выравниванием вправо', async () => {
    const html = await service.generateHtml({
      subject: 'Social',
      blocks: [
        {
          id: 's2',
          type: 'social',
          props: {
            align: 'right',
            iconSize: 36,
            links: [{ network: 'vk', url: 'https://vk.com/test', label: 'VK' }],
          },
        },
      ],
    });

    expect(html).toContain('text-align:right');
    expect(html).toContain('align="right"');
  });

  it('рендерит текст с saltos de párrafo y línea', async () => {
    const html = await service.generateHtml({
      subject: 'Текст',
      blocks: [
        {
          id: 't1',
          type: 'text',
          props: {
            content: 'Строка один\n\nАбзац два\nВторая строка',
            align: 'left',
            fontSize: 16,
          },
        },
      ],
    });

    expect(html).toContain('Строка один');
    expect(html).toContain('Абзац два');
    expect(html).toContain('<br>');
    expect(html.match(/<p style=/g)?.length).toBeGreaterThanOrEqual(2);
  });
});
