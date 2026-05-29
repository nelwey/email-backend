import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from '../../src/database/entities/template.entity';
import { WidgetEntity } from '../../src/database/entities/widget.entity';
import { ExportModule } from '../../src/modules/export/export.module';
import { PreviewModule } from '../../src/modules/preview/preview.module';
import { ProductsModule } from '../../src/modules/products/products.module';
import { TemplatesModule } from '../../src/modules/templates/templates.module';
import { WidgetsModule } from '../../src/modules/widgets/widgets.module';

export async function createE2eApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [TemplateEntity, WidgetEntity],
        synchronize: true,
        dropSchema: true,
      }),
      ProductsModule,
      ExportModule,
      PreviewModule,
      WidgetsModule,
      TemplatesModule,
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.init();
  return app;
}
