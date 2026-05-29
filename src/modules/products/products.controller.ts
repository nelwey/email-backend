import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('random')
  getRandom(@Query('count') count?: string) {
    const parsed = count ? parseInt(count, 10) : 2;
    const products = this.productsService.getRandomProducts(
      Number.isNaN(parsed) ? 2 : parsed,
    );
    return { data: products };
  }
}
