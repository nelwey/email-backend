import type { ProductItem } from '../../types/editor.types';

function parseProductGridItem(entry: unknown): ProductItem | null {
  if (!entry || typeof entry !== 'object') return null;

  const item = entry as Record<string, unknown>;
  const name = String(item.name ?? '').trim();
  if (!name) return null;

  const parsed: ProductItem = {
    name,
    image: String(item.image ?? '').trim(),
  };

  if (item.subtitle != null) {
    parsed.subtitle = String(item.subtitle);
  }

  if (item.price != null && !Number.isNaN(Number(item.price))) {
    parsed.price = Number(item.price);
  }

  return parsed;
}

export function parseProductGridItems(raw: unknown): ProductItem[] {
  if (!Array.isArray(raw)) return [];

  const items: ProductItem[] = [];
  for (const entry of raw) {
    const parsed = parseProductGridItem(entry);
    if (parsed) items.push(parsed);
  }
  return items;
}

export function getProductGridCount(rows: number, columns: number): number {
  return Math.max(1, rows * columns);
}
