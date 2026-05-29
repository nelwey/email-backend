/** Párrafos (\n\n) y saltos de línea (\n) para HTML de email */
export function textContentToEmailParagraphs(
  content: string,
  paragraphStyle: string,
): string {
  const normalized = String(content).replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return `<p style="${paragraphStyle}"></p>`;
  }

  return normalized
    .split(/\n\n+/)
    .map((paragraph) => {
      const html = paragraph
        .split('\n')
        .map((line) => escapeHtml(line))
        .join('<br>');
      return `<p style="${paragraphStyle}">${html}</p>`;
    })
    .join('');
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Ancho de columna de contenido (patrón similar a Unlayer) */
export const EMAIL_CONTENT_MAX_WIDTH = 500;

/** CSS responsive — estructura tipo Unlayer sin “marco” blanco extra */
export function getEmailResponsiveStyles(): string {
  return `<style type="text/css">
    #outlook a { padding: 0; }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    p { margin: 0; }
    img {
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
      height: auto;
      display: block;
    }
    #u_body {
      width: 100%;
      min-width: 320px;
      background-color: #F7F8F9;
    }
    .u-row-container {
      width: 100%;
      max-width: ${EMAIL_CONTENT_MAX_WIDTH}px;
      margin: 0 auto;
      padding: 0;
      background-color: transparent;
    }
    .fluid-img {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
    }
    @media only screen and (min-width: 520px) {
      .u-row-container {
        width: ${EMAIL_CONTENT_MAX_WIDTH}px !important;
      }
    }
    @media only screen and (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .stack-column {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .product-cell {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        padding-bottom: 10px !important;
      }
      .email-button {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }
      .u-block-cell p {
        font-size: 14px !important;
        line-height: 1.4 !important;
      }
      .qr-img {
        width: min(100%, 200px) !important;
        height: auto !important;
        margin: 0 auto !important;
      }
    }
  </style>`;
}

export function wrapEmailDocument(subject: string, body: string): string {
  const safeSubject = escapeHtml(subject);
  return `<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>${safeSubject}</title>
  ${getEmailResponsiveStyles()}
</head>
<body class="u_body" style="margin:0;padding:0;width:100%;background-color:#F7F8F9;color:#000000;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" id="u_body" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;min-width:320px;background-color:#F7F8F9;width:100%;">
    <tr>
      <td align="center" style="word-break:break-word;">
        <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F7F8F9;" bgcolor="#F7F8F9"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${EMAIL_CONTENT_MAX_WIDTH}" align="center"><tr><td style="padding:0;"><![endif]-->
        <table role="presentation" class="u-row-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:${EMAIL_CONTENT_MAX_WIDTH}px;width:100%;background-color:transparent;">
          ${body}
        </table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function blockRow(
  inner: string,
  padding = '10px',
  options?: { tight?: boolean },
): string {
  const pad = options?.tight ? '8px 10px' : padding;
  return `<tr><td class="u-block-cell" align="left" style="overflow-wrap:break-word;word-break:break-word;padding:${pad};font-family:Arial,Helvetica,sans-serif;">${inner}</td></tr>`;
}
