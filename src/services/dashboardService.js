import { api } from "./apiClient";
import * as dashboard from "@/mocks/dashboard";
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
export const dashboardService = { getDashboard: () => useMocks ? Promise.resolve(dashboard) : api.get("/admin/dashboard") };
