import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { PERMISSIONS } from "@/config/permissions";
import styles from "@/styles/Forms.module.css";

const blank = { name:"",sku:"",brand:"Bosch",category:"Drills & Drivers",subcategory:"",shortDescription:"",fullDescription:"",retailPrice:"",wholesaleBasePrice:"",costPrice:"",vat:16,warranty:"12 months",weight:"",status:"ACTIVE",featured:false,specifications:[{attribute:"",value:""}],images:[] };

export default function ProductForm({ product, onSave, saving, brands = [], categories = [] }) {
  const [form,setForm]=useState(()=>product ? { ...blank, ...product, specifications:product.specifications?.length ? product.specifications : blank.specifications } : blank);
  const [files,setFiles]=useState([]);
  const [imageError,setImageError]=useState("");
  const update=(key,value)=>setForm((current)=>({...current,[key]:value}));
  const updateSpec=(index,key,value)=>setForm((current)=>({...current,specifications:current.specifications.map((spec,i)=>i===index?{...spec,[key]:value}:spec)}));
  const removeSpec=(index)=>setForm((current)=>({...current,specifications:current.specifications.filter((_,i)=>i!==index)}));
  const submit=(event)=>{event.preventDefault();if(form.images.length+files.length>5){setImageError("A product can have at most 5 images.");return;}onSave({...form,retailPrice:Number(form.retailPrice),wholesaleBasePrice:Number(form.wholesaleBasePrice),costPrice:form.costPrice?Number(form.costPrice):undefined,vat:Number(form.vat),weight:form.weight?Number(form.weight):undefined,specifications:form.specifications.filter((spec)=>spec.attribute.trim()&&spec.value.trim()),images:form.images.filter((image)=>image.url?.trim()).map((image,index)=>({url:image.url.trim(),altText:image.altText||form.name,sortOrder:index,primaryImage:index===0}))},files);};
  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.grid}>
      <Input id="name" label="Product Name" required value={form.name} onChange={(e)=>update("name",e.target.value)}/>
      <Input id="sku" label="SKU" required value={form.sku} onChange={(e)=>update("sku",e.target.value)}/>
      <Select id="brand" label="Brand" options={brands} value={form.brand} onChange={(e)=>update("brand",e.target.value)}/>
      <Select id="category" label="Category" options={categories} value={form.category} onChange={(e)=>update("category",e.target.value)}/>
      <Input id="subcategory" label="Subcategory" required value={form.subcategory} onChange={(e)=>update("subcategory",e.target.value)}/>
      <Select id="status" label="Status" options={["ACTIVE","DRAFT","DISCONTINUED"]} value={form.status} onChange={(e)=>update("status",e.target.value)}/>
      <Input id="retailPrice" label="Retail Price (KES)" type="number" min="0" required value={form.retailPrice} onChange={(e)=>update("retailPrice",e.target.value)}/>
      <Input id="wholesaleBasePrice" label="Wholesale Base Price (KES)" type="number" min="0" required value={form.wholesaleBasePrice} onChange={(e)=>update("wholesaleBasePrice",e.target.value)}/>
      <PermissionGuard permission={PERMISSIONS.REPORT_FINANCIAL}><Input id="costPrice" label="Cost Price (KES)" type="number" min="0" value={form.costPrice} onChange={(e)=>update("costPrice",e.target.value)}/></PermissionGuard>
      <Input id="vat" label="VAT (%)" type="number" min="0" value={form.vat} onChange={(e)=>update("vat",e.target.value)}/>
      <Input id="warranty" label="Warranty" value={form.warranty} onChange={(e)=>update("warranty",e.target.value)}/>
      <Input id="weight" label="Weight (kg)" type="number" min="0" step="0.1" value={form.weight} onChange={(e)=>update("weight",e.target.value)}/>
      <div className={`${styles.field} ${styles.wide}`}><label htmlFor="shortDescription">Short Description</label><textarea id="shortDescription" required value={form.shortDescription} onChange={(e)=>update("shortDescription",e.target.value)}/></div>
      <div className={`${styles.field} ${styles.wide}`}><label htmlFor="fullDescription">Full Description</label><textarea id="fullDescription" required value={form.fullDescription} onChange={(e)=>update("fullDescription",e.target.value)}/></div>
      <label className={styles.checkbox}><input type="checkbox" checked={form.featured} onChange={(e)=>update("featured",e.target.checked)}/> Featured product</label>
    </div>
    <section className={styles.subsection}><div className={styles.sectionHeading}><div><h3>Product Images</h3><p>Add image URLs or upload files. The first image is primary; maximum 5.</p></div><Button type="button" variant="outline" disabled={form.images.length+files.length>=5} onClick={()=>setForm((current)=>({...current,images:[...current.images,{url:"",altText:""}]}))}>+ Add Image URL</Button></div>
      {imageError&&<div className={styles.danger}>{imageError}</div>}
      <div className={styles.specList}>{form.images.map((image,index)=><div className={styles.specRow} key={image.id||index}><input type="url" aria-label={`Image ${index+1} URL`} placeholder="https://…" value={image.url||""} onChange={(e)=>setForm((current)=>({...current,images:current.images.map((item,i)=>i===index?{...item,url:e.target.value}:item)}))}/><input aria-label={`Image ${index+1} alternative text`} placeholder="Alternative text" value={image.altText||""} onChange={(e)=>setForm((current)=>({...current,images:current.images.map((item,i)=>i===index?{...item,altText:e.target.value}:item)}))}/><button type="button" aria-label="Remove image" onClick={()=>setForm((current)=>({...current,images:current.images.filter((_,i)=>i!==index)}))}>×</button></div>)}</div>
      <label className={styles.field}>Upload images<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={(e)=>{const selected=Array.from(e.target.files||[]);if(form.images.length+selected.length>5){setImageError("A product can have at most 5 images.");return;}setImageError("");setFiles(selected);}}/><small>{files.length?`${files.length} file(s) selected`:"JPEG, PNG, WebP or GIF"}</small></label>
    </section>
    <section className={styles.subsection}><div className={styles.sectionHeading}><div><h3>Specifications</h3><p>Add attributes appropriate to this product—voltage, RPM, torque, capacity, battery type, or any other specification.</p></div><Button type="button" variant="outline" onClick={()=>setForm((current)=>({...current,specifications:[...current.specifications,{attribute:"",value:""}]}))}>+ Add Specification</Button></div>
      <div className={styles.specList}>{form.specifications.map((spec,index)=><div className={styles.specRow} key={index}><input aria-label={`Specification ${index+1} attribute`} placeholder="Attribute, e.g. Voltage" value={spec.attribute} onChange={(e)=>updateSpec(index,"attribute",e.target.value)}/><input aria-label={`Specification ${index+1} value`} placeholder="Value, e.g. 18V" value={spec.value} onChange={(e)=>updateSpec(index,"value",e.target.value)}/><button type="button" aria-label="Remove specification" onClick={()=>removeSpec(index)} disabled={form.specifications.length===1}>×</button></div>)}</div>
    </section>
    <div className={styles.formActions}><Button disabled={saving}>{saving?"Saving…":product?"Save Changes":"Create Product"}</Button><Button href="/products" variant="outline">Cancel</Button></div>
  </form>;
}
