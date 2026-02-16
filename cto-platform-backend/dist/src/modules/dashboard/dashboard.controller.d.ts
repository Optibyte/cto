import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
    getTeamPerformance(): Promise<any>;
    getSLAStatus(): Promise<{
        met: number;
        atRisk: number;
        missed: number;
    }>;
    getRecentActivity(): Promise<any>;
}
