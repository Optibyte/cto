'use client';

import { KPICard } from '@/components/dashboard/kpi-card';
import { TeamPerformanceChart } from '@/components/dashboard/team-performance-chart';
import { SLAStatusWidget } from '@/components/dashboard/sla-status-widget';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Zap, Clock } from 'lucide-react';
import { useDashboardKPIs, useTeamPerformance, useSLAStatus, useRecentActivity } from '@/hooks/use-dashboard-data';
import { mockKPIData, mockTeamPerformance, mockSLAStatus, mockActivities } from '@/lib/mock-data/dashboard';
import { KPIItem, DashboardKPIs, TeamPerformanceData, Activity } from '@/lib/types';

export default function DashboardPage() {
  // Use API hooks with fallback to mock data
  const { data: kpiData = mockKPIData } = useDashboardKPIs();
  const { data: teamPerformance = mockTeamPerformance } = useTeamPerformance();
  const { data: slaStatus = mockSLAStatus } = useSLAStatus();
  const { data: activities = mockActivities } = useRecentActivity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of team performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Velocity"
          value={kpiData.velocity?.current || 0}
          unit="points"
          change={kpiData.velocity?.change || 0}
          trend={kpiData.velocity?.trend || 'neutral'}
          icon={TrendingUp}
          sparklineData={kpiData.velocity?.sparkline || []}
        />
        <KPICard
          title="Quality Score"
          value={kpiData.quality?.current || 0}
          unit="%"
          change={kpiData.quality?.change || 0}
          trend={kpiData.quality?.trend || 'neutral'}
          icon={Target}
          sparklineData={kpiData.quality?.sparkline || []}
        />
        <KPICard
          title="Throughput"
          value={kpiData.throughput?.current || 0}
          unit="issues/week"
          change={kpiData.throughput?.change || 0}
          trend={kpiData.throughput?.trend || 'neutral'}
          icon={Zap}
          sparklineData={kpiData.throughput?.sparkline || []}
        />
        <KPICard
          title="Cycle Time"
          value={kpiData.cycleTime?.current || 0}
          unit="hours"
          change={kpiData.cycleTime?.change || 0}
          trend={kpiData.cycleTime?.trend || 'neutral'}
          icon={Clock}
          sparklineData={kpiData.cycleTime?.sparkline || []}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Performance Chart - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamPerformanceChart data={teamPerformance} />
          </CardContent>
        </Card>

        {/* SLA Status - 1 column */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Status</CardTitle>
          </CardHeader>
          <CardContent>
            <SLAStatusWidget data={slaStatus} />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed activities={activities} />
        </CardContent>
      </Card>
    </div>
  );
}
