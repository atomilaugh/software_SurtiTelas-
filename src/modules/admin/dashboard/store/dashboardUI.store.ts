import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardUIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const useDashboardUIStore = create<DashboardUIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
      openSidebar: () => set({ sidebarOpen: true }),
    }),
    { name: 'dashboard-ui' }
  )
);
