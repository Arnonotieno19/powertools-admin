import { PERMISSIONS as P } from "./permissions";

export const navigation = [
  { section:"Administration",label:"Dashboard",href:"/",icon:"⌂",permission:P.DASHBOARD_VIEW },

  { section:"Catalog",label:"Products",href:"/products",icon:"▦",permission:P.PRODUCT_VIEW },
  { label:"Categories",href:"/products?view=categories",icon:"☷",permission:P.PRODUCT_UPDATE },
  { label:"Brands",href:"/products?view=brands",icon:"◆",permission:P.PRODUCT_UPDATE },

  { section:"Inventory",label:"Inventory",href:"/inventory",icon:"📦",permission:P.INVENTORY_VIEW,badge:7 },
  { label:"Stock In",href:"/inventory/stock-in",icon:"↓",permission:P.INVENTORY_RECEIVE },
  { label:"Adjustments",href:"/inventory/adjustments",icon:"±",permission:P.INVENTORY_ADJUST },
  { label:"Movements",href:"/inventory/movements",icon:"⇄",permission:P.INVENTORY_VIEW },
  { label:"Warehouses",href:"/warehouses",icon:"🏬",permission:P.WAREHOUSE_VIEW },
  { label:"Transfers",href:"/warehouses/transfers",icon:"⇆",permission:P.TRANSFER_VIEW },

  { section:"Orders",label:"Orders",href:"/orders",icon:"▤",permission:P.ORDER_VIEW,badge:12 },
  { label:"Processing",href:"/orders?status=PROCESSING",icon:"⚙",permission:P.ORDER_VIEW },
  { label:"Packed",href:"/orders?status=PACKED",icon:"📦",permission:P.ORDER_VIEW },
  { label:"Ready for Dispatch",href:"/orders?status=READY_FOR_DISPATCH",icon:"✓",permission:P.ORDER_VIEW },
  { label:"Shipped",href:"/orders?status=SHIPPED",icon:"🚚",permission:P.ORDER_VIEW },
  { label:"Delivered",href:"/orders?status=DELIVERED",icon:"●",permission:P.ORDER_VIEW },
  { label:"Returns",href:"/orders/returns",icon:"↩",permission:P.ORDER_VIEW },
  { label:"Deliveries",href:"/orders?view=deliveries",icon:"◇",permission:P.ORDER_VIEW },

  { section:"Wholesale",label:"Accounts",href:"/wholesale",icon:"🏢",permission:P.WHOLESALE_VIEW,badge:4 },
  { label:"Quotations",href:"/wholesale?view=quotations",icon:"⌑",permission:P.WHOLESALE_VIEW },

  { section:"Procurement",label:"Suppliers",href:"/suppliers",icon:"🏭",permission:P.SUPPLIER_VIEW },
  { label:"Purchase Orders",href:"/purchase-orders",icon:"🧾",permission:P.PURCHASE_ORDER_VIEW },

  { section:"Insights",label:"Reports",href:"/reports",icon:"📊",permission:P.REPORT_OPERATIONAL },
  { label:"Payments",href:"/reports?tab=Payments",icon:"💳",permission:P.PAYMENT_VIEW },

  { section:"System",label:"Users",href:"/users",icon:"👥",permission:P.USER_MANAGE },
  { label:"Roles",href:"/roles",icon:"🔐",permission:P.ROLE_MANAGE },
  { label:"Audit Logs",href:"/audit",icon:"⌚",permission:P.AUDIT_VIEW },
  { label:"Settings",href:"/settings",icon:"⚙",permission:P.SETTINGS_MANAGE },
];
