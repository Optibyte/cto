import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SlaService } from './sla.service';
import { CreateSLADto, UpdateSLADto } from './dto/sla.dto';

@ApiTags('sla')
@Controller('api/v1/sla')
export class SlaController {
  constructor(private readonly slaService: SlaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all SLA definitions' })
  @ApiResponse({ status: 200, description: 'Returns all SLA definitions' })
  findAll() {
    return this.slaService.findAll();
  }

  @Get('breaches')
  @ApiOperation({ summary: 'Get SLA breaches' })
  @ApiQuery({ name: 'slaId', required: false, description: 'Filter by SLA ID' })
  @ApiResponse({ status: 200, description: 'Returns SLA breaches' })
  getBreaches(@Query('slaId') slaId?: string) {
    return this.slaService.getBreaches(slaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get SLA definition by ID' })
  @ApiResponse({ status: 200, description: 'Returns SLA details' })
  @ApiResponse({ status: 404, description: 'SLA not found' })
  findOne(@Param('id') id: string) {
    return this.slaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new SLA definition' })
  @ApiResponse({ status: 201, description: 'SLA created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createSlaDto: CreateSLADto) {
    return this.slaService.create(createSlaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update SLA definition' })
  @ApiResponse({ status: 200, description: 'SLA updated successfully' })
  @ApiResponse({ status: 404, description: 'SLA not found' })
  update(@Param('id') id: string, @Body() updateSlaDto: UpdateSLADto) {
    return this.slaService.update(id, updateSlaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete SLA definition (soft delete)' })
  @ApiResponse({ status: 200, description: 'SLA deleted successfully' })
  @ApiResponse({ status: 404, description: 'SLA not found' })
  remove(@Param('id') id: string) {
    return this.slaService.delete(id);
  }
}
