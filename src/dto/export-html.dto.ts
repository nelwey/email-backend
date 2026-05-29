import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { EditorBlock } from '../types/editor.types';

export class EditorBlockDto implements EditorBlock {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: EditorBlock['type'];

  @IsObject()
  props: Record<string, unknown>;
}

export class ExportHtmlDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditorBlockDto)
  blocks: EditorBlockDto[];
}
