import { StateCreator } from "zustand";
import { Share } from "@/types/shareType";
import axios from "../axios";

export interface ShareSlice {
    shares: Share[];
    count: number;
    fetchShares: (offset: number, limit: number, refetch?: boolean) => void;
    isFetchShareLoading: boolean;
}
export const createShareSlice: StateCreator<ShareSlice> = (set, get) => ({
    shares: [],
    count: 0,
    fetchShares: async (offset: number, limit: number, refetch = false) => {
        set({ isFetchShareLoading: true });
        if (refetch) {
            set({ count: 0 });
        }
        const res = await axios.get(`/shares/list?offset=${offset}&limit=${limit}`);
        set({
            shares: res.data.items,
        });
        set({ count: res.data.count });
        set({ isFetchShareLoading: false });
    },
    isFetchShareLoading: false,
});
