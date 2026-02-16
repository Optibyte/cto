export declare enum UserRole {
    CTO = "CTO",
    Manager = "Manager",
    TeamLead = "TeamLead",
    Employee = "Employee"
}
export declare class CreateUserDto {
    auth0Id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
    timezone?: string;
}
export declare class UpdateUserDto {
    fullName?: string;
    role?: UserRole;
    avatarUrl?: string;
    timezone?: string;
}
