import axios, { AxiosInstance, AxiosError } from 'axios';

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
                const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Handle token refresh or redirect to login
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                        window.location.href = '/login';
                    }
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

// API endpoints
export const dashboardAPI = {
    getKPIs: () => apiClient.get('/api/v1/dashboard/kpis'),
    getTeamPerformance: () => apiClient.get('/api/v1/dashboard/teams/comparison'),
    getSLAStatus: () => apiClient.get('/api/v1/dashboard/sla/status'),
    getActivity: () => apiClient.get('/api/v1/dashboard/activity'),
};

export const teamsAPI = {
    getAll: () => apiClient.get('/api/v1/teams'),
    getById: (id: string) => apiClient.get(`/api/v1/teams/${id}`),
    create: (data: any) => apiClient.post('/api/v1/teams', data),
    update: (id: string, data: any) => apiClient.put(`/api/v1/teams/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/v1/teams/${id}`),
};

export const metricsAPI = {
    getAll: (filters?: any) => apiClient.get('/api/v1/metrics', { params: filters }),
    getByTeam: (teamId: string) => apiClient.get(`/api/v1/metrics/team/${teamId}`),
    getAggregates: (teamId: string, metricType: string, startDate: string, endDate: string) =>
        apiClient.get(`/api/v1/metrics/aggregates/${teamId}/${metricType}`, {
            params: { startDate, endDate },
        }),
    create: (data: any) => apiClient.post('/api/v1/metrics', data),
    bulkCreate: (data: any[]) => apiClient.post('/api/v1/metrics/bulk', data),
    update: (id: string, data: any) => apiClient.put(`/api/v1/metrics/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/v1/metrics/${id}`),
};

export const slaAPI = {
    getAll: () => apiClient.get('/api/v1/sla'),
    getById: (id: string) => apiClient.get(`/api/v1/sla/${id}`),
    getBreaches: (slaId?: string) => apiClient.get('/api/v1/sla/breaches', { params: { slaId } }),
    create: (data: any) => apiClient.post('/api/v1/sla', data),
    update: (id: string, data: any) => apiClient.put(`/api/v1/sla/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/v1/sla/${id}`),
};

export const usersAPI = {
    getAll: () => apiClient.get('/api/v1/users'),
    getById: (id: string) => apiClient.get(`/api/v1/users/${id}`),
    create: (data: any) => apiClient.post('/api/v1/users', data),
    update: (id: string, data: any) => apiClient.put(`/api/v1/users/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/v1/users/${id}`),
};

export const accountsAPI = {
    getAll: () => apiClient.get('/api/v1/accounts'),
    getById: (id: string) => apiClient.get(`/api/v1/accounts/${id}`),
};
