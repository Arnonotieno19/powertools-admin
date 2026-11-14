import { api } from "./apiClient";
export const userService={
  getUsers:(params={})=>api.get(`/staff/users?${new URLSearchParams(params)}`),getUser:(id)=>api.get(`/staff/users/${id}`),createUser:(payload)=>api.post("/staff/users",payload),updateUser:(id,payload)=>api.put(`/staff/users/${id}`,payload),updateStatus:(id,status)=>api.patch(`/staff/users/${id}/status`,{status}),resetPassword:(id)=>api.post(`/staff/users/${id}/reset-password`,{}),
};
