import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';
import { sampleExportPayload } from '../utils/sample-blocks';

describe('POST /export/html (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('возвращает сгенерированный HTML', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/export/html')
      .send(sampleExportPayload)
      .expect(201);

    expect(response.body.data.html).toContain('<!DOCTYPE html>');
    expect(response.body.data.html).toContain('Заголовок письма');
    expect(response.body.data.html).toContain('Перейти в магазин');
  });

  it('отклоняет пустой массив blocks при отсутствии поля', async () => {
    await request(app.getHttpServer())
      .post('/api/export/html')
      .send({ subject: 'Без блоков' })
      .expect(400);
  });
});
