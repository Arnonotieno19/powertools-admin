import styles from "@/styles/Common.module.css";
export default function EmptyState({ title = "Nothing found", message = "Try changing your search or filters." }) { return <div className={styles.empty}><div><strong>{title}</strong><p>{message}</p></div></div>; }
