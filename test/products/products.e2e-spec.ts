import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';

describe('GET /products/random (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('возвращает случайные товары', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/random?count=2')
      .expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0]).toMatchObject({
      name: expect.any(String),
      image: expect.any(String),
      price: expect.any(Number),
    });
  });

  it('возвращает mock-товары test1 и test2 из каталога', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/random?count=8')
      .expect(200);

    const names = response.body.data.map((p: { name: string }) => p.name);
    expect(names).toContain('test1');
    expect(names).toContain('test2');
  });
});
