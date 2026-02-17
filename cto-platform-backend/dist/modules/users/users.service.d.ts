import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.UserRole;
        avatarUrl: string | null;
        timezone: string;
        createdAt: Date;
        lastLoginAt: Date | null;
    }[]>;
    findOne(id: string): Promise<({
        teamsLed: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            name: string;
            description: string | null;
            parentTeamId: string | null;
            accountId: string;
            teamLeadId: string;
        }[];
        teamMembers: ({
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
        })[];
    } & {
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
    }) | null>;
    findByEmail(email: string): Promise<{
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
    } | null>;
    create(data: any): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    updateLastLogin(id: string): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
