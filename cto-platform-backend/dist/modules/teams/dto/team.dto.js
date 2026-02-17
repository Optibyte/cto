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
exports.AddTeamMemberDto = exports.UpdateTeamDto = exports.CreateTeamDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTeamDto {
    name;
    description;
    parentTeamId;
    accountId;
    teamLeadId;
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Engineering Team' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Main engineering team responsible for product development' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-parent-team-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "parentTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-account-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-team-lead-user-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "teamLeadId", void 0);
class UpdateTeamDto {
    name;
    description;
    parentTeamId;
    teamLeadId;
    isActive;
}
exports.UpdateTeamDto = UpdateTeamDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Engineering Team Updated' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-parent-team-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "parentTeamId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-team-lead-user-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "teamLeadId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTeamDto.prototype, "isActive", void 0);
class AddTeamMemberDto {
    userId;
    roleInTeam;
}
exports.AddTeamMemberDto = AddTeamMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddTeamMemberDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Developer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddTeamMemberDto.prototype, "roleInTeam", void 0);
//# sourceMappingURL=team.dto.js.map