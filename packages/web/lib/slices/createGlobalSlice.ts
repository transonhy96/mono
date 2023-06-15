import { StateCreator } from "zustand";

export interface GlobalSlice {
  sidebar: boolean;
  tab: string;
  toggleSidebar: () => void;
  setSidebar: (s: boolean) => void;
  setActiveTab: (s: string) => void;
}

export const createGlobalSlice: StateCreator<GlobalSlice> = (set, get) => ({
  sidebar: false,
  tab: "",
  toggleSidebar: () => {
    set({
      sidebar: !get().sidebar,
    });
  },
  setSidebar: (status: boolean) => {
    set({ sidebar: status });
  },
  setActiveTab: (tab: string) => {
    set({ tab: tab });
  },
});
