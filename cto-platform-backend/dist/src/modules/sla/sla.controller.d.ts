import { SlaService } from './sla.service';
import { CreateSLADto, UpdateSLADto } from './dto/sla.dto';
export declare class SlaController {
    private readonly slaService;
    constructor(slaService: SlaService);
    findAll(): Promise<({
        team: {
            id: string;
            name: string;
        };
        _count: {
            breaches: number;
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
        breachStart: Date;
        breachEnd: Date | null;
        severity: import("@prisma/client").$Enums.BreachSeverity;
        actualValue: number;
        variance: number;
        resolutionNotes: string | null;
    })[]>;
    findOne(id: string): Promise<({
        metrics: {
            id: string;
            teamId: string;
            metricType: string;
            targetValue: number;
            time: Date;
            slaId: string;
            actualValue: number;
            status: import("@prisma/client").$Enums.SLAStatus;
        }[];
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
        breaches: {
            id: string;
            createdAt: Date;
            teamId: string;
            targetValue: number;
            isResolved: boolean;
            slaId: string;
            breachStart: Date;
            breachEnd: Date | null;
            severity: import("@prisma/client").$Enums.BreachSeverity;
            actualValue: number;
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
