import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { supplierService } from "@/services/supplierService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Forms.module.css";
export default function NewSupplier(){const router=useRouter();const [saving,setSaving]=useState(false);const [error,setError]=useState("");async function save(payload){setSaving(true);try{const created=await supplierService.createSupplier(payload);router.push(`/suppliers/${created.id}`)}catch(err){setError(err.message);setSaving(false)}}return <AdminLayout permission={PERMISSIONS.SUPPLIER_MANAGE}><PageHeader title="Add Supplier" description="Create a procurement supplier record."/><section className={styles.panel}>{error&&<div className={styles.danger}>{error}</div>}<SupplierForm onSave={save} saving={saving}/></section></AdminLayout>}
