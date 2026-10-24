import DashboardBase from "./DashboardBase"; import { inventoryMetrics } from "@/mocks/dashboard";
export default function InventoryDashboard(){return <DashboardBase role="INVENTORY_STAFF" title="Inventory workspace" description="Track stock health, receipts, adjustments and warehouse movement." metrics={inventoryMetrics}/>;}
