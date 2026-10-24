import { api } from "./apiClient";
import { mockLogin } from "@/mocks/auth";
import { useAuthStore } from "@/store/authStore";

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export const authService = {
  login(identifier, password) {
    return useMocks ? mockLogin(identifier, password) : api.post("/auth/staff/login", { identifier, password }, { auth: false });
  },
  getCurrentUser() {
    return useMocks ? Promise.resolve(useAuthStore.getState().user) : api.get("/auth/me");
  },
  forgotPassword(identifier) {
    return useMocks ? Promise.resolve({ success: true, message: "Reset instructions sent if the account exists." }) : api.post("/auth/forgot-password", { identifier }, { auth: false });
  },
  resetPassword(token, password) {
    return useMocks ? Promise.resolve({ success: true }) : api.post("/auth/reset-password", { token, password }, { auth: false });
  },
  logout() {
    useAuthStore.getState().logout();
    return useMocks ? Promise.resolve() : api.post("/auth/logout").catch(() => undefined);
  },
};
