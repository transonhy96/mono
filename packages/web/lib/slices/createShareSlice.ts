import { StateCreator } from "zustand";
import { Share } from "@/types/shareType";
import axios from "../axios";

export interface ShareSlice {
    shares: Share[];
    count: number;
    fetchShares: () => void;
    isFetchShareLoading: boolean;
}
export const createShareSlice: StateCreator<ShareSlice> = (set, get) => ({
    shares: [],
    count: 0,
    fetchShares: async () => {
        set({ isFetchShareLoading: true });
        const res = await axios.get("/shares/list/?offset=0&limit=3");
        set({
            shares: res.data.items,
        });
        set({ count: res.data.count });
        set({ isFetchShareLoading: false });
    },
    isFetchShareLoading: false,
});
