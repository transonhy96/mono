import { StateCreator } from "zustand";

export interface GlobalSlice {
  sidebar: boolean;
  toggleSidebar: () => void;
  setSidebar: (s: boolean) => void;
}

export const createGlobalSlice: StateCreator<GlobalSlice> = (set, get) => ({
  sidebar: false,
  toggleSidebar: () => {
    set({
      sidebar: !get().sidebar,
    });
  },
  setSidebar: (status: boolean) => {
    set({ sidebar: status });
  },
});
