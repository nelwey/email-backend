import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';
import { sampleExportPayload } from '../utils/sample-blocks';

describe('Templates API (e2e)', () => {
  let app: INestApplication;
  let templateId: string;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /templates — пустой список в начале', async () => {
    const response = await request(app.getHttpServer()).get('/templates').expect(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('POST /templates — создаёт шаблон с JSON и HTML', async () => {
    const response = await request(app.getHttpServer())
      .post('/templates')
      .send({
        name: 'Шаблон тест',
        subject: sampleExportPayload.subject,
        blocks: sampleExportPayload.blocks,
      })
      .expect(201);

    templateId = response.body.data.id;
    expect(response.body.data.structure.blocks).toHaveLength(2);
    expect(response.body.data.html).toContain('<!DOCTYPE html>');
  });

  it('GET /templates/:id — возвращает шаблон', async () => {
    const response = await request(app.getHttpServer())
      .get(`/templates/${templateId}`)
      .expect(200);

    expect(response.body.data.id).toBe(templateId);
    expect(response.body.data.name).toBe('Шаблон тест');
  });

  it('PUT /templates/:id — обновляет шаблон', async () => {
    const response = await request(app.getHttpServer())
      .put(`/templates/${templateId}`)
      .send({ name: 'Обновлённый шаблон', subject: 'Новая тема' })
      .expect(200);

    expect(response.body.data.name).toBe('Обновлённый шаблон');
    expect(response.body.data.subject).toBe('Новая тема');
  });

  it('DELETE /templates/:id — удаляет шаблон', async () => {
    await request(app.getHttpServer()).delete(`/templates/${templateId}`).expect(200);

    await request(app.getHttpServer()).get(`/templates/${templateId}`).expect(404);
  });
});
