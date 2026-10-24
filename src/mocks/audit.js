const seeds=[
  ["2026-10-25T10:30:00+03:00","David Ouma","INVENTORY_STAFF","Received Stock","StockReceipt","GRN-2026-00125","Received 20 units against PO-2026-0011","102.68.21.14"],
  ["2026-10-25T09:42:00+03:00","David Ouma","INVENTORY_STAFF","Adjusted Inventory","Product","BOS-GSB18V","-2 DAMAGED at Nairobi Main Warehouse","102.68.21.14"],
  ["2026-10-25T09:18:00+03:00","Mercy Njeri","ORDER_STAFF","Updated Order","Order","TM-10512","PROCESSING → PACKED","102.68.21.18"],
  ["2026-10-24T16:11:00+03:00","Faith Wambui","ADMIN","Approved Wholesale Account","WholesaleAccount","Rift Hardware Ltd","Approved with STANDARD_WHOLESALE pricing","102.68.21.12"],
  ["2026-10-24T14:20:00+03:00","Arnon Otieno","OWNER","Created Staff User","StaffUser","James Kamau","Created ORDER_STAFF account","102.68.21.10"],
  ["2026-10-24T12:08:00+03:00","David Ouma","INVENTORY_STAFF","Created Transfer","WarehouseTransfer","TRF-2026-0019","Nairobi Main Warehouse → Mombasa Warehouse","102.68.21.14"],
  ["2026-10-24T10:45:00+03:00","Faith Wambui","ADMIN","Created Purchase Order","PurchaseOrder","PO-2026-0013","Created order for Total Tools Kenya","102.68.21.12"],
];
export const auditLogs=Array.from({length:27},(_,index)=>{const seed=seeds[index%seeds.length];return {id:index+1,timestamp:new Date(new Date(seed[0]).getTime()-index*3600000).toISOString(),user:seed[1],role:seed[2],action:seed[3],entity:seed[4],record:seed[5],description:seed[6],ip:seed[7]}});
