import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import StockReceivingWizard from "@/components/inventory/stock-receiving/StockReceivingWizard";
import { PERMISSIONS } from "@/config/permissions";
export default function StockIn(){return <AdminLayout permission={PERMISSIONS.INVENTORY_RECEIVE}><PageHeader title="Stock Receiving" description="A controlled goods-receiving workflow that creates auditable stock movements."/><StockReceivingWizard/></AdminLayout>}
