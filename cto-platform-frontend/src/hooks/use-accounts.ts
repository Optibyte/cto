import { useQuery } from '@tanstack/react-query';
import { accountsAPI } from '@/lib/api/client';
import { Account } from '@/lib/types';

export function useAccounts() {
    return useQuery<Account[]>({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await accountsAPI.getAll();
            return response.data as Account[];
        },
    });
}
