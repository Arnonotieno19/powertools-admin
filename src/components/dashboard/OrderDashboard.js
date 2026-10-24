import DashboardBase from "./DashboardBase"; import { orderMetrics } from "@/mocks/dashboard";
export default function OrderDashboard(){return <DashboardBase role="ORDER_STAFF" title="Fulfilment workspace" description="Process orders, dispatch deliveries and manage operational exceptions." metrics={orderMetrics}/>;}
