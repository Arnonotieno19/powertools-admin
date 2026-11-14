import { api } from "./apiClient";
export const settingsService={getSettings:()=>api.get("/settings"),updateSettings:(payload)=>api.put("/settings",payload)};
