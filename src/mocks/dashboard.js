export const ownerMetrics = [
  { label: "Today's Sales", value: "KES 184,500", icon: "💰", note: "+12.4% vs yesterday", tone: "success", financial: true },
  { label: "Orders Today", value: "32", icon: "▤", note: "8 awaiting fulfilment" },
  { label: "Gross Profit", value: "KES 46,800", icon: "↗", note: "25.4% margin", tone: "success", financial: true },
  { label: "Wholesale Sales", value: "KES 89,500", icon: "🏢", note: "48.5% of revenue", financial: true },
  { label: "Low Stock", value: "7", icon: "⚠", note: "Requires replenishment" },
];

export const adminMetrics = [
  { label: "Orders Today", value: "32", icon: "▤", note: "8 awaiting fulfilment" },
  { label: "Pending Orders", value: "8", icon: "⌛", note: "3 require action" },
  { label: "Low Stock", value: "7", icon: "⚠", note: "Across two warehouses" },
  { label: "Wholesale Applications", value: "4", icon: "🏢", note: "Awaiting review" },
  { label: "Returns", value: "3", icon: "↩", note: "Open cases" },
];

export const inventoryMetrics = [
  { label: "Total SKUs", value: "1,284", icon: "▦", note: "Active variants" },
  { label: "Available Stock", value: "8,942", icon: "📦", note: "Across warehouses" },
  { label: "Low Stock", value: "7", icon: "⚠", note: "Below reorder point", href: "/inventory?status=LOW_STOCK" },
  { label: "Out of Stock", value: "3", icon: "!", note: "Immediate action", href: "/inventory?status=OUT_OF_STOCK" },
  { label: "Received Today", value: "145", icon: "↓", note: "4 receipts posted" },
];

export const orderMetrics = [
  { label: "Pending Orders", value: "12", icon: "⌛", note: "5 paid and ready" },
  { label: "Processing", value: "8", icon: "⚙", note: "Work in progress" },
  { label: "Packed", value: "6", icon: "📦", note: "Awaiting dispatch" },
  { label: "Ready for Dispatch", value: "4", icon: "✓", note: "Courier assignment" },
  { label: "Delivered Today", value: "19", icon: "🚚", note: "94% on time" },
];

export const salesTrend = [36, 50, 44, 68, 60, 85, 76];
