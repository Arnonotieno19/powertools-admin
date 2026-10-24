import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import TransferWizard from "@/components/warehouses/TransferWizard";
import { PERMISSIONS } from "@/config/permissions";
export default function NewTransfer(){return <AdminLayout permission={PERMISSIONS.TRANSFER_CREATE}><PageHeader title="Create Warehouse Transfer" description="Move available stock between ToolMart locations with paired movement records."/><TransferWizard/></AdminLayout>}
