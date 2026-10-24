import { useAuthStore } from "@/store/authStore";
import { hasPermission } from "@/config/permissions";
export default function PermissionGuard({ permission, fallback = null, children }) { const user = useAuthStore((state) => state.user); return hasPermission(user, permission) ? children : fallback; }
