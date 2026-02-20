import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MetricType {
  velocity = 'velocity',
  quality = 'quality',
  throughput = 'throughput',
  cycle_time = 'cycle_time',
  lead_time = 'lead_time',
  bug_rate = 'bug_rate',
  deployment_frequency = 'deployment_frequency',
  mttr = 'mttr',
  change_failure_rate = 'change_failure_rate',
}

export enum SourceType {
  jira = 'jira',
  github = 'github',
  csv = 'csv',
  manual = 'manual',
}

export class CreateMetricDto {
  @ApiProperty({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  time: string;

  @ApiProperty({ example: 'uuid-team-id' })
  @IsUUID()
  teamId: string;

  @ApiPropertyOptional({ example: 'uuid-user-id' })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ enum: MetricType, example: MetricType.velocity })
  @IsEnum(MetricType)
  metricType: MetricType;

  @ApiProperty({ example: 245.5 })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 'points' })
  @IsString()
  unit: string;

  @ApiPropertyOptional({
    example: { sprint: 'Sprint 24', notes: 'Good velocity' },
  })
  @IsObject()
  @IsOptional()
  metadata?: any;

  @ApiProperty({ enum: SourceType, example: SourceType.jira })
  @IsEnum(SourceType)
  source: SourceType;

  @ApiProperty({ example: 'uuid-creator-user-id' })
  @IsUUID()
  createdBy: string;
}

export class BulkCreateMetricDto {
  @ApiProperty({ type: [CreateMetricDto] })
  metrics: CreateMetricDto[];
}
