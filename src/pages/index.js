import AdminLayout from "@/components/layout/AdminLayout";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import InventoryDashboard from "@/components/dashboard/InventoryDashboard";
import OrderDashboard from "@/components/dashboard/OrderDashboard";
import { PERMISSIONS } from "@/config/permissions";
import { useAuthStore } from "@/store/authStore";

const dashboards = { OWNER: OwnerDashboard, ADMIN: AdminDashboard, INVENTORY_STAFF: InventoryDashboard, ORDER_STAFF: OrderDashboard };
export default function Home(){ const role = useAuthStore((s) => s.user?.role); const Dashboard = dashboards[role] || AdminDashboard; return <AdminLayout permission={PERMISSIONS.DASHBOARD_VIEW}><Dashboard/></AdminLayout>; }
