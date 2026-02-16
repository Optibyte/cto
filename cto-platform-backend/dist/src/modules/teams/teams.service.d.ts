import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto, AddTeamMemberDto } from './dto/team.dto';
export declare class TeamsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: CreateTeamDto): Promise<any>;
    update(id: string, data: UpdateTeamDto): Promise<any>;
    remove(id: string): Promise<any>;
    addMember(teamId: string, data: AddTeamMemberDto): Promise<any>;
    removeMember(teamId: string, userId: string): Promise<any>;
}
