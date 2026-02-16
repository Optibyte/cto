import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
