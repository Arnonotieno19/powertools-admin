import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import StaffUserForm from "@/components/users/StaffUserForm";
import { userService } from "@/services/userService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Forms.module.css";
export default function UserDetail(){const router=useRouter();const [user,setUser]=useState(null);const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [pending,setPending]=useState(null);useEffect(()=>{if(!router.isReady)return;userService.getUser(router.query.id).then((data)=>data?setUser(data):setError("Staff user not found."))},[router.isReady,router.query.id]);async function requestSave(payload){if(payload.role!==user.role){setPending(payload);return}await save(payload)}async function save(payload){setBusy(true);try{const updated=await userService.updateUser(user.id,payload);setUser(updated);setPending(null)}catch(err){setError(err.message)}finally{setBusy(false)}}return <AdminLayout permission={PERMISSIONS.USER_MANAGE}><PageHeader title={user?.name||"Staff User"} description="Review profile, role and account access."/>{error?<ErrorState message={error}/>:!user?<Loader label="Loading staff user…"/>:<section className={styles.panel}><StaffUserForm initialValue={{...user,active:user.status==="ACTIVE"}} onSubmit={requestSave} submitLabel="Save Changes" busy={busy}/></section>}<ConfirmDialog open={Boolean(pending)} title="Change Staff Role" message={`Change ${user?.name} from ${user?.role?.replaceAll("_"," ")} to ${pending?.role?.replaceAll("_"," ")}?`} confirmLabel="Change Role" onCancel={()=>setPending(null)} onConfirm={()=>save(pending)}/></AdminLayout>}
