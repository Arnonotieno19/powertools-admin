import { api } from "./apiClient";
export const dashboardService = { getDashboard: () => api.get("/admin/dashboard") };
