import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto, AddTeamMemberDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createTeamDto: CreateTeamDto): Promise<any>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<any>;
    remove(id: string): Promise<any>;
    addMember(teamId: string, addMemberDto: AddTeamMemberDto): Promise<any>;
    removeMember(teamId: string, userId: string): Promise<any>;
}
