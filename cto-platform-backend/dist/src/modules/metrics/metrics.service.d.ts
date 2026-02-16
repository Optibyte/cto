import { PrismaService } from '../../prisma/prisma.service';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: any): Promise<any>;
    findByTeam(teamId: string): Promise<any>;
    create(data: any): Promise<any>;
    bulkCreate(data: any[]): Promise<any>;
    getAggregates(teamId: string, metricType: string, startDate: Date, endDate: Date): Promise<{
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
}
