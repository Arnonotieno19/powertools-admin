import { api } from "./apiClient";
import { wholesaleApplications } from "@/mocks/wholesale";
import { useAuthStore } from "@/store/authStore";
const useMocks = false;
export const wholesaleService = {
  getApplications(params = {}) { if (!useMocks) return api.get(`/admin/wholesale-applications?${new URLSearchParams(params)}`); const { search="",status="",page=0,size=10 }=params; const query=search.toLowerCase(); const rows=wholesaleApplications.filter((item)=>(!query||`${item.business} ${item.contact} ${item.email} ${item.phone}`.toLowerCase().includes(query))&&(!status||item.status===status)); return Promise.resolve({content:rows.slice(Number(page)*Number(size),(Number(page)+1)*Number(size)),page:Number(page),size:Number(size),totalElements:rows.length,totalPages:Math.max(1,Math.ceil(rows.length/Number(size)))}); },
  getApplication: (id) => useMocks ? Promise.resolve(wholesaleApplications.find((item) => String(item.id) === String(id))) : api.get(`/admin/wholesale-applications/${id}`),
  updateStatus: (id, status, pricingTier = null) => { if (!useMocks) return api.patch(`/admin/wholesale-applications/${id}`, { status, pricingTier }); const item=wholesaleApplications.find((entry)=>entry.id===Number(id)); if(item){item.status=status;item.pricingTier=pricingTier || item.pricingTier;} return Promise.resolve(item); },
  async downloadDocument(applicationId, doc) { const base=process.env.NEXT_PUBLIC_API_BASE_URL||"http://localhost:50090/api/v1";const response=await fetch(`${base}/admin/wholesale-applications/${applicationId}/documents/${doc.id}`,{headers:{Authorization:`Bearer ${useAuthStore.getState().accessToken}`}});if(!response.ok)throw new Error("Unable to download document.");const url=URL.createObjectURL(await response.blob());const link=document.createElement("a");link.href=url;link.download=doc.filename;link.click();URL.revokeObjectURL(url); },
};
