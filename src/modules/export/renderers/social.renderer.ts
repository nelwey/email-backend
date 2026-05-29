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

export const socialRenderer: WidgetRenderer = {
  type: 'social',
  render({ block }) {
    const links = (block.props.links as SocialLink[] | undefined) ?? [];
    const align = String(block.props.align ?? 'center');
    const iconSize = Number(block.props.iconSize ?? 36);

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
        return `<td style="padding:0 6px;">
          <a href="${url}" target="_blank" title="${label}" style="display:inline-block;width:${iconSize}px;height:${iconSize}px;line-height:${iconSize}px;background-color:${bg};color:#ffffff;text-decoration:none;border-radius:50%;text-align:center;font-size:11px;font-weight:700;">${label.slice(0, 2).toUpperCase()}</a>
        </td>`;
      })
      .join('');

    return blockRow(
      `<table role="presentation" class="stack-column" cellpadding="0" cellspacing="0" border="0" align="${align}" style="margin:0 auto;width:100%;"><tr>${icons}</tr></table>`,
    );
  },
};
