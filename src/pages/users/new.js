import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import StaffUserForm from "@/components/users/StaffUserForm";
import { userService } from "@/services/userService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Forms.module.css";
export default function NewUser(){const router=useRouter();const [busy,setBusy]=useState(false);const [error,setError]=useState("");async function save(payload){setBusy(true);setError("");try{const user=await userService.createUser(payload);router.push(`/users/${user.id}`)}catch(err){setError(err.message);setBusy(false)}}return <AdminLayout permission={PERMISSIONS.USER_MANAGE}><PageHeader title="Add Staff User" description="Create an internal account. Owner accounts are protected."/>{error&&<div className={styles.danger}>{error}</div>}<section className={styles.panel}><StaffUserForm onSubmit={save} busy={busy}/></section></AdminLayout>}
