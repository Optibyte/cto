# CTO PERFORMANCE INTELLIGENCE PLATFORM - COMPLETE DEVELOPMENT GUIDE

## ROLE & MINDSET
You are a senior full-stack engineer and enterprise software architect.
- Design and implement production-grade systems for real companies, not demos
- Prioritize security, correctness, maintainability, and scalability
- Build UI first, then connect backend APIs
- Generate real, compilable, production-grade code only
- No pseudo-code, no placeholder logic, no TODOs in production code
- Follow industry best practices and coding standards

## PROJECT OVERVIEW
Build a comprehensive CTO Performance Intelligence Platform for executive analytics and operational visibility. This is a data analytics platform that aggregates metrics from multiple sources (Jira, GitHub, CSV imports) and provides dashboards, reports, and SLA monitoring.

**Development Approach**: 
1. **Phase 1**: Build complete UI with mock data
2. **Phase 2**: Build backend APIs and database 
3. **Phase 3**: Integrate UI with backend 
4. **Phase 4**: Testing and production deployment

## TECHNOLOGY STACK

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.x
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts + Apache ECharts
- **Tables**: AG Grid Enterprise (React)
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios with interceptors
- **Date Handling**: date-fns

### Backend Stack
- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x (strict mode)
- **ORM**: Prisma
- **API Protocol**: REST only (OpenAPI/Swagger docs)
- **Authentication**: Auth0 (JWT tokens)
- **Authorization**: CASL for RBAC
- **Validation**: class-validator + class-transformer
- **Job Queue**: BullMQ
- **Testing**: Jest + Supertest

### Database Stack
- **Primary Database**: PostgreSQL 15.x
- **Time-Series Extension**: TimescaleDB 2.x
- **Cache**: Redis 7.x
- **File Storage**: Local filesystem (temp uploads)

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Environment Management**: dotenv
- **Logging**: Winston (structured JSON logs)

---

# PHASE 1: FRONTEND UI DEVELOPMENT (WEEKS 1-8)

## DESIGN SYSTEM

### Color Palette - Dark Theme
```typescript
// Backgrounds
background: 'hsl(240 10% 3.9%)',           // Main background
card: 'hsl(240 10% 3.9%)',                 // Card background
popover: 'hsl(240 10% 3.9%)',              // Popover background
muted: 'hsl(240 3.7% 15.9%)',              // Muted background
accent: 'hsl(240 3.7% 15.9%)',             // Accent background

// Foreground
foreground: 'hsl(0 0% 98%)',               // Primary text
cardForeground: 'hsl(0 0% 98%)',           // Card text
mutedForeground: 'hsl(240 5% 64.9%)',      // Muted text

// Brand Colors
primary: 'hsl(263 70% 50%)',               // Purple (buttons, links)
primaryForeground: 'hsl(0 0% 100%)',       // White text on primary

// Status Colors
success: 'hsl(142 71% 45%)',               // Green
warning: 'hsl(38 92% 50%)',                // Orange
destructive: 'hsl(0 84% 60%)',             // Red
info: 'hsl(217 91% 60%)',                  // Blue

// Borders
border: 'hsl(240 3.7% 15.9%)',
input: 'hsl(240 3.7% 15.9%)',
ring: 'hsl(263 70% 50%)',

// Gradients
gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
```

### Typography
```typescript
// Font Family
fontSans: ['Inter', 'system-ui', 'sans-serif'],
fontMono: ['JetBrains Mono', 'Fira Code', 'monospace'],

// Font Sizes
text-xs: '0.75rem',     // 12px
text-sm: '0.875rem',    // 14px
text-base: '1rem',      // 16px
text-lg: '1.125rem',    // 18px
text-xl: '1.25rem',     // 20px
text-2xl: '1.5rem',     // 24px
text-3xl: '1.875rem',   // 30px
text-4xl: '2.25rem',    // 36px

// Font Weights
font-normal: 400,
font-medium: 500,
font-semibold: 600,
font-bold: 700,
```

### Spacing System (Tailwind Scale)
```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
```

## FRONTEND PROJECT SETUP

### Step 1: Initialize Next.js Project
```bash
# Create Next.js 14 project
npx create-next-app@latest cto-platform-frontend \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd cto-platform-frontend

# Install shadcn/ui
npx shadcn-ui@latest init
# Choose: Default style, Zinc color, CSS variables

# Install core dependencies
npm install zustand
npm install @tanstack/react-query
npm install axios
npm install date-fns
npm install lucide-react

# Install chart libraries
npm install recharts
npm install echarts echarts-for-react

# Install AG Grid
npm install ag-grid-react ag-grid-community ag-grid-enterprise

# Install form libraries
npm install react-hook-form zod @hookform/resolvers

# Install shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add table
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add command
npx shadcn-ui@latest add toast
```

### Step 2: Project Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Main dashboard layout
│   │   ├── page.tsx                # Dashboard home
│   │   ├── teams/
│   │   │   ├── page.tsx            # Teams list
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Create team
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Team details
│   │   │       ├── metrics/
│   │   │       │   └── page.tsx
│   │   │       └── members/
│   │   │           └── page.tsx
│   │   ├── metrics/
│   │   │   ├── page.tsx            # Metrics explorer
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Metric details
│   │   ├── sla/
│   │   │   ├── page.tsx            # SLA overview
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Create SLA
│   │   │   └── [id]/
│   │   │       └── page.tsx        # SLA details
│   │   ├── reports/
│   │   │   ├── page.tsx            # Reports list
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Report builder
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Report viewer
│   │   ├── integrations/
│   │   │   ├── page.tsx            # Integrations overview
│   │   │   ├── jira/
│   │   │   │   └── page.tsx
│   │   │   └── github/
│   │   │       └── page.tsx
│   │   ├── import/
│   │   │   └── page.tsx            # CSV import
│   │   ├── notifications/
│   │   │   └── page.tsx            # Notification center
│   │   ├── audit/
│   │   │   └── page.tsx            # Audit logs
│   │   └── settings/
│   │       ├── page.tsx            # User settings
│   │       └── profile/
│   │           └── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── providers.tsx
├── components/
│   ├── ui/                         # shadcn components
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── user-nav.tsx
│   │   └── mobile-nav.tsx
│   ├── dashboard/
│   │   ├── kpi-card.tsx
│   │   ├── metric-chart-card.tsx
│   │   ├── team-performance-chart.tsx
│   │   ├── sla-status-widget.tsx
│   │   └── activity-feed.tsx
│   ├── teams/
│   │   ├── team-card.tsx
│   │   ├── team-form.tsx
│   │   ├── team-members-table.tsx
│   │   └── team-hierarchy-tree.tsx
│   ├── metrics/
│   │   ├── metrics-filter-panel.tsx
│   │   ├── metrics-table.tsx
│   │   └── metrics-chart.tsx
│   ├── sla/
│   │   ├── sla-definition-card.tsx
│   │   ├── sla-form.tsx
│   │   └── sla-breach-alert.tsx
│   ├── reports/
│   │   ├── report-builder-wizard.tsx
│   │   └── report-card.tsx
│   ├── integrations/
│   │   ├── integration-card.tsx
│   │   ├── jira-config-form.tsx
│   │   └── github-config-form.tsx
│   ├── import/
│   │   ├── csv-upload-zone.tsx
│   │   └── import-history-table.tsx
│   └── shared/
│       ├── data-table.tsx
│       ├── date-range-picker.tsx
│       ├── stat-widget.tsx
│       ├── empty-state.tsx
│       └── loading-state.tsx
├── lib/
│   ├── mock-data/
│   │   ├── dashboard.ts
│   │   ├── teams.ts
│   │   ├── metrics.ts
│   │   ├── sla.ts
│   │   ├── reports.ts
│   │   ├── integrations.ts
│   │   └── users.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── types.ts
├── hooks/
│   ├── use-dashboard-data.ts
│   ├── use-teams.ts
│   ├── use-metrics.ts
│   └── use-sla.ts
└── stores/
    ├── auth-store.ts
    ├── dashboard-store.ts
    └── notification-store.ts
```

## MOCK DATA STRUCTURE

Create complete mock data for all pages to enable UI development without backend:

### lib/mock-data/dashboard.ts
```typescript
export const mockKPIData = {
  velocity: {
    current: 245,
    previous: 218,
    change: 12.5,
    trend: 'up' as const,
    sparkline: [220, 225, 230, 235, 240, 245, 250],
  },
  quality: {
    current: 94.2,
    previous: 96.3,
    change: -2.1,
    trend: 'down' as const,
    sparkline: [96, 95, 94.5, 94, 94.2, 94.5, 94.2],
  },
  throughput: {
    current: 47,
    previous: 43,
    change: 8.3,
    trend: 'up' as const,
    sparkline: [42, 43, 45, 46, 47, 48, 47],
  },
  cycleTime: {
    current: 28.5,
    previous: 33.5,
    change: -15.2,
    trend: 'down' as const,
    sparkline: [35, 34, 32, 30, 29, 28, 28.5],
  },
};

export const mockTeamPerformance = [
  { team: 'Team Alpha', score: 92, members: 8, velocity: 245, quality: 96 },
  { team: 'Team Beta', score: 78, members: 6, velocity: 180, quality: 85 },
  { team: 'Team Gamma', score: 85, members: 10, velocity: 320, quality: 88 },
  { team: 'Team Delta', score: 65, members: 5, velocity: 140, quality: 72 },
  { team: 'Team Epsilon', score: 88, members: 7, velocity: 210, quality: 92 },
];

export const mockSLAStatus = {
  met: 12,
  atRisk: 3,
  missed: 1,
};

export const mockActivities = [
  {
    id: '1',
    type: 'metric_update',
    title: 'Velocity updated for Team Alpha',
    description: 'Sprint velocity increased to 245 points',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: { name: 'John Doe', avatar: '/avatars/john.jpg' },
  },
  {
    id: '2',
    type: 'sla_breach',
    title: 'SLA breach: Response Time exceeded',
    description: 'Average response time is 3.2 hours (target: 2 hours)',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    severity: 'warning',
  },
  {
    id: '3',
    type: 'integration_sync',
    title: 'Jira sync completed',
    description: 'Successfully synced 150 issues from Jira',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    user: { name: 'System', avatar: null },
  },
];
```

### lib/mock-data/teams.ts
```typescript
export const mockTeams = [
  {
    id: '1',
    name: 'Team Alpha',
    description: 'Core platform development team',
    teamLead: {
      id: 'u1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
    },
    memberCount: 8,
    performance: 92,
    isActive: true,
    parentTeamId: null,
    accountId: 'a1',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'Team Beta',
    description: 'Mobile app development',
    teamLead: {
      id: 'u2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
    },
    memberCount: 6,
    performance: 78,
    isActive: true,
    parentTeamId: '1',
    accountId: 'a1',
    createdAt: new Date('2025-02-01'),
  },
  // Add more mock teams...
];

export const mockTeamMembers = [
  {
    id: 'tm1',
    teamId: '1',
    user: {
      id: 'u1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
      role: 'TeamLead' as const,
    },
    roleInTeam: 'Lead' as const,
    joinedAt: new Date('2025-01-15'),
  },
  // Add more mock members...
];
```

### lib/mock-data/metrics.ts
```typescript
export const mockMetrics = Array.from({ length: 100 }, (_, i) => ({
  id: `m${i + 1}`,
  time: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  teamId: ['1', '2', '3'][i % 3],
  teamName: ['Team Alpha', 'Team Beta', 'Team Gamma'][i % 3],
  metricType: ['velocity', 'quality', 'throughput', 'cycle_time'][i % 4],
  value: Math.random() * 100,
  unit: ['points', '%', 'count', 'hours'][i % 4],
  source: ['jira', 'github', 'csv', 'manual'][i % 4],
}));

export const mockMetricTypes = [
  { value: 'velocity', label: 'Velocity' },
  { value: 'quality', label: 'Quality Score' },
  { value: 'throughput', label: 'Throughput' },
  { value: 'cycle_time', label: 'Cycle Time' },
  { value: 'lead_time', label: 'Lead Time' },
  { value: 'bug_rate', label: 'Bug Rate' },
  { value: 'deployment_frequency', label: 'Deployment Frequency' },
  { value: 'mttr', label: 'Mean Time to Recovery' },
  { value: 'change_failure_rate', label: 'Change Failure Rate' },
];
```

### lib/mock-data/sla.ts
```typescript
export const mockSLADefinitions = [
  {
    id: 's1',
    name: 'Response Time SLA',
    description: 'Customer support first response time',
    teamId: '1',
    teamName: 'Team Alpha',
    metricType: 'response_time',
    targetValue: 2,
    currentValue: 1.8,
    unit: 'hours',
    thresholdWarning: 1.6,
    thresholdCritical: 1.8,
    status: 'met' as const,
    breachCount: 0,
    isActive: true,
  },
  {
    id: 's2',
    name: 'Resolution Time SLA',
    description: 'Average ticket resolution time',
    teamId: '1',
    teamName: 'Team Alpha',
    metricType: 'resolution_time',
    targetValue: 24,
    currentValue: 28,
    unit: 'hours',
    thresholdWarning: 20,
    thresholdCritical: 22,
    status: 'missed' as const,
    breachCount: 3,
    isActive: true,
  },
  // Add more mock SLAs...
];

export const mockSLABreaches = [
  {
    id: 'b1',
    slaId: 's2',
    slaName: 'Resolution Time SLA',
    teamId: '1',
    breachStart: new Date(Date.now() - 48 * 60 * 60 * 1000),
    breachEnd: null,
    severity: 'critical' as const,
    actualValue: 28,
    targetValue: 24,
    variance: 4,
    isResolved: false,
  },
  // Add more breaches...
];
```

## CORE UI COMPONENTS

### 1. KPI Card Component
```typescript
// components/dashboard/kpi-card.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  sparklineData?: number[];
  className?: string;
}

export function KPICard({
  title,
  value,
  unit,
  change,
  trend,
  icon: Icon,
  sparklineData,
  className,
}: KPICardProps) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  
  const trendColor = isPositive
    ? 'text-green-500'
    : isNegative
    ? 'text-red-500'
    : 'text-gray-500';
  
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight">
                {typeof value === 'number' ? value.toFixed(1) : value}
              </h3>
              {unit && (
                <span className="text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
          </div>
          
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <div className={cn('flex items-center gap-1', trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
        
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4">
            <Sparkline data={sparklineData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length === 0) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');
  
  return (
    <svg
      className="h-8 w-full text-primary"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
```

### 2. Sidebar Navigation
```typescript
// components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Target,
  FileText,
  Puzzle,
  Upload,
  Settings,
  Bell,
  FileSearch,
  LucideIcon,
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Teams',
    icon: Users,
    href: '/teams',
  },
  {
    title: 'Metrics',
    icon: BarChart3,
    href: '/metrics',
  },
  {
    title: 'SLA',
    icon: Target,
    href: '/sla',
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/reports',
  },
  {
    title: 'Integrations',
    icon: Puzzle,
    href: '/integrations',
  },
  {
    title: 'Import',
    icon: Upload,
    href: '/import',
  },
  {
    title: 'Notifications',
    icon: Bell,
    href: '/notifications',
    badge: 5,
  },
  {
    title: 'Audit Logs',
    icon: FileSearch,
    href: '/audit',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">CTO Platform</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

### 3. Dashboard Layout
```typescript
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## PAGE IMPLEMENTATIONS

### Dashboard Page (app/(dashboard)/page.tsx)
```typescript
'use client';

import { KPICard } from '@/components/dashboard/kpi-card';
import { TeamPerformanceChart } from '@/components/dashboard/team-performance-chart';
import { SLAStatusWidget } from '@/components/dashboard/sla-status-widget';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockKPIData, mockTeamPerformance, mockSLAStatus, mockActivities } from '@/lib/mock-data/dashboard';
import { TrendingUp, Target, Zap, Clock, Download, Filter } from 'lucide-react';

export default function DashboardPage() {
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Velocity"
          value={mockKPIData.velocity.current}
          unit="points"
          change={mockKPIData.velocity.change}
          trend={mockKPIData.velocity.trend}
          icon={TrendingUp}
          sparklineData={mockKPIData.velocity.sparkline}
        />
        <KPICard
          title="Quality Score"
          value={mockKPIData.quality.current}
          unit="%"
          change={mockKPIData.quality.change}
          trend={mockKPIData.quality.trend}
          icon={Target}
          sparklineData={mockKPIData.quality.sparkline}
        />
        <KPICard
          title="Throughput"
          value={mockKPIData.throughput.current}
          unit="issues/week"
          change={mockKPIData.throughput.change}
          trend={mockKPIData.throughput.trend}
          icon={Zap}
          sparklineData={mockKPIData.throughput.sparkline}
        />
        <KPICard
          title="Cycle Time"
          value={mockKPIData.cycleTime.current}
          unit="hours"
          change={mockKPIData.cycleTime.change}
          trend={mockKPIData.cycleTime.trend}
          icon={Clock}
          sparklineData={mockKPIData.cycleTime.sparkline}
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
            <TeamPerformanceChart data={mockTeamPerformance} />
          </CardContent>
        </Card>
        
        {/* SLA Status - 1 column */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Status</CardTitle>
          </CardHeader>
          <CardContent>
            <SLAStatusWidget data={mockSLAStatus} />
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed activities={mockActivities} />
        </CardContent>
      </Card>
    </div>
  );
}
```

---

# PHASE 2: BACKEND API DEVELOPMENT (WEEKS 9-16)

## BACKEND PROJECT SETUP

### Step 1: Initialize NestJS Project
```bash
# Install NestJS CLI
npm install -g @nestjs/cli

# Create NestJS project
nest new cto-platform-backend
cd cto-platform-backend

# Install core dependencies
npm install @nestjs/config
npm install @prisma/client
npm install -D prisma

# Install authentication
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt
npm install jwks-rsa

# Install authorization
npm install @casl/ability

# Install validation
npm install class-validator class-transformer

# Install Redis and BullMQ
npm install @nestjs/bullmq bullmq
npm install ioredis

# Install Swagger
npm install @nestjs/swagger swagger-ui-express

# Install other utilities
npm install axios
npm install winston nest-winston
npm install helmet
npm install @nestjs/throttler

# Initialize Prisma
npx prisma init
```

### Step 2: Backend Project Structure
```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   └── scope.guard.ts
│   ├── interceptors/
│   │   ├── audit.interceptor.ts
│   │   ├── logging.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   ├── scopes.decorator.ts
│   │   └── current-user.decorator.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── pipes/
│       └── validation.pipe.ts
├── config/
│   ├── database.config.ts
│   ├── auth.config.ts
│   └── redis.config.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── refresh-token.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── teams/
│   │   ├── teams.module.ts
│   │   ├── teams.controller.ts
│   │   ├── teams.service.ts
│   │   ├── entities/
│   │   │   └── team.entity.ts
│   │   └── dto/
│   │       ├── create-team.dto.ts
│   │       └── update-team.dto.ts
│   ├── metrics/
│   │   ├── metrics.module.ts
│   │   ├── metrics.controller.ts
│   │   ├── metrics.service.ts
│   │   ├── entities/
│   │   │   └── metric.entity.ts
│   │   └── dto/
│   │       ├── create-metric.dto.ts
│   │       ├── query-metrics.dto.ts
│   │       └── bulk-create-metrics.dto.ts
│   ├── sla/
│   │   ├── sla.module.ts
│   │   ├── sla.controller.ts
│   │   ├── sla.service.ts
│   │   ├── entities/
│   │   │   ├── sla-definition.entity.ts
│   │   │   ├── sla-metric.entity.ts
│   │   │   └── sla-breach.entity.ts
│   │   └── dto/
│   ├── reports/
│   │   ├── reports.module.ts
│   │   ├── reports.controller.ts
│   │   ├── reports.service.ts
│   │   └── dto/
│   ├── integrations/
│   │   ├── integrations.module.ts
│   │   ├── jira/
│   │   │   ├── jira.controller.ts
│   │   │   ├── jira.service.ts
│   │   │   └── jira-client.service.ts
│   │   ├── github/
│   │   │   ├── github.controller.ts
│   │   │   ├── github.service.ts
│   │   │   └── github-client.service.ts
│   │   └── csv/
│   │       ├── csv.controller.ts
│   │       └── csv.service.ts
│   ├── audit/
│   │   ├── audit.module.ts
│   │   ├── audit.controller.ts
│   │   └── audit.service.ts
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.controller.ts
│   │   └── notifications.service.ts
│   └── dashboard/
│       ├── dashboard.module.ts
│       ├── dashboard.controller.ts
│       └── dashboard.service.ts
├── jobs/
│   ├── processors/
│   │   ├── jira-sync.processor.ts
│   │   ├── github-sync.processor.ts
│   │   ├── csv-import.processor.ts
│   │   ├── report-generation.processor.ts
│   │   └── sla-monitoring.processor.ts
│   └── jobs.module.ts
└── prisma/
    ├── schema.prisma
    └── migrations/
```

## DATABASE SCHEMA (Prisma)

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  CTO
  Manager
  TeamLead
  Employee
}

enum MetricType {
  velocity
  quality
  throughput
  cycle_time
  lead_time
  bug_rate
  deployment_frequency
  mttr
  change_failure_rate
}

enum SourceType {
  jira
  github
  csv
  manual
}

enum SLAStatus {
  met
  at_risk
  missed
}

enum BreachSeverity {
  warning
  critical
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  EXPORT
  LOGIN
  LOGOUT
}

model User {
  id            String    @id @default(uuid())
  auth0Id       String    @unique @map("auth0_id")
  email         String    @unique
  fullName      String    @map("full_name")
  role          UserRole
  avatarUrl     String?   @map("avatar_url")
  timezone      String    @default("UTC")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  isActive      Boolean   @default(true) @map("is_active")
  lastLoginAt   DateTime? @map("last_login_at")
  
  teamsLed      Team[]    @relation("TeamLead")
  teamMembers   TeamMember[]
  createdMetrics Metric[] @relation("MetricCreator")
  auditLogs     AuditLog[]
  
  @@map("users")
}

model Market {
  id         String   @id @default(uuid())
  name       String
  regionCode String   @map("region_code")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")
  
  accounts   Account[]
  
  @@map("markets")
}

model Account {
  id               String   @id @default(uuid())
  name             String
  marketId         String   @map("market_id")
  accountManagerId String   @map("account_manager_id")
  createdAt        DateTime @default(now()) @map("created_at")
  updatedAt        DateTime @updatedAt @map("updated_at")
  
  market           Market   @relation(fields: [marketId], references: [id])
  teams            Team[]
  
  @@map("accounts")
}

model Team {
  id            String    @id @default(uuid())
  name          String
  description   String?
  parentTeamId  String?   @map("parent_team_id")
  accountId     String    @map("account_id")
  teamLeadId    String    @map("team_lead_id")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  isActive      Boolean   @default(true) @map("is_active")
  
  account       Account   @relation(fields: [accountId], references: [id])
  teamLead      User      @relation("TeamLead", fields: [teamLeadId], references: [id])
  parentTeam    Team?     @relation("TeamHierarchy", fields: [parentTeamId], references: [id])
  childTeams    Team[]    @relation("TeamHierarchy")
  members       TeamMember[]
  metrics       Metric[]
  slaDefinitions SLADefinition[]
  
  @@map("teams")
}

model TeamMember {
  id          String   @id @default(uuid())
  teamId      String   @map("team_id")
  userId      String   @map("user_id")
  roleInTeam  String   @map("role_in_team")
  joinedAt    DateTime @default(now()) @map("joined_at")
  leftAt      DateTime? @map("left_at")
  
  team        Team     @relation(fields: [teamId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([teamId, userId, joinedAt])
  @@map("team_members")
}

model Metric {
  id          String     @id @default(uuid())
  time        DateTime
  teamId      String     @map("team_id")
  userId      String?    @map("user_id")
  metricType  MetricType @map("metric_type")
  value       Float
  unit        String
  metadata    Json?
  source      SourceType
  createdBy   String     @map("created_by")
  
  team        Team       @relation(fields: [teamId], references: [id])
  creator     User       @relation("MetricCreator", fields: [createdBy], references: [id])
  
  @@map("metrics")
}

model SLADefinition {
  id                  String    @id @default(uuid())
  name                String
  description         String?
  teamId              String    @map("team_id")
  metricType          String    @map("metric_type")
  targetValue         Float     @map("target_value")
  thresholdWarning    Float     @map("threshold_warning")
  thresholdCritical   Float     @map("threshold_critical")
  measurementWindow   String    @map("measurement_window")
  isActive            Boolean   @default(true) @map("is_active")
  createdAt           DateTime  @default(now()) @map("created_at")
  updatedAt           DateTime  @updatedAt @map("updated_at")
  
  team                Team      @relation(fields: [teamId], references: [id])
  metrics             SLAMetric[]
  breaches            SLABreach[]
  
  @@map("sla_definitions")
}

model SLAMetric {
  id          String    @id @default(uuid())
  time        DateTime
  slaId       String    @map("sla_id")
  teamId      String    @map("team_id")
  metricType  String    @map("metric_type")
  targetValue Float     @map("target_value")
  actualValue Float     @map("actual_value")
  status      SLAStatus
  
  sla         SLADefinition @relation(fields: [slaId], references: [id])
  
  @@map("sla_metrics")
}

model SLABreach {
  id              String          @id @default(uuid())
  slaId           String          @map("sla_id")
  teamId          String          @map("team_id")
  breachStart     DateTime        @map("breach_start")
  breachEnd       DateTime?       @map("breach_end")
  severity        BreachSeverity
  actualValue     Float           @map("actual_value")
  targetValue     Float           @map("target_value")
  variance        Float
  isResolved      Boolean         @default(false) @map("is_resolved")
  resolutionNotes String?         @map("resolution_notes")
  createdAt       DateTime        @default(now()) @map("created_at")
  
  sla             SLADefinition   @relation(fields: [slaId], references: [id])
  
  @@map("sla_breaches")
}

model JiraIntegration {
  id                String    @id @default(uuid())
  teamId            String    @map("team_id")
  jiraUrl           String    @map("jira_url")
  jiraProjectKey    String    @map("jira_project_key")
  jiraBoardId       String?   @map("jira_board_id")
  apiTokenEncrypted String    @map("api_token_encrypted")
  syncFrequency     String    @map("sync_frequency")
  lastSyncAt        DateTime? @map("last_sync_at")
  lastSyncStatus    String?   @map("last_sync_status")
  lastSyncError     String?   @map("last_sync_error")
  isActive          Boolean   @default(true) @map("is_active")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  
  @@map("jira_integrations")
}

model GitHubIntegration {
  id                   String    @id @default(uuid())
  teamId               String    @map("team_id")
  githubOrg            String    @map("github_org")
  githubRepo           String?   @map("github_repo")
  accessTokenEncrypted String    @map("access_token_encrypted")
  webhookSecret        String?   @map("webhook_secret_encrypted")
  syncFrequency        String    @map("sync_frequency")
  lastSyncAt           DateTime? @map("last_sync_at")
  lastSyncStatus       String?   @map("last_sync_status")
  lastSyncError        String?   @map("last_sync_error")
  isActive             Boolean   @default(true) @map("is_active")
  createdAt            DateTime  @default(now()) @map("created_at")
  updatedAt            DateTime  @updatedAt @map("updated_at")
  
  @@map("github_integrations")
}

model CSVImport {
  id              String    @id @default(uuid())
  uploadedBy      String    @map("uploaded_by")
  fileName        String    @map("file_name")
  fileSize        BigInt    @map("file_size")
  filePath        String    @map("file_path")
  status          String
  rowsTotal       Int?      @map("rows_total")
  rowsProcessed   Int?      @map("rows_processed")
  rowsFailed      Int?      @map("rows_failed")
  errorLog        String?   @map("error_log")
  uploadedAt      DateTime  @default(now()) @map("uploaded_at")
  processedAt     DateTime? @map("processed_at")
  
  @@map("csv_imports")
}

model AuditLog {
  id          String      @id @default(uuid())
  timestamp   DateTime    @default(now())
  userId      String?     @map("user_id")
  entityType  String      @map("entity_type")
  entityId    String      @map("entity_id")
  action      AuditAction
  oldValue    Json?       @map("old_value")
  newValue    Json?       @map("new_value")
  ipAddress   String?     @map("ip_address")
  userAgent   String?     @map("user_agent")
  requestId   String?     @map("request_id")
  
  user        User?       @relation(fields: [userId], references: [id])
  
  @@map("audit_logs")
}
```

## BACKEND IMPLEMENTATION GUIDELINES

### Authentication with Auth0
```typescript
// src/modules/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
```

### RBAC Guards
```typescript
// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### Audit Interceptor
```typescript
// src/common/interceptors/audit.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '@/modules/audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, body } = request;
    
    if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return next.handle();
    }
    
    return next.handle().pipe(
      tap(async (response) => {
        await this.auditService.log({
          userId: user?.id,
          action: this.mapMethodToAction(method),
          entityType: this.extractEntityType(url),
          entityId: response?.id,
          newValue: response,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        });
      }),
    );
  }
  
  private mapMethodToAction(method: string) {
    const map = {
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };
    return map[method];
  }
  
  private extractEntityType(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2] || 'unknown';
  }
}
```

---

# PHASE 3: INTEGRATION (WEEKS 17-18)

## Connect Frontend to Backend

### Step 1: API Service Layer
```typescript
// src/lib/api/client.ts
import axios, { AxiosInstance } from 'axios';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config = {}) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data: any, config = {}) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data: any, config = {}) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config = {}) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new APIClient();
```

### Step 2: Replace Mock Data with API Calls
```typescript
// src/hooks/use-dashboard-data.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export function useDashboardKPIs() {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/dashboard/kpis');
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTeamPerformance() {
  return useQuery({
    queryKey: ['dashboard', 'team-performance'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/dashboard/teams/comparison');
      return data;
    },
  });
}
```

---

# PHASE 4: TESTING & DEPLOYMENT (WEEKS 19-22)

## Testing Strategy

### Frontend Tests
```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @playwright/test
```

### Backend Tests
```bash
# Tests already included with NestJS
npm run test               # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage
```

## FINAL NOTES

This is a production-ready, enterprise-grade specification. Build systematically:

1. **UI First** - Get approval on design
2. **Backend Second** - Build solid foundation
3. **Integrate** - Connect frontend to backend
4. **Polish** - Test, optimize, deploy

No shortcuts. No demos. Production quality only.
