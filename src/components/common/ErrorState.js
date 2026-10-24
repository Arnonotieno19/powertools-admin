import styles from "@/styles/Common.module.css";
export default function ErrorState({ message = "Something went wrong." }) { return <div className={styles.errorState}>{message}</div>; }
