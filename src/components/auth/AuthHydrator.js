import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthHydrator({ children }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    const verify = () => {
      const state = useAuthStore.getState();
      if (!state.accessToken) return;
      try {
        const payload = JSON.parse(atob(state.accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        if (!payload.exp || payload.exp * 1000 <= Date.now()) state.logout();
      } catch { state.logout(); }
    };
    verify();
    const timer = window.setInterval(verify, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return children;
}
