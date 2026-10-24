import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import Loader from "@/components/common/Loader";

export default function RequireAuth({ permission, children }) {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated } = useAuthStore();
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
  }, [hasHydrated, isAuthenticated, router]);
  if (!hasHydrated || !isAuthenticated) return <Loader label="Checking staff access…"/>;
  if (permission && !user?.permissions?.includes(permission)) return <div style={{padding:40}}><h1>Access denied</h1><p>You do not have permission to view this page.</p></div>;
  return children;
}
