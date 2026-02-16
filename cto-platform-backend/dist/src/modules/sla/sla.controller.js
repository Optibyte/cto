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
exports.SlaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sla_service_1 = require("./sla.service");
const sla_dto_1 = require("./dto/sla.dto");
let SlaController = class SlaController {
    slaService;
    constructor(slaService) {
        this.slaService = slaService;
    }
    findAll() {
        return this.slaService.findAll();
    }
    getBreaches(slaId) {
        return this.slaService.getBreaches(slaId);
    }
    findOne(id) {
        return this.slaService.findOne(id);
    }
    create(createSlaDto) {
        return this.slaService.create(createSlaDto);
    }
    update(id, updateSlaDto) {
        return this.slaService.update(id, updateSlaDto);
    }
    remove(id) {
        return this.slaService.delete(id);
    }
};
exports.SlaController = SlaController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all SLA definitions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all SLA definitions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('breaches'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SLA breaches' }),
    (0, swagger_1.ApiQuery)({ name: 'slaId', required: false, description: 'Filter by SLA ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns SLA breaches' }),
    __param(0, (0, common_1.Query)('slaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "getBreaches", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SLA definition by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns SLA details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'SLA not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new SLA definition' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'SLA created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sla_dto_1.CreateSLADto]),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SLA definition' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'SLA updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'SLA not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sla_dto_1.UpdateSLADto]),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete SLA definition (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'SLA deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'SLA not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlaController.prototype, "remove", null);
exports.SlaController = SlaController = __decorate([
    (0, swagger_1.ApiTags)('sla'),
    (0, common_1.Controller)('api/v1/sla'),
    __metadata("design:paramtypes", [sla_service_1.SlaService])
], SlaController);
//# sourceMappingURL=sla.controller.js.map