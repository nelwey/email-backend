import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';
import { sampleExportPayload } from '../utils/sample-blocks';

describe('POST /preview (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('возвращает preview HTML и метаданные', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/preview')
      .send(sampleExportPayload)
      .expect(201);

    expect(response.body.data.subject).toBe('Тестовая рассылка');
    expect(response.body.data.blockCount).toBe(2);
    expect(response.body.data.html).toContain('<table');
  });
});
