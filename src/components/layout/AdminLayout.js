import RequireAuth from "@/components/auth/RequireAuth";
import Sidebar from "./Sidebar"; import Topbar from "./Topbar"; import Footer from "./Footer";
import styles from "@/styles/AdminLayout.module.css";
export default function AdminLayout({ permission, children }) { return <RequireAuth permission={permission}><div className={styles.app}><Sidebar/><main className={styles.main}><Topbar/><div className={styles.content}>{children}<Footer/></div></main></div></RequireAuth>; }
