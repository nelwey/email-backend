import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { ExportModule } from './modules/export/export.module';
import { PreviewModule } from './modules/preview/preview.module';
import { ProductsModule } from './modules/products/products.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { WidgetsModule } from './modules/widgets/widgets.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    ProductsModule,
    ExportModule,
    PreviewModule,
    WidgetsModule,
    TemplatesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
