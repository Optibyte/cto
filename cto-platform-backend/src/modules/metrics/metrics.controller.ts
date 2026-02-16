import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/metric.dto';

@ApiTags('metrics')
@Controller('api/v1/metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all metrics with optional filters' })
    @ApiQuery({ name: 'teamId', required: false, description: 'Filter by team ID' })
    @ApiQuery({ name: 'metricType', required: false, description: 'Filter by metric type' })
    @ApiResponse({ status: 200, description: 'Returns filtered metrics' })
    findAll(@Query('teamId') teamId?: string, @Query('metricType') metricType?: string) {
        const filters: any = {};
        if (teamId) filters.teamId = teamId;
        if (metricType) filters.metricType = metricType;
        return this.metricsService.findAll(filters);
    }

    @Get('team/:teamId')
    @ApiOperation({ summary: 'Get metrics by team ID' })
    @ApiResponse({ status: 200, description: 'Returns team metrics' })
    findByTeam(@Param('teamId') teamId: string) {
        return this.metricsService.findByTeam(teamId);
    }

    @Get('aggregates/:teamId/:metricType')
    @ApiOperation({ summary: 'Get metric aggregates for a team' })
    @ApiQuery({ name: 'startDate', required: true, example: '2024-01-01' })
    @ApiQuery({ name: 'endDate', required: true, example: '2024-01-31' })
    @ApiResponse({ status: 200, description: 'Returns aggregated metrics' })
    getAggregates(
        @Param('teamId') teamId: string,
        @Param('metricType') metricType: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.metricsService.getAggregates(
            teamId,
            metricType,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Post()
    @ApiOperation({ summary: 'Create a new metric' })
    @ApiResponse({ status: 201, description: 'Metric created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    create(@Body() createMetricDto: CreateMetricDto) {
        return this.metricsService.create(createMetricDto);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Bulk create metrics' })
    @ApiResponse({ status: 201, description: 'Metrics created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    bulkCreate(@Body() createMetricsDto: CreateMetricDto[]) {
        return this.metricsService.bulkCreate(createMetricsDto);
    }
}
