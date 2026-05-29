import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';

describe('Widgets API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /widgets — возвращает зарегистрированные виджеты', async () => {
    const response = await request(app.getHttpServer()).get('/widgets').expect(200);

    expect(response.body.data.length).toBeGreaterThanOrEqual(7);
    const types = response.body.data.map((w: { type: string }) => w.type);
    expect(types).toContain('text');
    expect(types).toContain('product-grid');
    expect(types).toContain('qr-code');
    expect(types).toContain('social');
  });

  it('POST /widgets — регистрирует новый виджет', async () => {
    const response = await request(app.getHttpServer())
      .post('/widgets')
      .send({
        type: 'custom-banner',
        label: 'Баннер',
        description: 'Тестовый виджет',
        category: 'Тест',
        defaultConfig: { title: 'Hello' },
      })
      .expect(201);

    expect(response.body.data.type).toBe('custom-banner');
    expect(response.body.data.defaultConfig).toEqual({ title: 'Hello' });

    const getResponse = await request(app.getHttpServer())
      .get(`/widgets/${response.body.data.id}`)
      .expect(200);

    expect(getResponse.body.data.label).toBe('Баннер');
  });

  it('POST /widgets/qr/generate — возвращает data URL', async () => {
    const response = await request(app.getHttpServer())
      .post('/widgets/qr/generate')
      .send({ content: 'https://example.com', size: 128 })
      .expect(201);

    expect(response.body.data.dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('POST /widgets — отклоняет дубликат type', async () => {
    await request(app.getHttpServer())
      .post('/widgets')
      .send({
        type: 'text',
        label: 'Дубликат',
      })
      .expect(409);
  });
});
