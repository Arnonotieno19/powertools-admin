import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { orderService } from "@/services/orderService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Tables.module.css";

const statuses=["PENDING_PAYMENT","PAID","PROCESSING","PACKED","READY_FOR_DISPATCH","SHIPPED","DELIVERED","CANCELLED","RETURN_REQUESTED","RETURNED"];
export default function Orders(){const router=useRouter();const routeStatus=typeof router.query.status==="string"?router.query.status:"";const [search,setSearch]=useState("");const [statusOverride,setStatus]=useState(null);const [page,setPage]=useState(1);const [result,setResult]=useState(null);const [error,setError]=useState("");const status=statusOverride??routeStatus;useEffect(()=>{let active=true;orderService.getOrders({search,status,page:page-1,size:10}).then((data)=>{if(active)setResult(data)}).catch((err)=>{if(active)setError(err.message)});return()=>{active=false}},[search,status,page]);return <AdminLayout permission={PERMISSIONS.ORDER_VIEW}><PageHeader title="Orders" description="Process retail and wholesale orders through fulfilment."/><section className={styles.panel}><div className={styles.toolbar}><SearchInput placeholder="Search order, customer or phone..." value={search} onChange={(e)=>{setSearch(e.target.value);setPage(1)}}/><select className={styles.select} value={status} onChange={(e)=>{setStatus(e.target.value);setPage(1)}}><option value="">All statuses</option>{statuses.map((item)=><option key={item}>{item}</option>)}</select></div>{error?<ErrorState message={error}/>:!result?<Loader label="Loading orders…"/>:result.content.length===0?<EmptyState title="No orders found"/>:<><div className={styles.wrap}><table className={styles.table}><thead><tr><th>Order</th><th>Customer</th><th>Type</th><th>Items</th><th>Date</th><th>Payment</th><th>Fulfilment</th><th>Delivery</th><th>Assigned Staff</th><th>Actions</th></tr></thead><tbody>{result.content.map((order)=><tr key={order.id}><td><strong>{order.orderNumber}</strong></td><td>{order.customer}<div className={styles.muted}>{order.phone}</div></td><td>{order.type === "WHOLESALE"?"Wholesale":"Retail"}</td><td>{order.items}</td><td>{order.date}</td><td><StatusBadge status={order.paymentStatus}/></td><td><StatusBadge status={order.status}/></td><td>{order.delivery}</td><td>{order.assignedStaff}</td><td><Link className={styles.action} href={`/orders/${order.id}`}>View Details</Link></td></tr>)}</tbody></table></div><div className={styles.summary}>{result.totalElements} orders · Page {result.page+1} of {result.totalPages}</div><Pagination page={page} pages={result.totalPages} onChange={setPage}/></>}</section></AdminLayout>}
