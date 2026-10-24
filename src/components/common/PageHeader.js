import styles from "@/styles/Common.module.css";
export default function PageHeader({ title, description, children }) { return <section className={styles.pageHeader}><div><h1>{title}</h1><p>{description}</p></div>{children ? <div className={styles.actions}>{children}</div> : null}</section>; }
