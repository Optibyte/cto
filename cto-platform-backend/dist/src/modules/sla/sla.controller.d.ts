import { SlaService } from './sla.service';
import { CreateSLADto, UpdateSLADto } from './dto/sla.dto';
export declare class SlaController {
    private readonly slaService;
    constructor(slaService: SlaService);
    findAll(): Promise<({
        _count: {
            breaches: number;
        };
        team: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        teamId: string;
        metricType: string;
        targetValue: number;
        thresholdWarning: number;
        thresholdCritical: number;
        measurementWindow: string;
    })[]>;
    getBreaches(slaId?: string): Promise<({
        sla: {
            team: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                name: string;
                description: string | null;
                parentTeamId: string | null;
                accountId: string;
                teamLeadId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            name: string;
            description: string | null;
            teamId: string;
            metricType: string;
            targetValue: number;
            thresholdWarning: number;
            thresholdCritical: number;
            measurementWindow: string;
        };
    } & {
        id: string;
        createdAt: Date;
        teamId: string;
        targetValue: number;
        isResolved: boolean;
        slaId: string;
        actualValue: number;
        breachStart: Date;
        breachEnd: Date | null;
        severity: import("@prisma/client").$Enums.BreachSeverity;
        variance: number;
        resolutionNotes: string | null;
    })[]>;
    findOne(id: string): Promise<({
        team: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            name: string;
            description: string | null;
            parentTeamId: string | null;
            accountId: string;
            teamLeadId: string;
        };
        metrics: {
            id: string;
            teamId: string;
            time: Date;
            metricType: string;
            targetValue: number;
            slaId: string;
            actualValue: number;
            status: import("@prisma/client").$Enums.SLAStatus;
        }[];
        breaches: {
            id: string;
            createdAt: Date;
            teamId: string;
            targetValue: number;
            isResolved: boolean;
            slaId: string;
            actualValue: number;
            breachStart: Date;
            breachEnd: Date | null;
            severity: import("@prisma/client").$Enums.BreachSeverity;
            variance: number;
            resolutionNotes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        teamId: string;
        metricType: string;
        targetValue: number;
        thresholdWarning: number;
        thresholdCritical: number;
        measurementWindow: string;
    }) | null>;
    create(createSlaDto: CreateSLADto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        teamId: string;
        metricType: string;
        targetValue: number;
        thresholdWarning: number;
        thresholdCritical: number;
        measurementWindow: string;
    }>;
    update(id: string, updateSlaDto: UpdateSLADto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        teamId: string;
        metricType: string;
        targetValue: number;
        thresholdWarning: number;
        thresholdCritical: number;
        measurementWindow: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        description: string | null;
        teamId: string;
        metricType: string;
        targetValue: number;
        thresholdWarning: number;
        thresholdCritical: number;
        measurementWindow: string;
    }>;
}
