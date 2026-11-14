import { api } from "./apiClient";
export const paymentService={list:(params={})=>api.get(`/admin/payments?${new URLSearchParams(params)}`),reconcile:(id)=>api.post(`/admin/payments/${id}/reconcile`,{})};
