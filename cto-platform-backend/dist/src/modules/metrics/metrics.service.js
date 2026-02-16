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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MetricsService = class MetricsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        return this.prisma.metric.findMany({
            where: filters,
            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                time: 'desc',
            },
            take: 100,
        });
    }
    async findByTeam(teamId) {
        return this.prisma.metric.findMany({
            where: { teamId },
            orderBy: { time: 'desc' },
            take: 50,
        });
    }
    async create(data) {
        return this.prisma.metric.create({
            data,
        });
    }
    async bulkCreate(data) {
        return this.prisma.metric.createMany({
            data,
        });
    }
    async getAggregates(teamId, metricType, startDate, endDate) {
        const metrics = await this.prisma.metric.findMany({
            where: {
                teamId,
                metricType: metricType,
                time: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: {
                time: 'asc',
            },
        });
        if (metrics.length === 0) {
            return null;
        }
        const values = metrics.map(m => m.value);
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);
        return {
            metricType,
            count: metrics.length,
            sum,
            avg,
            min,
            max,
            unit: metrics[0].unit,
            startDate,
            endDate,
        };
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map