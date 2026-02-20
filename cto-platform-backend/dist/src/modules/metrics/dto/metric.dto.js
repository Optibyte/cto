"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkCreateMetricDto = exports.CreateMetricDto = exports.SourceType = exports.MetricType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var MetricType;
(function (MetricType) {
    MetricType["velocity"] = "velocity";
    MetricType["quality"] = "quality";
    MetricType["throughput"] = "throughput";
    MetricType["cycle_time"] = "cycle_time";
    MetricType["lead_time"] = "lead_time";
    MetricType["bug_rate"] = "bug_rate";
    MetricType["deployment_frequency"] = "deployment_frequency";
    MetricType["mttr"] = "mttr";
    MetricType["change_failure_rate"] = "change_failure_rate";
})(MetricType || (exports.MetricType = MetricType = {}));
var SourceType;
(function (SourceType) {
    SourceType["jira"] = "jira";
    SourceType["github"] = "github";
    SourceType["csv"] = "csv";
    SourceType["manual"] = "manual";
})(SourceType || (exports.SourceType = SourceType = {}));
class CreateMetricDto {
    time;
    teamId;
    userId;
    metricType;
    value;
    unit;
    metadata;
    source;
    createdBy;
}
exports.CreateMetricDto = CreateMetricDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:00:00Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-team-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-user-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: MetricType, example: MetricType.velocity }),
    (0, class_validator_1.IsEnum)(MetricType),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "metricType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 245.5 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMetricDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'points' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { sprint: 'Sprint 24', notes: 'Good velocity' },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateMetricDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SourceType, example: SourceType.jira }),
    (0, class_validator_1.IsEnum)(SourceType),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-creator-user-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "createdBy", void 0);
class BulkCreateMetricDto {
    metrics;
}
exports.BulkCreateMetricDto = BulkCreateMetricDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateMetricDto] }),
    __metadata("design:type", Array)
], BulkCreateMetricDto.prototype, "metrics", void 0);
//# sourceMappingURL=metric.dto.js.map