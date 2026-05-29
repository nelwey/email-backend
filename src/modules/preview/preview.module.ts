import { Module } from '@nestjs/common';
import { ExportModule } from '../export/export.module';
import { PreviewController } from './preview.controller';

@Module({
  imports: [ExportModule],
  controllers: [PreviewController],
})
export class PreviewModule {}
