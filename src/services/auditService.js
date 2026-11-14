import { api } from "./apiClient";
export const auditService={getAuditLogs(params={}){return api.get(`/audit-logs?${new URLSearchParams(params)}`);}};
