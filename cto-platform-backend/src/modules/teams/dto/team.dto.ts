import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {
    @ApiProperty({ example: 'Engineering Team' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'Main engineering team responsible for product development' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 'uuid-parent-team-id' })
    @IsUUID()
    @IsOptional()
    parentTeamId?: string;

    @ApiProperty({ example: 'uuid-account-id' })
    @IsUUID()
    accountId: string;

    @ApiProperty({ example: 'uuid-team-lead-user-id' })
    @IsUUID()
    teamLeadId: string;
}

export class UpdateTeamDto {
    @ApiPropertyOptional({ example: 'Engineering Team Updated' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'Updated description' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 'uuid-parent-team-id' })
    @IsUUID()
    @IsOptional()
    parentTeamId?: string;

    @ApiPropertyOptional({ example: 'uuid-team-lead-user-id' })
    @IsUUID()
    @IsOptional()
    teamLeadId?: string;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class AddTeamMemberDto {
    @ApiProperty({ example: 'uuid-user-id' })
    @IsUUID()
    userId: string;

    @ApiProperty({ example: 'Senior Developer' })
    @IsString()
    roleInTeam: string;
}
