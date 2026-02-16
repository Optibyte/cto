export declare class CreateSLADto {
    name: string;
    description?: string;
    teamId: string;
    metricType: string;
    targetValue: number;
    thresholdWarning: number;
    thresholdCritical: number;
    measurementWindow: string;
}
export declare class UpdateSLADto {
    name?: string;
    description?: string;
    targetValue?: number;
    thresholdWarning?: number;
    thresholdCritical?: number;
    measurementWindow?: string;
    isActive?: boolean;
}
