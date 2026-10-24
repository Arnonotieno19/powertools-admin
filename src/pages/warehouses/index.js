import { useEffect,useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { warehouseService } from "@/services/warehouseService";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Tables.module.css";
export default function Warehouses(){const [search,setSearch]=useState("");const [status,setStatus]=useState("");const [page,setPage]=useState(1);const [result,setResult]=useState(null);useEffect(()=>{let active=true;warehouseService.getWarehouses({search,status,page:page-1,size:10}).then((data)=>{if(active)setResult(data)});return()=>{active=false}},[search,status,page]);return <AdminLayout permission={PERMISSIONS.WAREHOUSE_VIEW}><PageHeader title="Warehouses" description="Stock locations, managers and inventory health."><Button href="/warehouses/transfers" variant="outline">Transfers</Button><PermissionGuard permission={PERMISSIONS.WAREHOUSE_MANAGE}><Button href="/warehouses/new">+ Add Warehouse</Button></PermissionGuard></PageHeader><section className={styles.panel}><div className={styles.toolbar}><SearchInput value={search} onChange={(e)=>{setSearch(e.target.value);setPage(1)}} placeholder="Search warehouse, code or location..."/><select className={styles.select} value={status} onChange={(e)=>{setStatus(e.target.value);setPage(1)}}><option value="">All statuses</option><option>ACTIVE</option><option>DISABLED</option></select></div>{!result?<Loader label="Loading warehouses…"/>:result.content.length===0?<EmptyState title="No warehouses found"/>:<><div className={styles.wrap}><table className={styles.table}><thead><tr><th>Name</th><th>Code</th><th>Location</th><th>Manager</th><th>Total SKUs</th><th>Available Units</th><th>Low Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{result.content.map((warehouse)=><tr key={warehouse.id}><td><strong>{warehouse.name}</strong></td><td>{warehouse.code}</td><td>{warehouse.location}</td><td>{warehouse.manager}</td><td>{warehouse.totalSkus}</td><td>{warehouse.availableUnits}</td><td>{warehouse.lowStock}</td><td><StatusBadge status={warehouse.status}/></td><td><Link className={styles.action} href={`/warehouses/${warehouse.id}`}>View</Link></td></tr>)}</tbody></table></div><Pagination page={page} pages={result.totalPages} onChange={setPage}/></>}</section></AdminLayout>}
