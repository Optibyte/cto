import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        market: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            regionCode: string;
        };
        teams: {
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        marketId: string;
        accountManagerId: string;
    })[]>;
    findOne(id: string): Promise<({
        market: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            regionCode: string;
        };
        teams: {
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        marketId: string;
        accountManagerId: string;
    }) | null>;
}
