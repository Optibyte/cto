import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/metric.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    findAll(teamId?: string, metricType?: string): Promise<any>;
    findByTeam(teamId: string): Promise<any>;
    getAggregates(teamId: string, metricType: string, startDate: string, endDate: string): Promise<{
        metricType: string;
        count: any;
        sum: any;
        avg: number;
        min: number;
        max: number;
        unit: any;
        startDate: Date;
        endDate: Date;
    } | null>;
    create(createMetricDto: CreateMetricDto): Promise<any>;
    bulkCreate(createMetricsDto: CreateMetricDto[]): Promise<any>;
}
