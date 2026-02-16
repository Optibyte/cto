import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    create(createUserDto: CreateUserDto): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
