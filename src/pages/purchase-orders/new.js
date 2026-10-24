import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import PurchaseOrderWizard from "@/components/procurement/purchase-order/PurchaseOrderWizard";
import { PERMISSIONS } from "@/config/permissions";
export default function NewPurchaseOrder(){return <AdminLayout permission={PERMISSIONS.PURCHASE_ORDER_CREATE}><PageHeader title="Create Purchase Order" description="Build a supplier order with controlled quantities, costs and approval."/><PurchaseOrderWizard/></AdminLayout>}
