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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metrics_service_1 = require("./metrics.service");
const metric_dto_1 = require("./dto/metric.dto");
let MetricsController = class MetricsController {
    metricsService;
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    findAll(teamId, metricType) {
        const filters = {};
        if (teamId)
            filters.teamId = teamId;
        if (metricType)
            filters.metricType = metricType;
        return this.metricsService.findAll(filters);
    }
    findByTeam(teamId) {
        return this.metricsService.findByTeam(teamId);
    }
    getAggregates(teamId, metricType, startDate, endDate) {
        return this.metricsService.getAggregates(teamId, metricType, new Date(startDate), new Date(endDate));
    }
    create(createMetricDto) {
        return this.metricsService.create(createMetricDto);
    }
    bulkCreate(createMetricsDto) {
        return this.metricsService.bulkCreate(createMetricsDto);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all metrics with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'teamId', required: false, description: 'Filter by team ID' }),
    (0, swagger_1.ApiQuery)({ name: 'metricType', required: false, description: 'Filter by metric type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns filtered metrics' }),
    __param(0, (0, common_1.Query)('teamId')),
    __param(1, (0, common_1.Query)('metricType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('team/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get metrics by team ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns team metrics' }),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "findByTeam", null);
__decorate([
    (0, common_1.Get)('aggregates/:teamId/:metricType'),
    (0, swagger_1.ApiOperation)({ summary: 'Get metric aggregates for a team' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: true, example: '2024-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: true, example: '2024-01-31' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns aggregated metrics' }),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Param)('metricType')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "getAggregates", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new metric' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Metric created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [metric_dto_1.CreateMetricDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk create metrics' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Metrics created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "bulkCreate", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('metrics'),
    (0, common_1.Controller)('api/v1/metrics'),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map