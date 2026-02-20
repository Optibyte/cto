import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSLADto {
  @ApiProperty({ example: 'Response Time SLA' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Customer support first response time' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'uuid-team-id' })
  @IsUUID()
  teamId: string;

  @ApiProperty({ example: 'response_time' })
  @IsString()
  metricType: string;

  @ApiProperty({ example: 2.0 })
  @IsNumber()
  targetValue: number;

  @ApiProperty({ example: 1.6 })
  @IsNumber()
  thresholdWarning: number;

  @ApiProperty({ example: 1.8 })
  @IsNumber()
  thresholdCritical: number;

  @ApiProperty({ example: '24h' })
  @IsString()
  measurementWindow: string;
}

export class UpdateSLADto {
  @ApiPropertyOptional({ example: 'Updated SLA Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 2.5 })
  @IsNumber()
  @IsOptional()
  targetValue?: number;

  @ApiPropertyOptional({ example: 2.0 })
  @IsNumber()
  @IsOptional()
  thresholdWarning?: number;

  @ApiPropertyOptional({ example: 2.2 })
  @IsNumber()
  @IsOptional()
  thresholdCritical?: number;

  @ApiPropertyOptional({ example: '48h' })
  @IsString()
  @IsOptional()
  measurementWindow?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
