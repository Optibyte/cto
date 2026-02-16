import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getKPIs(): Promise<{
        velocity: {
            current: number;
            previous: number;
            change: number;
            trend: "up" | "down" | "neutral";
            sparkline: any[];
        };
        quality: {
            current: number;
            previous: number;
            change: number;
            trend: "up" | "down" | "neutral";
            sparkline: any[];
        };
        throughput: {
            current: number;
            previous: number;
            change: number;
            trend: "up" | "down" | "neutral";
            sparkline: any[];
        };
        cycleTime: {
            current: number;
            previous: number;
            change: number;
            trend: "up" | "down" | "neutral";
            sparkline: any[];
        };
    }>;
    private calculateMetricKPI;
    getTeamPerformance(): Promise<any>;
    getSLAStatus(): Promise<{
        met: number;
        atRisk: number;
        missed: number;
    }>;
    getRecentActivity(): Promise<any>;
}
