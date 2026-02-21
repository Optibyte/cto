import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SlaService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.sLADefinition.findMany({
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            breaches: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.sLADefinition.findUnique({
      where: { id },
      include: {
        team: true,
        metrics: {
          orderBy: { time: 'desc' },
          take: 30,
        },
        breaches: {
          where: { isResolved: false },
        },
      },
    });
  }

  async create(data: Prisma.SLADefinitionUncheckedCreateInput) {
    return this.prisma.sLADefinition.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SLADefinitionUncheckedUpdateInput) {
    return this.prisma.sLADefinition.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.sLADefinition.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getBreaches(slaId?: string) {
    const where: Prisma.SLABreachWhereInput = {};
    if (slaId) where.slaId = slaId;

    return this.prisma.sLABreach.findMany({
      where,
      include: {
        sla: {
          include: {
            team: true,
          },
        },
      },
      orderBy: {
        breachStart: 'desc',
      },
    });
  }
}
