import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthHydrator({ children }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);
  return children;
}
