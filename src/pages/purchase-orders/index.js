import { useEffect,useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import { supplierService } from "@/services/supplierService";
import { PERMISSIONS } from "@/config/permissions";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/utils/format";
import styles from "@/styles/Tables.module.css";
export default function PurchaseOrders(){const role=useAuthStore((state)=>state.user?.role);const [rows,setRows]=useState(null);const [error,setError]=useState("");useEffect(()=>{let active=true;supplierService.getPurchaseOrders().then((data)=>{if(active)setRows(data)}).catch((err)=>{if(active)setError(err.message)});return()=>{active=false}},[]);return <AdminLayout permission={PERMISSIONS.PURCHASE_ORDER_VIEW}><PageHeader title="Purchase Orders" description="Track supplier replenishment and received quantities."><Button href="/inventory/stock-in">Receive Against PO</Button></PageHeader>{error?<ErrorState message={error}/>:!rows?<Loader label="Loading purchase orders…"/>:<section className={styles.panel}><div className={styles.wrap}><table className={styles.table}><thead><tr><th>Purchase Order</th><th>Supplier</th><th>Warehouse</th><th>SKUs</th>{role!=="INVENTORY_STAFF"&&<th>Total</th>}<th>Status</th></tr></thead><tbody>{rows.map((order)=><tr key={order.id}><td><strong>{order.number}</strong></td><td>{order.supplierName}</td><td>{order.warehouseName}</td><td>{order.items.length}</td>{role!=="INVENTORY_STAFF"&&<td>{formatCurrency(order.total)}</td>}<td><StatusBadge status={order.status}/></td></tr>)}</tbody></table></div></section>}</AdminLayout>}
