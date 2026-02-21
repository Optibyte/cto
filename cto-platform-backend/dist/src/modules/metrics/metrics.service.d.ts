import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: Prisma.MetricWhereInput): Promise<({
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
        metadata: Prisma.JsonValue | null;
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
        metadata: Prisma.JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }[]>;
    create(data: Prisma.MetricUncheckedCreateInput): Promise<{
        id: string;
        teamId: string;
        metricType: import("@prisma/client").$Enums.MetricType;
        userId: string | null;
        time: Date;
        value: number;
        unit: string;
        metadata: Prisma.JsonValue | null;
        source: import("@prisma/client").$Enums.SourceType;
        createdBy: string;
    }>;
    bulkCreate(data: Prisma.MetricUncheckedCreateInput[]): Promise<Prisma.BatchPayload>;
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
