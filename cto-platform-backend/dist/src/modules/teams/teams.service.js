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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TeamsService = class TeamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
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
    async create(data) {
        return this.prisma.team.create({
            data,
            include: {
                teamLead: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.team.update({
            where: { id },
            data,
            include: {
                teamLead: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.team.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async addMember(teamId, data) {
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
    async removeMember(teamId, userId) {
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
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map