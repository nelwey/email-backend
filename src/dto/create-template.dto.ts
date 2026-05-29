import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EditorBlockDto } from './export-html.dto';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditorBlockDto)
  blocks: EditorBlockDto[];
}
