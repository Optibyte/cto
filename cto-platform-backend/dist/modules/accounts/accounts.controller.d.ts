import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
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
