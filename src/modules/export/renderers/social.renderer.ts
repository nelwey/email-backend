import type { WidgetRenderer } from '../../../interfaces/widget-renderer.interface';
import type { SocialLink } from '../../../types/editor.types';
import { blockRow, escapeHtml } from '../../../utils/html.utils';

const networkLabels: Record<string, string> = {
  vk: 'VK',
  telegram: 'Telegram',
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X',
  linkedin: 'LinkedIn',
  ok: 'OK',
};

const networkColors: Record<string, string> = {
  vk: '#0077FF',
  telegram: '#26A5E4',
  youtube: '#FF0000',
  instagram: '#E4405F',
  facebook: '#1877F2',
  twitter: '#000000',
  linkedin: '#0A66C2',
  ok: '#EE8208',
};

function socialAlignStyles(align: string): {
  cellAlign: 'left' | 'center' | 'right';
  tableAlign: 'left' | 'center' | 'right';
  tableMargin: string;
} {
  if (align === 'right') {
    return {
      cellAlign: 'right',
      tableAlign: 'right',
      tableMargin: 'margin:0 0 0 auto;',
    };
  }
  if (align === 'left') {
    return {
      cellAlign: 'left',
      tableAlign: 'left',
      tableMargin: 'margin:0;',
    };
  }
  return {
    cellAlign: 'center',
    tableAlign: 'center',
    tableMargin: 'margin:0 auto;',
  };
}

export const socialRenderer: WidgetRenderer = {
  type: 'social',
  render({ block }) {
    const links = (block.props.links as SocialLink[] | undefined) ?? [];
    const align = String(block.props.align ?? 'center');
    const iconSize = Math.max(24, Math.min(64, Number(block.props.iconSize ?? 36)));
    const { cellAlign, tableAlign, tableMargin } = socialAlignStyles(align);

    if (links.length === 0) {
      return blockRow(
        `<p style="margin:0;text-align:center;color:#71717a;font-size:14px;">Добавьте ссылки на соцсети</p>`,
      );
    }

    const icons = links
      .map((link) => {
        const network = String(link.network ?? '').toLowerCase();
        const url = escapeHtml(link.url);
        const label = escapeHtml(link.label ?? networkLabels[network] ?? network);
        const bg = networkColors[network] ?? '#52525b';
        const shortLabel = label.slice(0, 2).toUpperCase();
        const fontSize = Math.max(10, Math.round(iconSize * 0.28));

        return `<td align="center" valign="middle" style="padding:0 6px;font-size:0;line-height:0;">
          <a href="${url}" target="_blank" title="${label}" style="display:block;width:${iconSize}px;height:${iconSize}px;line-height:${iconSize}px;background-color:${bg};color:#ffffff;text-decoration:none;border-radius:50%;text-align:center;font-size:${fontSize}px;font-weight:700;mso-line-height-rule:exactly;">${shortLabel}</a>
        </td>`;
      })
      .join('');

    return blockRow(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="${cellAlign}" style="text-align:${cellAlign};">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${tableAlign}" style="${tableMargin}">
              <tr>${icons}</tr>
            </table>
          </td>
        </tr>
      </table>`,
    );
  },
};
