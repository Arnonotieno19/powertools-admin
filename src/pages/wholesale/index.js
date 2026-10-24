import { useEffect,useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { wholesaleService } from "@/services/wholesaleService";
import { PERMISSIONS } from "@/config/permissions";
import { formatCurrency } from "@/utils/format";
import styles from "@/styles/Tables.module.css";
export default function Wholesale(){const [result,setResult]=useState(null);const [error,setError]=useState("");const [search,setSearch]=useState("");const [status,setStatus]=useState("");const [page,setPage]=useState(1);useEffect(()=>{let active=true;wholesaleService.getApplications({search,status,page:page-1,size:10}).then((data)=>{if(active)setResult(data)}).catch((err)=>{if(active)setError(err.message)});return()=>{active=false}},[search,status,page]);return <AdminLayout permission={PERMISSIONS.WHOLESALE_VIEW}><PageHeader title="Wholesale Accounts" description="Review business identities and control access to wholesale pricing."/><section className={styles.panel}><div className={styles.toolbar}><SearchInput placeholder="Search business, contact or email..." value={search} onChange={(e)=>{setSearch(e.target.value);setPage(1)}}/><select className={styles.select} value={status} onChange={(e)=>{setStatus(e.target.value);setPage(1)}}><option value="">All statuses</option><option>PENDING_APPROVAL</option><option>APPROVED</option><option>REJECTED</option><option>SUSPENDED</option></select></div>{error?<ErrorState message={error}/>:!result?<Loader label="Loading wholesale applications…"/>:result.content.length===0?<EmptyState title="No wholesale applications"/>:<><div className={styles.wrap}><table className={styles.table}><thead><tr><th>Business</th><th>Contact</th><th>Phone</th><th>Email</th><th>Location</th><th>Expected Monthly</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>{result.content.map((item)=><tr key={item.id}><td><strong>{item.business}</strong></td><td>{item.contact}</td><td>{item.phone}</td><td>{item.email}</td><td>{item.location}</td><td>{formatCurrency(item.expectedMonthly)}</td><td>{new Date(item.submitted).toLocaleDateString("en-KE")}</td><td><StatusBadge status={item.status}/></td><td><Link className={styles.action} href={`/wholesale/${item.id}`}>Review</Link></td></tr>)}</tbody></table></div><Pagination page={page} pages={result.totalPages} onChange={setPage}/></>}</section></AdminLayout>}
