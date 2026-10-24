const timeline = (status) => {
  const stages=["ORDER_PLACED","PAYMENT_CONFIRMED","PROCESSING","PACKED","READY_FOR_DISPATCH","SHIPPED","DELIVERED"];
  const mapped=status==="PENDING_PAYMENT"?"ORDER_PLACED":status==="PAID"?"PAYMENT_CONFIRMED":status; const index=Math.max(0,stages.indexOf(mapped));
  return stages.slice(0,index+1).map((stage,i)=>({stage,timestamp:`2026-10-${24+Math.min(i,1)}T${9+i}:15:00+03:00`,staff:i<2?"System":"Mercy Njeri"}));
};

export const orders = [
  { id:10512,orderNumber:"TM-10512",customer:"ABC Hardware Ltd",phone:"0712 555 401",type:"WHOLESALE",items:42,date:"2026-10-25",total:182400,paymentStatus:"PAID",status:"PROCESSING",delivery:"Nairobi Standard",address:"Enterprise Road, Industrial Area, Nairobi",assignedStaff:"Mercy Njeri" },
  { id:10511,orderNumber:"TM-10511",customer:"James Mwangi",phone:"0722 140 218",type:"RETAIL",items:2,date:"2026-10-25",total:28900,paymentStatus:"PAID",status:"PAID",delivery:"Nairobi Express",address:"Parklands Road, Nairobi",assignedStaff:"Unassigned" },
  { id:10510,orderNumber:"TM-10510",customer:"BuildPro Contractors",phone:"0701 884 990",type:"WHOLESALE",items:18,date:"2026-10-24",total:94700,paymentStatus:"PAID",status:"SHIPPED",delivery:"Upcountry",address:"Kenyatta Avenue, Nakuru",assignedStaff:"Mercy Njeri" },
  { id:10509,orderNumber:"TM-10509",customer:"Peter Otieno",phone:"0791 340 100",type:"RETAIL",items:1,date:"2026-10-24",total:14800,paymentStatus:"PAID",status:"DELIVERED",delivery:"Store Pickup",address:"CBD Shop",assignedStaff:"Mercy Njeri" },
  { id:10508,orderNumber:"TM-10508",customer:"Jane Wanjiku",phone:"0721 344 121",type:"RETAIL",items:3,date:"2026-10-23",total:37500,paymentStatus:"PENDING",status:"PENDING_PAYMENT",delivery:"Nairobi Standard",address:"Kikuyu Town, Kiambu",assignedStaff:"Unassigned" },
  { id:10507,orderNumber:"TM-10507",customer:"Kisumu Tools Centre",phone:"0708 441 003",type:"WHOLESALE",items:26,date:"2026-10-23",total:226300,paymentStatus:"PAID",status:"PACKED",delivery:"Upcountry",address:"Oginga Odinga Street, Kisumu",assignedStaff:"Mercy Njeri" },
].map((order)=>({...order,timeline:timeline(order.status),notes:[{id:1,author:"Mercy Njeri",timestamp:"25 Oct 2026, 09:20",message:"Customer requested delivery after 3 PM."}]}));

export const orderItems = [
  { productId:1,variantId:101,sku:"BOS-GSB18V",name:"Bosch GSB 18V Professional Cordless Impact Drill",quantity:2,unitPrice:18500,image:null },
  { productId:2,variantId:102,sku:"MAK-GA9020",name:"Makita GA9020 230mm Heavy Duty Angle Grinder",quantity:1,unitPrice:14800,image:null },
];

export const returns = [
  { id:1,orderNumber:"TM-10488",customer:"Anne Wambui",product:"Bosch GSB 18V Impact Drill",reason:"Item does not power on",requestedDate:"2026-10-24",status:"REQUESTED" },
  { id:2,orderNumber:"TM-10461",customer:"Westlands Hardware",product:"Makita GA9020 Angle Grinder",reason:"Wrong variant supplied",requestedDate:"2026-10-22",status:"APPROVED" },
  { id:3,orderNumber:"TM-10420",customer:"Daniel Kiptoo",product:"TOTAL 20V Cordless Drill",reason:"Damaged during delivery",requestedDate:"2026-10-18",status:"INSPECTED" },
];
