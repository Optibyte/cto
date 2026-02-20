import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('api/v1/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  @ApiOperation({ summary: 'Get dashboard KPIs' })
  getKPIs() {
    return this.dashboardService.getKPIs();
  }

  @Get('teams/comparison')
  @ApiOperation({ summary: 'Get team performance comparison' })
  getTeamPerformance() {
    return this.dashboardService.getTeamPerformance();
  }

  @Get('sla/status')
  @ApiOperation({ summary: 'Get SLA status summary' })
  getSLAStatus() {
    return this.dashboardService.getSLAStatus();
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get recent activity' })
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
