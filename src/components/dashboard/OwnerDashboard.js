import DashboardBase from "./DashboardBase"; import { ownerMetrics } from "@/mocks/dashboard";
export default function OwnerDashboard(){return <DashboardBase role="OWNER" title="Owner overview" description="Monitor sales, orders, inventory, wholesale activity and system performance." metrics={ownerMetrics}/>;}
