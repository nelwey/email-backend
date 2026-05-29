import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('возвращает случайные товары заданного количества', () => {
    const products = service.getRandomProducts(2);
    expect(products).toHaveLength(2);
  });

  it('структура программы содержит name, image, subtitle', () => {
    const [product] = service.getRandomProducts(1);
    expect(product).toMatchObject({
      name: expect.any(String),
      image: expect.any(String),
      subtitle: expect.any(String),
    });
  });

  it('не возвращает больше товаров чем в каталоге', () => {
    const all = service.findAll();
    const products = service.getRandomProducts(100);
    expect(products.length).toBeLessThanOrEqual(all.length);
  });
});
