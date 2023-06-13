import { StateCreator } from "zustand";
import { Share } from "@/types/shareType";
import axios from "../axios";

export interface ShareSlice {
    shares: Share[];
    fetchShares: () => void;
    isFetchShareLoading: boolean;
}
export const createShareSlice: StateCreator<ShareSlice> = (set, get) => ({
    shares: [],
    fetchShares: async()=>{
        set({isFetchShareLoading:true});
        const res = await axios.get("/shares/list");
        set({
            shares:res.data.items
        });
        set({isFetchShareLoading:true});
    },
    isFetchShareLoading:false
})