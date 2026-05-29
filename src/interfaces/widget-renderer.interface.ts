import type { EditorBlock, ProductItem } from '../types/editor.types';

export interface WidgetRenderContext {
  block: EditorBlock;
  products?: ProductItem[];
}

export interface WidgetRenderer {
  readonly type: string;
  render(ctx: WidgetRenderContext): Promise<string> | string;
}
