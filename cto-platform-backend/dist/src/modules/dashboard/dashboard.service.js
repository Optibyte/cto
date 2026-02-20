"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getKPIs() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const currentMetrics = await this.prisma.metric.findMany({
            where: {
                time: {
                    gte: thirtyDaysAgo,
                },
            },
        });
        const velocity = this.calculateMetricKPI(currentMetrics, 'velocity');
        const quality = this.calculateMetricKPI(currentMetrics, 'quality');
        const throughput = this.calculateMetricKPI(currentMetrics, 'throughput');
        const cycleTime = this.calculateMetricKPI(currentMetrics, 'cycle_time');
        return {
            velocity,
            quality,
            throughput,
            cycleTime,
        };
    }
    calculateMetricKPI(metrics, metricType) {
        const filtered = metrics.filter((m) => m.metricType === metricType);
        if (filtered.length === 0) {
            return {
                current: 0,
                previous: 0,
                change: 0,
                trend: 'neutral',
                sparkline: [],
            };
        }
        const values = filtered.map((m) => m.value);
        const current = values.reduce((a, b) => a + b, 0) / values.length;
        const previous = current * 0.9;
        const change = ((current - previous) / previous) * 100;
        return {
            current: parseFloat(current.toFixed(2)),
            previous: parseFloat(previous.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
            sparkline: values.slice(0, 7),
        };
    }
    async getTeamPerformance() {
        const teams = await this.prisma.team.findMany({
            where: { isActive: true },
            include: {
                metrics: {
                    orderBy: { time: 'desc' },
                    take: 10,
                },
                _count: {
                    select: {
                        members: true,
                    },
                },
            },
        });
        return teams.map((team) => {
            const velocityMetrics = team.metrics.filter((m) => m.metricType === 'velocity');
            const qualityMetrics = team.metrics.filter((m) => m.metricType === 'quality');
            const avgVelocity = velocityMetrics.length > 0
                ? velocityMetrics.reduce((sum, m) => sum + m.value, 0) /
                    velocityMetrics.length
                : 0;
            const avgQuality = qualityMetrics.length > 0
                ? qualityMetrics.reduce((sum, m) => sum + m.value, 0) /
                    qualityMetrics.length
                : 0;
            const score = avgVelocity * 0.4 + avgQuality * 0.6;
            return {
                team: team.name,
                score: parseFloat(score.toFixed(1)),
                members: team._count.members,
                velocity: parseFloat(avgVelocity.toFixed(1)),
                quality: parseFloat(avgQuality.toFixed(1)),
            };
        });
    }
    async getSLAStatus() {
        const slas = await this.prisma.sLADefinition.findMany({
            where: { isActive: true },
            include: {
                metrics: {
                    orderBy: { time: 'desc' },
                    take: 1,
                },
            },
        });
        let met = 0;
        let atRisk = 0;
        let missed = 0;
        slas.forEach((sla) => {
            if (sla.metrics.length > 0) {
                const latest = sla.metrics[0];
                if (latest.status === 'met')
                    met++;
                else if (latest.status === 'at_risk')
                    atRisk++;
                else if (latest.status === 'missed')
                    missed++;
            }
        });
        return { met, atRisk, missed };
    }
    async getRecentActivity() {
        const auditLogs = await this.prisma.auditLog.findMany({
            take: 10,
            orderBy: { timestamp: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        role: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        return auditLogs.map((log) => ({
            id: log.id,
            type: log.action.toLowerCase(),
            title: `${log.action} ${log.entityType}`,
            description: `Entity ID: ${log.entityId}`,
            timestamp: log.timestamp,
            user: log.user
                ? {
                    id: log.user.id,
                    name: log.user.fullName,
                    email: log.user.email,
                    role: log.user.role,
                    avatar: log.user.avatarUrl,
                }
                : undefined,
        }));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map