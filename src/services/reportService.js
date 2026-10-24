import { api } from "./apiClient";
import * as reports from "@/mocks/reports";
const useMocks=process.env.NEXT_PUBLIC_USE_MOCKS!=="false";
const endpoints={Overview:"overview",Sales:"sales",Profitability:"profitability",Orders:"orders",Inventory:"inventory",Customers:"customers",Wholesale:"wholesale",Payments:"payments"};
export const reportService={getReport(tab,filters={}){if(!useMocks)return api.get(`/reports/${endpoints[tab]}?${new URLSearchParams(filters)}`);const data={Overview:reports.reportOverview,Sales:{trend:reports.salesTrend,products:reports.salesByProduct,categories:reports.salesByCategory,brands:reports.salesByBrand},Profitability:{overview:reports.reportOverview,products:reports.salesByProduct},Orders:reports.orderReport,Inventory:reports.inventoryReport,Customers:reports.customerReport,Wholesale:reports.wholesaleReport,Payments:reports.paymentReport};return Promise.resolve(data[tab]);}};
