import { PrismaService } from '../../prisma/prisma.service';
export declare class SlaService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    getBreaches(slaId?: string): Promise<any>;
}
