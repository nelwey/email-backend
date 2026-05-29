export type BlockType =
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'product-grid'
  | 'qr-code'
  | 'social';

export interface EditorBlock {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export interface TemplateStructure {
  subject: string;
  blocks: EditorBlock[];
}

export interface ProductItem {
  name: string;
  image: string;
  /** Краткая подпись (например, ступень и срок обучения) */
  subtitle?: string;
  /** Опционально для коммерческих каталогов */
  price?: number;
}

export interface SocialLink {
  network: string;
  url: string;
  label?: string;
}
