import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
