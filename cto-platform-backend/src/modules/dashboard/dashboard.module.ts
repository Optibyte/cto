import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MetricsModule } from '../metrics/metrics.module';
import { TeamsModule } from '../teams/teams.module';
import { SlaModule } from '../sla/sla.module';

@Module({
    imports: [MetricsModule, TeamsModule, SlaModule],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
