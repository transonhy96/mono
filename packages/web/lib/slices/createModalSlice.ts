import { MODAL } from "@/types/modal";
import { StateCreator } from "zustand";

export interface ModalSlice {
    modals: Record<MODAL,boolean>;
    toggle: (key: MODAL) => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set, get) => ({
    modals: {
        [MODAL.SHARING]:false
    },
    toggle: (key:MODAL) => {
        set({
            modals:{
                ...get().modals,
                [key]:!get().modals[key]
            }
        })
    }
})