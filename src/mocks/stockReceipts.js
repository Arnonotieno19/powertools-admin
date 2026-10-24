export const stockReceipts = [
  {
    id:124,receiptNumber:"GRN-2026-00124",supplier:{id:1,name:"Bosch East Africa Distributor"},
    warehouse:{id:1,name:"Nairobi Main Warehouse"},purchaseOrderNumber:"PO-2026-0011",
    reference:"DEL-48277",receivedAt:"2026-10-24T10:30:00+03:00",
    receivedBy:{id:3,name:"David Ouma"},status:"RECEIVED",totalSkus:1,totalUnits:15,
    items:[{productId:1,variantId:101,sku:"BOS-GSB18V",name:"Bosch GSB 18V Professional Cordless Impact Drill",quantity:15,unitCost:13200,condition:"GOOD"}],
  },
];

export function createMockReceipt(payload, context) {
  const id=124+stockReceipts.length;
  const receipt={
    id, receiptNumber:`GRN-2026-${String(id).padStart(5,"0")}`,
    supplier:context.supplier, warehouse:context.warehouse,
    purchaseOrderNumber:context.purchaseOrderNumber || null,
    reference:payload.supplierReference, receivedAt:`${payload.receivedDate}T10:30:00+03:00`,
    receivedBy:context.receivedBy, status:"RECEIVED",
    totalSkus:payload.items.length,
    totalUnits:payload.items.reduce((sum,item)=>sum+Number(item.quantity),0),
    items:context.items,
  };
  stockReceipts.push(receipt);
  return receipt;
}
