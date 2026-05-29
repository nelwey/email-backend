import { Injectable } from '@nestjs/common';
import type { ProductItem } from '../../types/editor.types';
import mockProductsJson from './data/products.mock.json';

@Injectable()
export class ProductsService {
  private readonly catalog: ProductItem[] = Array.isArray(mockProductsJson)
    ? mockProductsJson
    : ((mockProductsJson as { default: ProductItem[] }).default ?? []);

  findAll(): ProductItem[] {
    return [...this.catalog];
  }

  getRandomProducts(count = 2): ProductItem[] {
    const size = Math.max(1, Math.min(count, this.catalog.length));
    const shuffled = [...this.catalog].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, size);
  }
}
