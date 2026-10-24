import { api } from "./apiClient";
import { users } from "@/mocks/users";
const useMocks=process.env.NEXT_PUBLIC_USE_MOCKS!=="false";
const paginate=(rows,page=0,size=10)=>({content:rows.slice(page*size,(page+1)*size),page,size,totalElements:rows.length,totalPages:Math.max(1,Math.ceil(rows.length/size))});
export const userService={
  getUsers(params={}){if(!useMocks)return api.get(`/staff/users?${new URLSearchParams(params)}`);const {search="",role="",status="",page=0,size=10}=params;const query=search.toLowerCase();const rows=users.filter((item)=>(!query||`${item.name} ${item.email} ${item.phone}`.toLowerCase().includes(query))&&(!role||item.role===role)&&(!status||item.status===status));return Promise.resolve(paginate(rows,Number(page),Number(size)));},
  getUser:(id)=>useMocks?Promise.resolve(users.find((item)=>String(item.id)===String(id))):api.get(`/staff/users/${id}`),
  createUser(payload){if(!useMocks)return api.post("/staff/users",payload);if(payload.role==="OWNER")return Promise.reject(new Error("Owner accounts cannot be created through normal staff management."));const created={id:Date.now(),name:`${payload.firstName} ${payload.lastName}`,status:payload.active===false?"DISABLED":"ACTIVE",lastLogin:null,createdAt:"2026-10-25",...payload};users.push(created);return Promise.resolve(created);},
  updateUser(id,payload){if(!useMocks)return api.put(`/staff/users/${id}`,payload);const index=users.findIndex((item)=>String(item.id)===String(id));if(index<0)return Promise.reject(new Error("Staff user not found."));if(users[index].role==="OWNER"&&payload.role&&payload.role!=="OWNER")return Promise.reject(new Error("The owner role is protected."));users[index]={...users[index],...payload,name:`${payload.firstName??users[index].firstName} ${payload.lastName??users[index].lastName}`};return Promise.resolve(users[index]);},
  updateStatus(id,status){if(!useMocks)return api.patch(`/staff/users/${id}/status`,{status});return this.updateUser(id,{status});},
  resetPassword(id){return useMocks?Promise.resolve({success:true,temporaryPassword:"Temporary password generated securely."}):api.post(`/staff/users/${id}/reset-password`,{});},
};
