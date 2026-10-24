import { api } from "./apiClient";
import { suppliers } from "@/mocks/suppliers";
import { products } from "@/mocks/products";
import { purchaseOrders } from "@/mocks/purchaseOrders";
import { stockReceipts } from "@/mocks/stockReceipts";
const useMocks=process.env.NEXT_PUBLIC_USE_MOCKS!=="false";
const paginate=(rows,page=0,size=10)=>({content:rows.slice(page*size,(page+1)*size),page,size,totalElements:rows.length,totalPages:Math.max(1,Math.ceil(rows.length/size))});
export const supplierService={
  getSuppliers(params={}){if(!useMocks)return api.get(`/suppliers?${new URLSearchParams(params)}`);const {search="",status="",location="",page=0,size=10}=params;const query=search.toLowerCase();const rows=suppliers.filter((supplier)=>(!query||`${supplier.name} ${supplier.contactPerson} ${supplier.email}`.toLowerCase().includes(query))&&(!status||supplier.status===status)&&(!location||supplier.location===location)).map((supplier)=>({...supplier,productsSupplied:supplier.productVariantIds.length}));return Promise.resolve(paginate(rows,Number(page),Number(size)));},
  getSupplier(id){if(!useMocks)return api.get(`/suppliers/${id}`);const supplier=suppliers.find((item)=>String(item.id)===String(id));if(!supplier)return Promise.resolve(null);return Promise.resolve({...supplier,products:products.filter((product)=>supplier.productVariantIds.includes(product.variantId)),purchaseOrders:purchaseOrders.filter((order)=>order.supplierId===supplier.id),receipts:stockReceipts.filter((receipt)=>receipt.supplier.id===supplier.id)});},
  createSupplier(payload){if(!useMocks)return api.post("/suppliers",payload);const created={id:Date.now(),productVariantIds:[],lastPurchase:null,status:"ACTIVE",...payload};suppliers.push(created);return Promise.resolve(created);},
  updateSupplier(id,payload){if(!useMocks)return api.put(`/suppliers/${id}`,payload);const index=suppliers.findIndex((item)=>String(item.id)===String(id));if(index<0)return Promise.reject(new Error("Supplier not found."));suppliers[index]={...suppliers[index],...payload};return Promise.resolve(suppliers[index]);},
  updateStatus(id,status){return this.updateSupplier(id,{status});},
};
