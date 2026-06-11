import type { CreateWidgetDto } from '../../dto/create-widget.dto';

export const DEFAULT_WIDGETS: CreateWidgetDto[] = [
  {
    type: 'text',
    label: 'Текст',
    description: 'Абзац или заголовок',
    category: 'Контент',
    defaultConfig: {
      content: 'Текст письма...',
      align: 'left',
      fontSize: 16,
      bold: false,
      underline: false,
    },
    configSchema: {
      fields: [
        { key: 'content', type: 'textarea', label: 'Текст' },
        { key: 'fontSize', type: 'number', label: 'Размер шрифта', min: 12, max: 32 },
        { key: 'bold', type: 'boolean', label: 'Жирный' },
        { key: 'underline', type: 'boolean', label: 'Подчёркивание' },
        { key: 'align', type: 'select', label: 'Выравнивание', options: ['left', 'center', 'right'] },
      ],
    },
    metadata: { source: 'builtin' },
  },
  {
    type: 'image',
    label: 'Изображение',
    description: 'Картинка или баннер',
    category: 'Контент',
    defaultConfig: { src: '', alt: '', width: 100, align: 'center' },
    metadata: { source: 'builtin' },
  },
  {
    type: 'button',
    label: 'Кнопка',
    description: 'Призыв к действию',
    category: 'Контент',
    defaultConfig: {
      label: 'Перейти',
      url: 'https://example.com',
      align: 'center',
      backgroundColor: '#18181b',
      textColor: '#fafafa',
    },
    metadata: { source: 'builtin' },
  },
  {
    type: 'divider',
    label: 'Разделитель',
    description: 'Горизонтальная линия',
    category: 'Макет',
    defaultConfig: { color: '#e4e4e7', thickness: 1 },
    metadata: { source: 'builtin' },
  },
  {
    type: 'product-grid',
    label: 'Сетка направлений (Product Grid)',
    description: 'Сетка карточек программ обучения из каталога API',
    category: 'Динамика',
    defaultConfig: {
      title: 'Популярные направления подготовки',
      rows: 2,
      columns: 2,
      spacing: 12,
      items: [],
    },
    configSchema: {
      fields: [
        { key: 'title', type: 'text', label: 'Заголовок' },
        { key: 'rows', type: 'number', label: 'Строки', min: 1, max: 4 },
        { key: 'columns', type: 'number', label: 'Колонки', min: 1, max: 4 },
        { key: 'spacing', type: 'number', label: 'Отступ (px)', min: 0, max: 32 },
      ],
    },
    metadata: { source: 'plugin', requiresApi: 'products' },
  },
  {
    type: 'qr-code',
    label: 'QR-код',
    description: 'QR-код по тексту или ссылке',
    category: 'Динамика',
    defaultConfig: {
      content: 'https://example.com',
      caption: '',
      size: 160,
    },
    configSchema: {
      fields: [
        { key: 'content', type: 'text', label: 'Текст или URL' },
        { key: 'caption', type: 'text', label: 'Подпись' },
        { key: 'size', type: 'number', label: 'Размер (px)', min: 64, max: 512 },
      ],
    },
    metadata: { source: 'plugin', generatesImage: true },
  },
  {
    type: 'social',
    label: 'Соцсети',
    description: 'Иконки социальных сетей со ссылками',
    category: 'Динамика',
    defaultConfig: {
      align: 'center',
      iconSize: 36,
      links: [
        { network: 'telegram', url: 'https://t.me/', label: 'Telegram' },
        { network: 'vk', url: 'https://vk.com/', label: 'VK' },
      ],
    },
    configSchema: {
      fields: [
        { key: 'align', type: 'select', label: 'Выравнивание', options: ['left', 'center', 'right'] },
        { key: 'iconSize', type: 'number', label: 'Размер иконок', min: 24, max: 64 },
        { key: 'links', type: 'social-links', label: 'Ссылки' },
      ],
    },
    metadata: { source: 'plugin' },
  },
];
