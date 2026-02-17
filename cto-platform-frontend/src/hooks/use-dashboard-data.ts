'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardAPI } from '@/lib/api/client';
import { KPIItem, DashboardKPIs, TeamPerformanceData, Activity } from '@/lib/types';

export function useDashboardKPIs() {
    return useQuery<DashboardKPIs>({
        queryKey: ['dashboard', 'kpis'],
        queryFn: async () => {
            const response = await dashboardAPI.getKPIs();
            return response.data as DashboardKPIs;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useTeamPerformance() {
    return useQuery<TeamPerformanceData[]>({
        queryKey: ['dashboard', 'team-performance'],
        queryFn: async () => {
            const response = await dashboardAPI.getTeamPerformance();
            return response.data as TeamPerformanceData[];
        },
        staleTime: 5 * 60 * 1000,
    });
}

export function useSLAStatus() {
    return useQuery<{ met: number; atRisk: number; missed: number }>({
        queryKey: ['dashboard', 'sla-status'],
        queryFn: async () => {
            const response = await dashboardAPI.getSLAStatus();
            return response.data as { met: number; atRisk: number; missed: number };
        },
        staleTime: 5 * 60 * 1000,
    });
}

export function useRecentActivity() {
    return useQuery<Activity[]>({
        queryKey: ['dashboard', 'activity'],
        queryFn: async () => {
            const response = await dashboardAPI.getActivity();
            return response.data as Activity[];
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
