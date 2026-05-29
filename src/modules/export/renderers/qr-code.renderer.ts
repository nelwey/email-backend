import * as QRCode from 'qrcode';
import type { WidgetRenderer } from '../../../interfaces/widget-renderer.interface';
import { blockRow, escapeHtml } from '../../../utils/html.utils';

export const qrCodeRenderer: WidgetRenderer = {
  type: 'qr-code',
  async render({ block }) {
    const content = String(block.props.content ?? block.props.url ?? '');
    const size = Number(block.props.size ?? 160);
    const caption = escapeHtml(String(block.props.caption ?? ''));

    if (!content.trim()) {
      return blockRow(
        `<p style="margin:0;text-align:center;color:#71717a;font-size:14px;">QR-код: укажите текст или URL</p>`,
      );
    }

    const dataUrl = await QRCode.toDataURL(content, {
      width: size,
      margin: 1,
      errorCorrectionLevel: 'M',
    });

    const captionHtml = caption
      ? `<p style="margin:8px 0 0;font-size:13px;color:#52525b;text-align:center;">${caption}</p>`
      : '';

    const mobileSize = Math.min(size, 200);
    return blockRow(
      `<div style="text-align:center;">
        <img class="qr-img fluid-img" src="${dataUrl}" alt="QR-код" width="${mobileSize}" style="display:block;margin:0 auto;max-width:100%;height:auto;" />
        ${captionHtml}
      </div>`,
    );
  },
};
