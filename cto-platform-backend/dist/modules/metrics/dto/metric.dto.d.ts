export declare enum MetricType {
    velocity = "velocity",
    quality = "quality",
    throughput = "throughput",
    cycle_time = "cycle_time",
    lead_time = "lead_time",
    bug_rate = "bug_rate",
    deployment_frequency = "deployment_frequency",
    mttr = "mttr",
    change_failure_rate = "change_failure_rate"
}
export declare enum SourceType {
    jira = "jira",
    github = "github",
    csv = "csv",
    manual = "manual"
}
export declare class CreateMetricDto {
    time: string;
    teamId: string;
    userId?: string;
    metricType: MetricType;
    value: number;
    unit: string;
    metadata?: any;
    source: SourceType;
    createdBy: string;
}
export declare class BulkCreateMetricDto {
    metrics: CreateMetricDto[];
}
