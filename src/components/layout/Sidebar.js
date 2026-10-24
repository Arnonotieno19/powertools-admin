import Link from "next/link";
import { useRouter } from "next/router";
import { navigation } from "@/config/navigation";
import { hasPermission } from "@/config/permissions";
import { ROLE_LABELS } from "@/config/roles";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import styles from "@/styles/AdminLayout.module.css";

export default function Sidebar() {
  const router = useRouter(); const user = useAuthStore((s) => s.user); const { sidebarOpen, setSidebarOpen } = useUiStore();
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  const items = navigation.filter((item) => hasPermission(user, item.permission));
  const isActive = (item) => {
    const [path, queryString] = item.href.split("?");
    if (queryString) {
      const expected = new URLSearchParams(queryString);
      return router.pathname === path && [...expected].every(([key, value]) => router.query[key] === value);
    }
    if (path === "/") return router.pathname === "/";
    if (router.pathname === path) {
      const hasFilteredSibling = items.some((candidate) => candidate.href.startsWith(`${path}?`) && candidate.href.split("?")[1]?.split("=")[0] in router.query);
      return !hasFilteredSibling;
    }
    const hasExactChild = items.some((candidate) => candidate.href.split("?")[0] === router.pathname);
    return !hasExactChild && router.pathname.startsWith(`${path}/`);
  };
  return <>
    {sidebarOpen && <button className={styles.overlay} aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>}
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.brandWrap}><Link href="/" className={styles.brand} onClick={() => setSidebarOpen(false)}><span className={styles.brandIcon}>T</span>Tool<span>Mart</span></Link></div>
      <nav className={styles.nav} aria-label="Admin navigation">{items.map((item, index) => <div key={item.href + item.label}>{(item.section && (index === 0 || items[index - 1]?.section !== item.section)) ? <div className={styles.section}>{item.section}</div> : null}<Link href={item.href} onClick={() => setSidebarOpen(false)} className={`${styles.navItem} ${isActive(item) ? styles.active : ""}`}><span className={styles.navIcon}>{item.icon}</span>{item.label}{item.badge ? <span className={styles.badge}>{item.badge}</span> : null}</Link></div>)}</nav>
      <div className={styles.sidebarBottom}><div className={styles.user}><div className={styles.avatar}>{initials}</div><div><small>{ROLE_LABELS[user?.role]}</small><strong>{user?.firstName} {user?.lastName}</strong></div></div></div>
    </aside>
  </>;
}
