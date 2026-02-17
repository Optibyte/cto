'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slaAPI } from '@/lib/api/client';
import { SLADefinition, SLABreach } from '@/lib/types';

export function useSLAs() {
    return useQuery<SLADefinition[]>({
        queryKey: ['sla'],
        queryFn: async () => {
            const response = await slaAPI.getAll();
            return response.data as SLADefinition[];
        },
    });
}

export function useSLA(id: string) {
    return useQuery<SLADefinition>({
        queryKey: ['sla', id],
        queryFn: async () => {
            const response = await slaAPI.getById(id);
            return response.data as SLADefinition;
        },
        enabled: !!id,
    });
}

export function useSLABreaches(slaId?: string) {
    return useQuery<SLABreach[]>({
        queryKey: ['sla', 'breaches', slaId],
        queryFn: async () => {
            const response = await slaAPI.getBreaches(slaId);
            return response.data as SLABreach[];
        },
    });
}

export function useCreateSLA() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => slaAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sla'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}

export function useUpdateSLA() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => slaAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sla'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}

export function useDeleteSLA() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => slaAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sla'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}
