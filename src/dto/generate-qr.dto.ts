import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateQrDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(64)
  @Max(512)
  size?: number;
}
