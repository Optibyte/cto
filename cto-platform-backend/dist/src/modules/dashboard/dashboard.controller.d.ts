import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getKPIs(): Promise<{
        velocity: {
            current: number;
            previous: number;
            change: number;
            trend: string;
            sparkline: number[];
        };
        quality: {
            current: number;
            previous: number;
            change: number;
            trend: string;
            sparkline: number[];
        };
        throughput: {
            current: number;
            previous: number;
            change: number;
            trend: string;
            sparkline: number[];
        };
        cycleTime: {
            current: number;
            previous: number;
            change: number;
            trend: string;
            sparkline: number[];
        };
    }>;
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
