'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardAPI } from '@/lib/api/client';
import { KPIData, TeamPerformanceData, Activity } from '@/lib/types';

export function useDashboardKPIs() {
    return useQuery<Record<string, KPIData>>({
        queryKey: ['dashboard', 'kpis'],
        queryFn: async () => {
            const { data } = await dashboardAPI.getKPIs();
            return data as Record<string, KPIData>;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useTeamPerformance() {
    return useQuery<TeamPerformanceData[]>({
        queryKey: ['dashboard', 'team-performance'],
        queryFn: async () => {
            const { data } = await dashboardAPI.getTeamPerformance();
            return data as TeamPerformanceData[];
        },
        staleTime: 5 * 60 * 1000,
    });
}

export function useSLAStatus() {
    return useQuery<{ met: number; atRisk: number; missed: number }>({
        queryKey: ['dashboard', 'sla-status'],
        queryFn: async () => {
            const { data } = await dashboardAPI.getSLAStatus();
            return data as { met: number; atRisk: number; missed: number };
        },
        staleTime: 5 * 60 * 1000,
    });
}

export function useRecentActivity() {
    return useQuery<Activity[]>({
        queryKey: ['dashboard', 'activity'],
        queryFn: async () => {
            const { data } = await dashboardAPI.getActivity();
            return data as Activity[];
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
