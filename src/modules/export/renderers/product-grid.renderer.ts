import type { WidgetRenderer } from '../../../interfaces/widget-renderer.interface';
import type { ProductItem } from '../../../types/editor.types';
import { blockRow, escapeHtml } from '../../../utils/html.utils';

function formatProductDetail(product: ProductItem): string {
  if (product.subtitle) {
    return escapeHtml(product.subtitle);
  }
  if (product.price != null) {
    return `${escapeHtml(String(product.price))} ₽`;
  }
  return '';
}

export const productGridRenderer: WidgetRenderer = {
  type: 'product-grid',
  render({ block, products = [] }) {
    const columns = Math.max(1, Math.min(4, Number(block.props.columns ?? 2)));
    const spacing = Number(block.props.spacing ?? 12);
    const title = escapeHtml(
      String(block.props.title ?? 'Популярные направления подготовки'),
    );

    const cellWidth = Math.floor(100 / columns);
    const rows: string[] = [];

    for (let i = 0; i < products.length; i += columns) {
      const chunk = products.slice(i, i + columns);
      const cells = chunk
        .map((product) => {
          const name = escapeHtml(product.name);
          const image = escapeHtml(product.image);
          const detail = formatProductDetail(product);
          const detailRow = detail
            ? `<tr><td style="padding:0 12px 12px;font-size:13px;line-height:1.4;color:#52525b;">${detail}</td></tr>`
            : '';
          return `<td class="product-cell stack-column" width="${cellWidth}%" valign="top" style="padding:${spacing / 2}px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e4e4e7;border-radius:8px;width:100%;background-color:#ffffff;">
              <tr><td style="padding:8px;text-align:center;"><img class="fluid-img" src="${image}" alt="${name}" width="120" style="width:100%;max-width:160px;height:auto;border-radius:4px;margin:0 auto;display:block;" /></td></tr>
              <tr><td style="padding:8px 12px 4px;font-size:14px;font-weight:600;line-height:1.35;color:#18181b;">${name}</td></tr>
              ${detailRow}
            </table>
          </td>`;
        })
        .join('');

      rows.push(`<tr>${cells}</tr>`);
    }

    const grid =
      rows.length > 0
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join('')}</table>`
        : `<p style="margin:0;color:#71717a;font-size:14px;text-align:center;">Нет программ для отображения</p>`;

    return blockRow(
      `<h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#18181b;text-align:center;">${title}</h3>${grid}`,
    );
  },
};
