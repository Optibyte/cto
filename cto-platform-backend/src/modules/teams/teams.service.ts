import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto, AddTeamMemberDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany({
      include: {
        teamLead: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            avatarUrl: true,
          },
        },
        members: {
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
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        teamLead: true,
        members: {
          include: {
            user: true,
          },
        },
        metrics: {
          orderBy: { time: 'desc' },
          take: 10,
        },
      },
    });
  }

  async create(data: CreateTeamDto) {
    return this.prisma.team.create({
      data,
      include: {
        teamLead: true,
      },
    });
  }

  async update(id: string, data: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data,
      include: {
        teamLead: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.team.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async addMember(teamId: string, data: AddTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId: data.userId,
        roleInTeam: data.roleInTeam,
      },
      include: {
        user: true,
        team: true,
      },
    });
  }

  async removeMember(teamId: string, userId: string) {
    // Find the most recent active membership
    const membership = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
        leftAt: null,
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    if (!membership) {
      throw new Error('Team member not found');
    }

    return this.prisma.teamMember.update({
      where: { id: membership.id },
      data: { leftAt: new Date() },
    });
  }
}
