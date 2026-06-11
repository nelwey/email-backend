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
      .get('/api/products/random?count=2')
      .expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0]).toMatchObject({
      name: expect.any(String),
      image: expect.any(String),
      subtitle: expect.any(String),
    });
  });

  it('возвращает программы из mock-каталога', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/products/random?count=6')
      .expect(200);

    const names = response.body.data.map((p: { name: string }) => p.name);
    expect(names.length).toBeGreaterThan(0);
    expect(names.some((n: string) => n.includes('Информатика'))).toBe(true);
  });
});
