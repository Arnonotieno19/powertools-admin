import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import Pagination from "@/components/common/Pagination";
import PermissionGuard from "@/components/auth/PermissionGuard";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { productService } from "@/services/productService";
import { PERMISSIONS } from "@/config/permissions";
import { formatCurrency } from "@/utils/format";
import styles from "@/styles/Tables.module.css";

export default function Products(){
  const [filters,setFilters]=useState({search:"",brand:"",category:"",status:""}); const [page,setPage]=useState(1); const [result,setResult]=useState(null); const [options,setOptions]=useState({brands:[],categories:[]}); const [error,setError]=useState("");
  useEffect(()=>{let active=true;productService.getProducts({...filters,page:page-1,size:10}).then((data)=>{if(active)setResult(data)}).catch((err)=>{if(active)setError(err.message)});return()=>{active=false}},[filters,page]);
  useEffect(()=>{let active=true;productService.getProductOptions().then((data)=>{if(active)setOptions(data)});return()=>{active=false}},[]);
  const update=(key,value)=>{setFilters((current)=>({...current,[key]:value}));setPage(1);};
  return <AdminLayout permission={PERMISSIONS.PRODUCT_VIEW}>
    <PageHeader title="Products" description="Manage catalogue products, variants, pricing and product status."><PermissionGuard permission={PERMISSIONS.PRODUCT_CREATE}><Button href="/products/new">+ Add Product</Button></PermissionGuard></PageHeader>
      <section className={styles.panel}><div className={styles.toolbar}><SearchInput placeholder="Search product, SKU or brand..." value={filters.search} onChange={(e)=>update("search",e.target.value)}/><select className={styles.select} value={filters.category} onChange={(e)=>update("category",e.target.value)}><option value="">All categories</option>{options.categories.map((item)=><option key={item}>{item}</option>)}</select><select className={styles.select} value={filters.brand} onChange={(e)=>update("brand",e.target.value)}><option value="">All brands</option>{options.brands.map((item)=><option key={item}>{item}</option>)}</select><select className={styles.select} value={filters.status} onChange={(e)=>update("status",e.target.value)}><option value="">All statuses</option><option>ACTIVE</option><option>DRAFT</option><option>DISCONTINUED</option><option>OUT_OF_STOCK</option></select></div>
      {error?<ErrorState message={error}/>:!result?<Loader label="Loading products…"/>:result.content.length===0?<EmptyState title="No products found"/>:<><div className={styles.wrap}><table className={styles.table}><thead><tr><th>Image</th><th>SKU</th><th>Product</th><th>Brand</th><th>Category</th><th>Stock</th><th>Retail Price</th><th>Wholesale Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{result.content.map((product)=><tr key={product.id}><td><span className={styles.thumb}>🛠</span></td><td><strong>{product.sku}</strong></td><td>{product.name}<div className={styles.muted}>{product.subcategory}</div></td><td>{product.brand}</td><td>{product.category}</td><td>{product.stock}</td><td>{formatCurrency(product.retailPrice)}</td><td>{formatCurrency(product.wholesaleBasePrice)}</td><td><StatusBadge status={product.status}/></td><td><div className={styles.actions}><Link className={styles.action} href={`/products/${product.id}`}>View</Link><PermissionGuard permission={PERMISSIONS.PRODUCT_UPDATE}><Link className={styles.action} href={`/products/${product.id}?edit=1`}>Edit</Link></PermissionGuard></div></td></tr>)}</tbody></table></div><div className={styles.summary}>{result.totalElements} products · Page {result.page+1} of {result.totalPages}</div><Pagination page={page} pages={result.totalPages} onChange={setPage}/></>}
    </section>
  </AdminLayout>;
}
