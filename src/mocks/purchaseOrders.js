export const purchaseOrders = [
  {
    id:11,number:"PO-2026-0011",supplierId:1,supplierName:"Bosch East Africa Distributor",warehouseId:1,status:"PARTIALLY_RECEIVED",orderDate:"2026-10-20",expectedDate:"2026-10-30",supplierReference:"BOS-Q-4118",notes:"Priority replenishment for Bosch fast-moving lines.",createdBy:"Arnon Otieno",approvedBy:"Arnon Otieno",
    items:[
      {productId:1,variantId:101,sku:"BOS-GSB18V",name:"Bosch GSB 18V Professional Cordless Impact Drill",brand:"Bosch",orderedQuantity:30,previouslyReceived:10,unitCost:13200,discount:0,tax:16,currentStock:84},
      {productId:6,variantId:106,sku:"BOS-GBH226",name:"Bosch Professional Rotary Hammer",brand:"Bosch",orderedQuantity:15,previouslyReceived:0,unitCost:21100,discount:2,tax:16,currentStock:4},
      {productId:11,variantId:111,sku:"BOS-BAT18",name:"Bosch 18V 5Ah Battery",brand:"Bosch",orderedQuantity:40,previouslyReceived:20,unitCost:7900,discount:0,tax:16,currentStock:72},
    ],
  },
  {
    id:12,number:"PO-2026-0012",supplierId:2,supplierName:"Makita Kenya Distributor",warehouseId:1,status:"SENT",orderDate:"2026-10-22",expectedDate:"2026-10-29",supplierReference:"MAK-Q-8892",notes:"Standard Makita replenishment.",createdBy:"Faith Wambui",approvedBy:"Arnon Otieno",
    items:[
      {productId:2,variantId:102,sku:"MAK-GA9020",name:"Makita GA9020 230mm Heavy Duty Angle Grinder",brand:"Makita",orderedQuantity:25,previouslyReceived:0,unitCost:10100,discount:0,tax:16,currentStock:18},
      {productId:7,variantId:107,sku:"MAK-DTD152",name:"Makita Cordless Impact Driver",brand:"Makita",orderedQuantity:20,previouslyReceived:0,unitCost:12100,discount:0,tax:16,currentStock:31},
      {productId:12,variantId:112,sku:"MAK-DC18RC",name:"Makita Fast Charger",brand:"Makita",orderedQuantity:20,previouslyReceived:0,unitCost:5800,discount:0,tax:16,currentStock:27},
    ],
  },
  {
    id:13,number:"PO-2026-0013",supplierId:3,supplierName:"Total Tools Kenya",warehouseId:3,status:"APPROVED",orderDate:"2026-10-23",expectedDate:"2026-11-01",supplierReference:"TOT-Q-1901",notes:"Mombasa warehouse replenishment.",createdBy:"Faith Wambui",approvedBy:"Arnon Otieno",
    items:[
      {productId:5,variantId:105,sku:"TOT-TP135",name:"TOTAL 3.5kVA Petrol Generator Heavy Duty",brand:"TOTAL",orderedQuantity:8,previouslyReceived:0,unitCost:47500,discount:1,tax:16,currentStock:9},
      {productId:10,variantId:110,sku:"TOT-TDLI200",name:"TOTAL 20V Cordless Drill",brand:"TOTAL",orderedQuantity:30,previouslyReceived:0,unitCost:8700,discount:0,tax:16,currentStock:45},
    ],
  },
];

export const calculatePurchaseOrderTotals = (order) => {
  const subtotal=order.items.reduce((sum,item)=>sum+item.orderedQuantity*item.unitCost,0);
  const discount=order.items.reduce((sum,item)=>sum+(item.orderedQuantity*item.unitCost*Number(item.discount||0))/100,0);
  const tax=order.items.reduce((sum,item)=>{const after=item.orderedQuantity*item.unitCost*(1-Number(item.discount||0)/100);return sum+(after*Number(item.tax||0))/100},0);
  return {subtotal,discount,tax,total:subtotal-discount+tax};
};
