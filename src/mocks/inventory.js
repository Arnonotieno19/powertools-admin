import { products } from "./products";
import { warehouses } from "./warehouses";
export { warehouses } from "./warehouses";

export const inventory = products.map((product,index) => {
  const reserved=(index*3)%8; const damaged=index%5===0?2:0; const physical=product.stock+reserved+damaged; const available=Math.max(0,physical-reserved-damaged); const reorderLevel=index%3===0?10:8;
  return {
    id:index+1, productId:product.id, variantId:product.variantId, sku:product.sku,
    product:product.name, category:product.category, warehouse:warehouses[index%warehouses.length],
    physicalStock:physical, reserved, available, damaged, reorderLevel,
    status:available===0?"OUT_OF_STOCK":available<=reorderLevel?"LOW_STOCK":"IN_STOCK",
  };
});

export const movements = [
  { id:1,date:"2026-10-25T09:42:00+03:00",sku:"BOS-GSB18V",product:"Bosch GSB 18V Professional Cordless Impact Drill",warehouse:"Nairobi Main Warehouse",type:"PURCHASE_RECEIPT",quantity:15,balance:99,reference:"GRN-2026-00124",performedBy:"David Ouma" },
  { id:2,date:"2026-10-25T08:15:00+03:00",sku:"DEW-DWE560",product:"DeWalt 185mm Professional Circular Saw 1350W",warehouse:"Mombasa Warehouse",type:"ORDER_RESERVATION",quantity:-2,balance:6,reference:"TM-10512",performedBy:"System" },
  { id:3,date:"2026-10-24T16:20:00+03:00",sku:"ING-MMA200",product:"INGCO 200A Inverter Welding Machine",warehouse:"Nairobi Main Warehouse",type:"DAMAGE",quantity:-1,balance:23,reference:"ADJ-2026-0041",performedBy:"David Ouma" },
  { id:4,date:"2026-10-24T14:10:00+03:00",sku:"MAK-GA9020",product:"Makita GA9020 230mm Heavy Duty Angle Grinder",warehouse:"CBD Shop",type:"SALE",quantity:-2,balance:18,reference:"TM-10509",performedBy:"System" },
  { id:5,date:"2026-10-24T11:35:00+03:00",sku:"BOS-BAT18",product:"Bosch 18V 5Ah Battery",warehouse:"Mombasa Warehouse",type:"TRANSFER_IN",quantity:10,balance:72,reference:"TRF-2026-0018",performedBy:"David Ouma" },
  { id:6,date:"2026-10-23T17:00:00+03:00",sku:"TOT-TDLI200",product:"TOTAL 20V Cordless Drill",warehouse:"Nairobi Main Warehouse",type:"RETURN",quantity:1,balance:45,reference:"RET-2026-009",performedBy:"Mercy Njeri" },
];
