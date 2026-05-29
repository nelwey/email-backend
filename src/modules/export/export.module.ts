import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ExportController } from './export.controller';
import { HtmlExportService } from './html-export.service';

@Module({
  imports: [ProductsModule],
  controllers: [ExportController],
  providers: [HtmlExportService],
  exports: [HtmlExportService],
})
export class ExportModule {}
