import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { authService } from "@/services/authService";
import { ROLE_LABELS } from "@/config/roles";
import styles from "@/styles/AdminLayout.module.css";
export default function Topbar() {
  const router = useRouter(); const user = useAuthStore((s) => s.user); const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  const logout = async () => { await authService.logout(); router.replace("/login"); };
  return <header className={styles.topbar}><button className={styles.menu} onClick={toggleSidebar} aria-label="Open navigation">☰</button><form className={styles.search} onSubmit={(e) => e.preventDefault()}><input aria-label="Global search" placeholder="Search orders, products, SKUs, customers..."/><button aria-label="Search">⌕</button></form><div className={styles.actions}><button className={styles.iconButton} aria-label="Notifications">🔔<span className={styles.topBadge}>8</span></button><div className={styles.profile}><div className={styles.avatar}>{initials}</div><div className={styles.profileText}><small>{ROLE_LABELS[user?.role]}</small><strong>{user?.firstName} {user?.lastName}</strong></div></div><button className={styles.logout} onClick={logout}>Logout</button></div></header>;
}
