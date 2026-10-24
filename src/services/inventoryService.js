import { api } from "./apiClient";
import { inventory, movements, warehouses } from "@/mocks/inventory";
import { products } from "@/mocks/products";
import { suppliers } from "@/mocks/suppliers";
import { purchaseOrders } from "@/mocks/purchaseOrders";
import { stockReceipts, createMockReceipt } from "@/mocks/stockReceipts";
import { useAuthStore } from "@/store/authStore";
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
const paginate = (rows, page = 0, size = 10) => ({ content: rows.slice(page * size, (page + 1) * size), page, size, totalElements: rows.length, totalPages: Math.max(1, Math.ceil(rows.length / size)) });
export const inventoryService = {
  getInventory(params = {}) {
    if (!useMocks) return api.get(`/inventory?${new URLSearchParams(params)}`);
    const { search = "", warehouse = "", status = "", category = "", page = 0, size = 10 } = params;
    const query = search.toLowerCase();
    const rows = inventory.filter((item) => (!query || `${item.sku} ${item.product}`.toLowerCase().includes(query)) && (!warehouse || String(item.warehouse.id) === String(warehouse)) && (!status || item.status === status) && (!category || item.category === category));
    return Promise.resolve(paginate(rows, Number(page), Number(size)));
  },
  getStockMovements(params = {}) {
    if (!useMocks) return api.get(`/inventory/movements?${new URLSearchParams(params)}`);
    const { search = "", warehouse = "", type = "", user = "", date = "", page = 0, size = 10 } = params; const query = search.toLowerCase();
    const rows = movements.filter((item) => (!query || `${item.sku} ${item.product} ${item.reference}`.toLowerCase().includes(query)) && (!warehouse || item.warehouse === warehouse) && (!type || item.type === type) && (!user || item.performedBy.toLowerCase().includes(user.toLowerCase())) && (!date || item.date.startsWith(date)));
    return Promise.resolve(paginate(rows, Number(page), Number(size)));
  },
  getStockReceipt(id) { return useMocks ? Promise.resolve(stockReceipts.find((receipt) => String(receipt.id) === String(id))) : api.get(`/inventory/receipts/${id}`); },
  getReceivingOptions() { return useMocks ? Promise.resolve({ suppliers, purchaseOrders, warehouses, products }) : api.get("/inventory/receiving-options"); },
  receiveStock(payload) {
    if (!useMocks) return api.post("/inventory/receipts", payload);
    const supplier = suppliers.find((item) => String(item.id) === String(payload.supplierId)); const warehouse = warehouses.find((item) => String(item.id) === String(payload.warehouseId)); const purchaseOrder = purchaseOrders.find((item) => String(item.id) === String(payload.purchaseOrderId));
    const receiptItems = payload.items.map((item) => { const product = products.find((entry) => entry.variantId === Number(item.variantId)); return { productId: product.id, variantId: product.variantId, sku: product.sku, name: product.name, quantity: Number(item.quantity), unitCost: Number(item.unitCost), condition: item.condition, batchNumber: item.batchNumber || null, notes: item.notes || null }; });
    const user=useAuthStore.getState().user; const receivedBy={id:user?.id,name:user?`${user.firstName} ${user.lastName}`:"Current Staff"};
    const receipt = createMockReceipt(payload, { supplier, warehouse, purchaseOrderNumber: purchaseOrder?.number, receivedBy, items: receiptItems });
    receiptItems.forEach((item) => {
      const product=products.find((entry)=>entry.variantId===item.variantId); let stock=inventory.find((entry)=>entry.variantId===item.variantId&&entry.warehouse.id===warehouse.id);
      if(!stock){stock={id:Date.now()+item.variantId,productId:item.productId,variantId:item.variantId,sku:item.sku,product:item.name,category:product.category,warehouse,physicalStock:0,reserved:0,available:0,damaged:0,reorderLevel:8,status:"OUT_OF_STOCK"};inventory.push(stock);}
      stock.physicalStock+=item.quantity;
      if(item.condition==="DAMAGED")stock.damaged+=item.quantity;else{stock.available+=item.quantity;product.stock+=item.quantity;}
      stock.status=stock.available===0?"OUT_OF_STOCK":stock.available<=stock.reorderLevel?"LOW_STOCK":"IN_STOCK";
      movements.unshift({id:Date.now()+item.variantId,date:receipt.receivedAt,sku:item.sku,product:item.name,warehouse:warehouse.name,type:"PURCHASE_RECEIPT",quantity:item.quantity,balance:stock.physicalStock,reference:receipt.receiptNumber,performedBy:receivedBy.name});
      if(item.condition==="DAMAGED")movements.unshift({id:Date.now()+item.variantId+5000,date:receipt.receivedAt,sku:item.sku,product:item.name,warehouse:warehouse.name,type:"DAMAGE",quantity:-item.quantity,balance:stock.available,reference:receipt.receiptNumber,performedBy:receivedBy.name});
      const poItem=purchaseOrder?.items.find((entry)=>entry.variantId===item.variantId);if(poItem)poItem.previouslyReceived+=item.quantity;
    });
    if(purchaseOrder){purchaseOrder.status=purchaseOrder.items.every((item)=>item.previouslyReceived>=item.orderedQuantity)?"RECEIVED":"PARTIALLY_RECEIVED";}
    return Promise.resolve(receipt);
  },
  createAdjustment(payload) {
    if (!useMocks) return api.post("/inventory/adjustments", payload);
    const product = products.find((item) => item.variantId === Number(payload.variantId)); const warehouse = warehouses.find((item) => String(item.id) === String(payload.warehouseId)); const signed = ["REMOVE", "DAMAGED"].includes(payload.adjustmentType) ? -Number(payload.quantity) : Number(payload.quantity); const result = { id: Date.now(), adjustmentNumber: `ADJ-2026-${String(movements.length + 42).padStart(4,"0")}`, ...payload }; const user=useAuthStore.getState().user; const performedBy=user?`${user.firstName} ${user.lastName}`:"Current Staff";
    let stock=inventory.find((entry)=>entry.variantId===product.variantId&&entry.warehouse.id===warehouse.id);if(!stock){stock={id:result.id+1,productId:product.id,variantId:product.variantId,sku:product.sku,product:product.name,category:product.category,warehouse,physicalStock:0,reserved:0,available:0,damaged:0,reorderLevel:8,status:"OUT_OF_STOCK"};inventory.push(stock);}
    if(payload.adjustmentType==="DAMAGED"){stock.available=Math.max(0,stock.available-Number(payload.quantity));stock.damaged+=Number(payload.quantity);}else{stock.available=Math.max(0,stock.available+signed);stock.physicalStock=Math.max(0,stock.physicalStock+signed);}
    stock.status=stock.available===0?"OUT_OF_STOCK":stock.available<=stock.reorderLevel?"LOW_STOCK":"IN_STOCK";
    movements.unshift({ id: result.id, date: new Date().toISOString(), sku: product.sku, product: product.name, warehouse: warehouse.name, type: payload.adjustmentType === "DAMAGED" ? "DAMAGE" : "ADJUSTMENT", quantity: signed, balance: stock.available, reference: payload.reference || result.adjustmentNumber, performedBy });
    return Promise.resolve(result);
  },
  getMovements(params = {}) { return this.getStockMovements(params); },
  adjustStock(payload) { return this.createAdjustment(payload); },
};
