import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import WarehouseForm from "@/components/warehouses/WarehouseForm";
import { warehouseService } from "@/services/warehouseService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Forms.module.css";
export default function NewWarehouse(){const router=useRouter();const [saving,setSaving]=useState(false);async function save(payload){setSaving(true);const created=await warehouseService.createWarehouse(payload);router.push(`/warehouses/${created.id}`)}return <AdminLayout permission={PERMISSIONS.WAREHOUSE_MANAGE}><PageHeader title="Add Warehouse" description="Create a stock-holding location."/><section className={styles.panel}><WarehouseForm onSave={save} saving={saving}/></section></AdminLayout>}
