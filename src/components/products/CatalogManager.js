import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import StatusBadge from "@/components/common/StatusBadge";
import { catalogService } from "@/services/catalogService";
import { PERMISSIONS } from "@/config/permissions";
import formStyles from "@/styles/Forms.module.css";
import tableStyles from "@/styles/Tables.module.css";

const blankBrand = { name: "", description: "", logoUrl: "", active: true };
const blankCategory = { name: "", description: "", imageUrl: "", parentId: "", sortOrder: 0, active: true };

export default function CatalogManager({ type }) {
  const categoryMode = type === "category";
  const blank = categoryMode ? blankCategory : blankBrand;
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const title = categoryMode ? "Categories" : "Brands";
  const service = useMemo(() => categoryMode ? {
    list: catalogService.getCategories, create: catalogService.createCategory, update: catalogService.updateCategory, remove: catalogService.deleteCategory,
  } : { list: catalogService.getBrands, create: catalogService.createBrand, update: catalogService.updateBrand, remove: catalogService.deleteBrand }, [categoryMode]);

  const load = () => { setError(""); service.list().then(setItems).catch((err) => setError(err.message)); };
  useEffect(() => { let active=true; service.list().then((data)=>{if(active)setItems(data);}).catch((err)=>{if(active)setError(err.message);}); return()=>{active=false}; }, [service]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const reset = () => { setEditing(null); setForm(blank); setError(""); };
  const edit = (item) => { setEditing(item.id); setForm(categoryMode ? { name:item.name, description:item.description||"", imageUrl:item.imageUrl||"", parentId:item.parentId||"", sortOrder:item.sortOrder||0, active:item.active } : { name:item.name, description:item.description||"", logoUrl:item.logoUrl||"", active:item.active }); };
  async function submit(event) { event.preventDefault(); setSaving(true); setError(""); try { const payload = categoryMode ? { ...form, parentId:form.parentId ? Number(form.parentId) : null, sortOrder:Number(form.sortOrder) } : form; if (editing) await service.update(editing,payload); else await service.create(payload); reset(); load(); } catch (err) { setError(err.message); } finally { setSaving(false); } }
  async function deactivate(item) { if (!window.confirm(`Deactivate ${item.name}?`)) return; try { await service.remove(item.id); load(); } catch (err) { setError(err.message); } }

  return <AdminLayout permission={PERMISSIONS.PRODUCT_UPDATE}>
    <PageHeader title={title} description={`Create and maintain the ${title.toLowerCase()} used by the storefront catalogue.`}/>
    <div className={formStyles.detailGrid}>
      <section className={formStyles.panel}><h3>{editing ? `Edit ${type}` : `Add ${type}`}</h3>{error&&<div className={formStyles.danger}>{error}</div>}
        <form className={formStyles.form} onSubmit={submit}><div className={formStyles.grid}>
          <label className={formStyles.field}>Name<input required value={form.name} onChange={(e)=>update("name",e.target.value)}/></label>
          {categoryMode ? <><label className={formStyles.field}>Parent category<select value={form.parentId} onChange={(e)=>update("parentId",e.target.value)}><option value="">Top level</option>{(items||[]).filter((item)=>item.id!==editing).map((item)=><option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label className={formStyles.field}>Image URL<input type="url" value={form.imageUrl} onChange={(e)=>update("imageUrl",e.target.value)}/></label><label className={formStyles.field}>Sort order<input type="number" min="0" value={form.sortOrder} onChange={(e)=>update("sortOrder",e.target.value)}/></label></> : <label className={formStyles.field}>Logo URL<input type="url" value={form.logoUrl} onChange={(e)=>update("logoUrl",e.target.value)}/></label>}
          <label className={`${formStyles.field} ${formStyles.wide}`}>Description<textarea value={form.description} onChange={(e)=>update("description",e.target.value)}/></label>
          <label className={formStyles.checkbox}><input type="checkbox" checked={form.active} onChange={(e)=>update("active",e.target.checked)}/> Active</label>
        </div><div className={formStyles.formActions}><Button disabled={saving}>{saving?"Saving…":editing?"Save Changes":`Add ${type}`}</Button>{editing&&<Button type="button" variant="outline" onClick={reset}>Cancel</Button>}</div></form>
      </section>
      <section className={tableStyles.panel}>{!items?<Loader label={`Loading ${title.toLowerCase()}…`}/>:items.length===0?<EmptyState title={`No ${title.toLowerCase()} found`}/>:<div className={tableStyles.wrap}><table className={tableStyles.table}><thead><tr><th>Name</th>{categoryMode&&<th>Parent</th>}<th>Description</th><th>Status</th><th>Actions</th></tr></thead><tbody>{items.map((item)=><tr key={item.id}><td><strong>{item.name}</strong></td>{categoryMode&&<td>{item.parentName||"Top level"}</td>}<td>{item.description||"—"}</td><td><StatusBadge status={item.active?"ACTIVE":"DISABLED"}/></td><td><div className={tableStyles.actions}><button className={tableStyles.action} type="button" onClick={()=>edit(item)}>Edit</button>{item.active&&<button className={tableStyles.action} type="button" onClick={()=>deactivate(item)}>Deactivate</button>}</div></td></tr>)}</tbody></table></div>}</section>
    </div>
  </AdminLayout>;
}
