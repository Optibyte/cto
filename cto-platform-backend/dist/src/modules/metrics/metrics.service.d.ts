import { PrismaService } from '../../prisma/prisma.service';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: any): Promise<({
        team: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        teamId: string;
        metricType: import("@prisma/client").$Enums.MetricType;
        userId: string | null;
        time: Date;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    })[]>;
    findByTeam(teamId: string): Promise<{
        id: string;
        teamId: string;
        metricType: import("@prisma/client").$Enums.MetricType;
        userId: string | null;
        time: Date;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }[]>;
    create(data: any): Promise<{
        id: string;
        teamId: string;
        metricType: import("@prisma/client").$Enums.MetricType;
        userId: string | null;
        time: Date;
        value: number;
        unit: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }>;
    bulkCreate(data: any[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getAggregates(teamId: string, metricType: string, startDate: Date, endDate: Date): Promise<{
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
}
