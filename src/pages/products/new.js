import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import ProductForm from "@/components/products/ProductForm";
import { PERMISSIONS } from "@/config/permissions";
import { productService } from "@/services/productService";
import styles from "@/styles/Forms.module.css";

export default function NewProduct(){const router=useRouter();const [saving,setSaving]=useState(false);const [error,setError]=useState("");const [options,setOptions]=useState({brands:[],categories:[]});useEffect(()=>{productService.getProductOptions().then(setOptions)},[]);async function save(payload){setSaving(true);setError("");try{const created=await productService.createProduct(payload);await router.push(`/products/${created.id}`);}catch(err){setError(err.message);setSaving(false);}}return <AdminLayout permission={PERMISSIONS.PRODUCT_CREATE}><PageHeader title="Add Product" description="Create a product with flexible specifications and API-ready identifiers."><Button href="/products" variant="outline">Back to Products</Button></PageHeader><section className={styles.panel}>{error&&<div className={styles.danger}>{error}</div>}<ProductForm onSave={save} saving={saving} brands={options.brands} categories={options.categories}/></section></AdminLayout>}
