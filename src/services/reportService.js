import { api } from "./apiClient";
const endpoints={Overview:"overview",Sales:"sales",Profitability:"profitability",Orders:"orders",Inventory:"inventory",Customers:"customers",Wholesale:"wholesale",Payments:"payments"};
export const reportService={getReport(tab,filters={}){return api.get(`/reports/${endpoints[tab]}?${new URLSearchParams(filters)}`);}};
