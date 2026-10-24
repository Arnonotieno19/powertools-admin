import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { inventoryService } from "@/services/inventoryService";
import { PERMISSIONS } from "@/config/permissions";
import { formatCurrency } from "@/utils/format";
import styles from "@/styles/Forms.module.css";
import tableStyles from "@/styles/Tables.module.css";
export default function Receipt(){const router=useRouter();const [receipt,setReceipt]=useState(null);const [error,setError]=useState("");useEffect(()=>{if(!router.isReady)return;let active=true;inventoryService.getStockReceipt(router.query.id).then((data)=>{if(active){if(data)setReceipt(data);else setError("Stock receipt not found.")}}).catch((err)=>{if(active)setError(err.message)});return()=>{active=false}},[router.isReady,router.query.id]);return <AdminLayout permission={PERMISSIONS.INVENTORY_VIEW}><PageHeader title={receipt?.receiptNumber||"Goods Received Note"} description="Printable stock receipt and movement source document."><Button href="/inventory" variant="outline">Inventory</Button><Button variant="dark" onClick={()=>window.print()}>Print GRN</Button></PageHeader>{error?<ErrorState message={error}/>:!receipt?<Loader label="Loading receipt…"/>:<section className={styles.panel}><div className={styles.meta}>{Object.entries({Supplier:receipt.supplier.name,Warehouse:receipt.warehouse.name,"Purchase Order":receipt.purchaseOrderNumber||"Manual receipt",Reference:receipt.reference,"Received at":receipt.receivedAt,"Received by":receipt.receivedBy.name}).map(([key,value])=><div className={styles.metaItem} key={key}><small>{key}</small><strong>{value}</strong></div>)}</div><div className={tableStyles.wrap} style={{marginTop:20}}><table className={tableStyles.table}><thead><tr><th>SKU</th><th>Product</th><th>Quantity</th><th>Condition</th><PermissionGuard permission={PERMISSIONS.INVENTORY_COST_INPUT}><th>Unit Cost</th><th>Line Value</th></PermissionGuard></tr></thead><tbody>{receipt.items.map((item)=><tr key={item.variantId}><td><strong>{item.sku}</strong></td><td>{item.name}</td><td>{item.quantity}</td><td>{item.condition}</td><PermissionGuard permission={PERMISSIONS.INVENTORY_COST_INPUT}><td>{formatCurrency(item.unitCost)}</td><td>{formatCurrency(item.quantity*item.unitCost)}</td></PermissionGuard></tr>)}</tbody></table></div></section>}</AdminLayout>}
