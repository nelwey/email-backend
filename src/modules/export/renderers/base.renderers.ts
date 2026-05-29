import type { WidgetRenderer } from '../../../interfaces/widget-renderer.interface';
import { blockRow, escapeHtml, textContentToEmailParagraphs } from '../../../utils/html.utils';

function alignStyle(align: string): string {
  const map: Record<string, string> = {
    left: 'left',
    center: 'center',
    right: 'right',
  };
  return map[align] ?? 'left';
}

export const textRenderer: WidgetRenderer = {
  type: 'text',
  render({ block }) {
    const align = alignStyle(String(block.props.align ?? 'left'));
    const fontSize = Number(block.props.fontSize ?? 16);
    const fontWeight = block.props.bold ? '700' : '400';
    const textDecoration = block.props.underline ? 'underline' : 'none';
    const paragraphStyle = `margin:0 0 8px;font-size:${fontSize}px;line-height:1.4;color:#000000;text-align:${align};font-weight:${fontWeight};text-decoration:${textDecoration};`;
    const paragraphs = textContentToEmailParagraphs(
      String(block.props.content ?? ''),
      paragraphStyle,
    );
    return blockRow(paragraphs);
  },
};

export const imageRenderer: WidgetRenderer = {
  type: 'image',
  render({ block }) {
    const src = escapeHtml(String(block.props.src ?? ''));
    const alt = escapeHtml(String(block.props.alt ?? 'Изображение'));
    if (!src) {
      return blockRow(
        `<div style="text-align:center;color:#71717a;font-size:14px;">Изображение не задано</div>`,
      );
    }
    const width = Math.min(100, Math.max(10, Number(block.props.width ?? 100)));
    const align = alignStyle(String(block.props.align ?? 'center'));
    const margin =
      align === 'left'
        ? 'margin:0;'
        : align === 'right'
          ? 'margin:0 0 0 auto;'
          : 'margin:0 auto;';
    const imgClass = width >= 100 ? 'fluid-img' : '';
    return blockRow(
      `<div style="text-align:${align};"><img class="${imgClass}" src="${src}" alt="${alt}" width="${width}%" style="width:${width}%;max-width:100%;height:auto;border-radius:4px;display:block;${margin}" /></div>`,
    );
  },
};

export const buttonRenderer: WidgetRenderer = {
  type: 'button',
  render({ block }) {
    const label = escapeHtml(String(block.props.label ?? 'Кнопка'));
    const url = escapeHtml(String(block.props.url ?? '#'));
    const align = alignStyle(String(block.props.align ?? 'center'));
    const bg = String(block.props.backgroundColor ?? '#18181b');
    const color = String(block.props.textColor ?? '#fafafa');
    return blockRow(
      `<div style="text-align:${align};">
        <a class="email-button" href="${url}" target="_blank" style="display:inline-block;padding:14px 28px;background-color:${bg};color:${color};text-decoration:none;border-radius:6px;font-size:16px;font-weight:600;max-width:100%;box-sizing:border-box;">${label}</a>
      </div>`,
    );
  },
};

export const dividerRenderer: WidgetRenderer = {
  type: 'divider',
  render({ block }) {
    const color = String(block.props.color ?? '#e4e4e7');
    const thickness = Number(block.props.thickness ?? 1);
    return blockRow(
      `<hr style="border:0;height:${thickness}px;background-color:${color};margin:0;" />`,
      '8px 10px',
      { tight: true },
    );
  },
};
