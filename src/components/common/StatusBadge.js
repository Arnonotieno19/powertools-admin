import styles from "@/styles/Common.module.css";
const success = ["ACTIVE", "PAID", "DELIVERED", "APPROVED", "RECEIVED", "CLOSED", "IN_STOCK", "PURCHASE_RECEIPT", "RETURN", "TRANSFER_IN", "RETURNED", "REPLACED"];
const warning = ["PENDING", "DRAFT", "PROCESSING", "PARTIALLY_RECEIVED", "IN_TRANSIT", "LOW_STOCK", "PENDING_PAYMENT", "PENDING_APPROVAL", "ORDERED", "REVIEW", "REQUESTED", "ORDER_RESERVATION"];
const info = ["SENT", "SHIPPED", "PACKED", "READY_FOR_DISPATCH", "PART_RECEIVED", "SALE", "ADJUSTMENT", "TRANSFER_OUT", "ORDER_RELEASE", "INSPECTED"];
export default function StatusBadge({ status }) { const tone = success.includes(status) ? "success" : warning.includes(status) ? "warning" : info.includes(status) ? "info" : ["CANCELLED","DISABLED","LOCKED","OUT_OF_STOCK","REJECTED","SUSPENDED","DAMAGE","DAMAGED"].includes(status) ? "error" : "neutral"; return <span className={`${styles.status} ${styles[tone]}`}>{String(status).replaceAll("_", " ")}</span>; }
