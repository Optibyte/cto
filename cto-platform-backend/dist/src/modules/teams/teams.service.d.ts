import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto, AddTeamMemberDto } from './dto/team.dto';
export declare class TeamsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        teamLead: {
            id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
        };
        members: ({
            user: {
                id: string;
                email: string;
                fullName: string;
                role: import("@prisma/client").$Enums.UserRole;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            teamId: string;
            userId: string;
            roleInTeam: string;
            joinedAt: Date;
            leftAt: Date | null;
        })[];
        _count: {
            members: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        parentTeamId: string | null;
        accountId: string;
        teamLeadId: string;
    })[]>;
    findOne(id: string): Promise<({
        teamLead: {
            id: string;
            auth0Id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
            timezone: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            lastLoginAt: Date | null;
        };
        members: ({
            user: {
                id: string;
                auth0Id: string;
                email: string;
                fullName: string;
                role: import("@prisma/client").$Enums.UserRole;
                avatarUrl: string | null;
                timezone: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                lastLoginAt: Date | null;
            };
        } & {
            id: string;
            teamId: string;
            userId: string;
            roleInTeam: string;
            joinedAt: Date;
            leftAt: Date | null;
        })[];
        metrics: {
            id: string;
            teamId: string;
            metricType: import("@prisma/client").$Enums.MetricType;
            userId: string | null;
            time: Date;
            value: number;
            unit: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            source: import("@prisma/client").$Enums.SourceType;
            createdBy: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        parentTeamId: string | null;
        accountId: string;
        teamLeadId: string;
    }) | null>;
    create(data: CreateTeamDto): Promise<{
        teamLead: {
            id: string;
            auth0Id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
            timezone: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            lastLoginAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        parentTeamId: string | null;
        accountId: string;
        teamLeadId: string;
    }>;
    update(id: string, data: UpdateTeamDto): Promise<{
        teamLead: {
            id: string;
            auth0Id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
            timezone: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            lastLoginAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        parentTeamId: string | null;
        accountId: string;
        teamLeadId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        parentTeamId: string | null;
        accountId: string;
        teamLeadId: string;
    }>;
    addMember(teamId: string, data: AddTeamMemberDto): Promise<{
        user: {
            id: string;
            auth0Id: string;
            email: string;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatarUrl: string | null;
            timezone: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            lastLoginAt: Date | null;
        };
        team: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            name: string;
            description: string | null;
            parentTeamId: string | null;
            accountId: string;
            teamLeadId: string;
        };
    } & {
        id: string;
        teamId: string;
        userId: string;
        roleInTeam: string;
        joinedAt: Date;
        leftAt: Date | null;
    }>;
    removeMember(teamId: string, userId: string): Promise<{
        id: string;
        teamId: string;
        userId: string;
        roleInTeam: string;
        joinedAt: Date;
        leftAt: Date | null;
    }>;
}
