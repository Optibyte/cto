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
exports.SlaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SlaService = class SlaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
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
    async create(data) {
        return this.prisma.sLADefinition.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.sLADefinition.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.sLADefinition.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async getBreaches(slaId) {
        const where = {};
        if (slaId)
            where.slaId = slaId;
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
};
exports.SlaService = SlaService;
exports.SlaService = SlaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SlaService);
//# sourceMappingURL=sla.service.js.map