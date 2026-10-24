import DashboardBase from "./DashboardBase"; import { adminMetrics } from "@/mocks/dashboard";
export default function AdminDashboard(){return <DashboardBase role="ADMIN" title="Operations overview" description="Manage daily commerce activity without sensitive financial reporting." metrics={adminMetrics}/>;}
