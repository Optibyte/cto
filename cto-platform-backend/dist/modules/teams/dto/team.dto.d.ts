export declare class CreateTeamDto {
    name: string;
    description?: string;
    parentTeamId?: string;
    accountId: string;
    teamLeadId: string;
}
export declare class UpdateTeamDto {
    name?: string;
    description?: string;
    parentTeamId?: string;
    teamLeadId?: string;
    isActive?: boolean;
}
export declare class AddTeamMemberDto {
    userId: string;
    roleInTeam: string;
}
