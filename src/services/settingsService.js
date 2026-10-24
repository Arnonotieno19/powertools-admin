import { api } from "./apiClient";
import { systemSettings } from "@/mocks/settings";
const useMocks=process.env.NEXT_PUBLIC_USE_MOCKS!=="false";
export const settingsService={getSettings:()=>useMocks?Promise.resolve(structuredClone(systemSettings)):api.get("/settings"),updateSettings(payload){if(!useMocks)return api.put("/settings",payload);Object.entries(payload).forEach(([section,value])=>{systemSettings[section]={...systemSettings[section],...value}});return Promise.resolve(structuredClone(systemSettings));}};
