import { create } from "zustand";

export const useUiStore = create((set) => ({
  sidebarOpen: false,
  notificationsOpen: false,
  activeModal: null,
  modalData: null,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setNotificationsOpen: (notificationsOpen) => set({ notificationsOpen }),
  openModal: (activeModal, modalData = null) => set({ activeModal, modalData }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
