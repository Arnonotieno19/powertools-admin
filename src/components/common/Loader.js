import styles from "@/styles/Common.module.css";
export default function Loader({ label = "Loading…" }) { return <div className={styles.loader}><div><div className={styles.spinner}/><p>{label}</p></div></div>; }
