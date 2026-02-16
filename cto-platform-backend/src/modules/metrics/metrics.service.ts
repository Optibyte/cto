import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MetricType } from '@prisma/client';

@Injectable()
export class MetricsService {
    constructor(private prisma: PrismaService) { }

    async findAll(filters?: any) {
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

    async findByTeam(teamId: string) {
        return this.prisma.metric.findMany({
            where: { teamId },
            orderBy: { time: 'desc' },
            take: 50,
        });
    }

    async create(data: any) {
        return this.prisma.metric.create({
            data,
        });
    }

    async bulkCreate(data: any[]) {
        return this.prisma.metric.createMany({
            data,
        });
    }

    async getAggregates(teamId: string, metricType: string, startDate: Date, endDate: Date) {
        const metrics = await this.prisma.metric.findMany({
            where: {
                teamId,
                metricType: metricType as MetricType,
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
}
