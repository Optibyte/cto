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
    getTeamPerformance(): Promise<{
        team: string;
        score: number;
        members: number;
        velocity: number;
        quality: number;
    }[]>;
    getSLAStatus(): Promise<{
        met: number;
        atRisk: number;
        missed: number;
    }>;
    getRecentActivity(): Promise<{
        id: string;
        type: string;
        title: string;
        description: string;
        timestamp: Date;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatar: string | null;
        } | undefined;
    }[]>;
}
