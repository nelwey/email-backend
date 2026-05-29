import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createE2eApp } from '../utils/create-test-app';

describe('Validation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /templates — 400 без обязательного name', async () => {
    await request(app.getHttpServer())
      .post('/templates')
      .send({ subject: 'Без имени', blocks: [] })
      .expect(400);
  });

  it('POST /templates — 400 при невалидной структуре блока', async () => {
    await request(app.getHttpServer())
      .post('/templates')
      .send({
        name: 'Плохой шаблон',
        blocks: [{ id: '', type: '', props: 'not-an-object' }],
      })
      .expect(400);
  });

  it('POST /widgets — 400 без type и label', async () => {
    await request(app.getHttpServer()).post('/widgets').send({ description: 'x' }).expect(400);
  });

  it('POST /export/html — 400 при лишних полях (forbidNonWhitelisted)', async () => {
    await request(app.getHttpServer())
      .post('/export/html')
      .send({
        subject: 'Test',
        blocks: [],
        unknownField: true,
      })
      .expect(400);
  });

  it('POST /widgets/qr/generate — 400 без content', async () => {
    await request(app.getHttpServer()).post('/widgets/qr/generate').send({}).expect(400);
  });
});
