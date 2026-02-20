import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/metric.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    findAll(teamId?: string, metricType?: string): Promise<({
        team: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        teamId: string;
        userId: string | null;
        time: Date;
        metricType: import("@prisma/client").$Enums.MetricType;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    })[]>;
    findByTeam(teamId: string): Promise<{
        id: string;
        teamId: string;
        userId: string | null;
        time: Date;
        metricType: import("@prisma/client").$Enums.MetricType;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }[]>;
    getAggregates(teamId: string, metricType: string, startDate: string, endDate: string): Promise<{
        metricType: string;
        count: number;
        sum: number;
        avg: number;
        min: number;
        max: number;
        unit: string;
        startDate: Date;
        endDate: Date;
    } | null>;
    create(createMetricDto: CreateMetricDto): Promise<{
        id: string;
        teamId: string;
        userId: string | null;
        time: Date;
        metricType: import("@prisma/client").$Enums.MetricType;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }>;
    bulkCreate(createMetricsDto: CreateMetricDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
