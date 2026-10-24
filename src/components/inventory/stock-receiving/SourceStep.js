import Button from "@/components/common/Button";
import styles from "@/styles/StockWizard.module.css";
import formStyles from "@/styles/Forms.module.css";

export default function SourceStep({source,onChange,options,user,error,onContinue,onCancel}){
  return <><div className={styles.stepHeader}><h2>Receive Stock</h2><p>Record stock received into a warehouse.</p></div>{error&&<div className={styles.validation}>{error}</div>}<div className={formStyles.grid}>
    <div className={formStyles.field}><label htmlFor="supplier">Supplier</label><select id="supplier" value={source.supplierId} onChange={(e)=>onChange("supplierId",e.target.value)}><option value="">Select supplier</option>{options.suppliers.map((item)=><option value={item.id} key={item.id}>{item.name}</option>)}</select></div>
    <div className={formStyles.field}><label htmlFor="po">Purchase Order</label><select id="po" value={source.purchaseOrderId} onChange={(e)=>onChange("purchaseOrderId",e.target.value)}><option value="">No Purchase Order / Manual Receipt</option>{options.purchaseOrders.filter((po)=>!["RECEIVED","CLOSED","CANCELLED"].includes(po.status)&&(!source.supplierId||String(po.supplierId)===String(source.supplierId))).map((po)=><option value={po.id} key={po.id}>{po.number} · {po.status.replaceAll("_"," ")}</option>)}</select></div>
    <div className={formStyles.field}><label htmlFor="warehouse">Receiving Warehouse</label><select id="warehouse" value={source.warehouseId} onChange={(e)=>onChange("warehouseId",e.target.value)}><option value="">Select warehouse</option>{options.warehouses.map((item)=><option value={item.id} key={item.id}>{item.name}</option>)}</select></div>
    <div className={formStyles.field}><label htmlFor="reference">Delivery / Supplier Reference</label><input id="reference" value={source.supplierReference} onChange={(e)=>onChange("supplierReference",e.target.value)} placeholder="e.g. DEL-48391"/></div>
    <div className={formStyles.field}><label htmlFor="date">Date Received</label><input id="date" type="date" value={source.receivedDate} onChange={(e)=>onChange("receivedDate",e.target.value)}/></div>
    <div className={formStyles.field}><label htmlFor="receivedBy">Received By</label><input id="receivedBy" value={`${user.firstName} ${user.lastName}`} readOnly/></div>
    <div className={`${formStyles.field} ${formStyles.wide}`}><label htmlFor="notes">Notes</label><textarea id="notes" value={source.notes} onChange={(e)=>onChange("notes",e.target.value)} placeholder="Delivery condition or receiving notes"/></div>
  </div><div className={styles.actions}><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="button" onClick={onContinue}>Continue</Button></div></>;
}
