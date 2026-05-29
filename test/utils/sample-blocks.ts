import type { EditorBlock } from '../../src/types/editor.types';

export const sampleTextBlock: EditorBlock = {
  id: 'block-text-1',
  type: 'text',
  props: { content: 'Заголовок письма', align: 'center' },
};

export const sampleButtonBlock: EditorBlock = {
  id: 'block-button-1',
  type: 'button',
  props: {
    label: 'Перейти в магазин',
    url: 'https://shop.example',
    align: 'center',
    backgroundColor: '#18181b',
    textColor: '#fafafa',
  },
};

export const sampleExportPayload = {
  subject: 'Тестовая рассылка',
  blocks: [sampleTextBlock, sampleButtonBlock],
};
