// store.ts

import { create } from "zustand";
import { ModalSlice, createModalSlice } from "./slices/createModalSlice";
import { AlertSlice, createAlertSlice } from "./slices/createAlertSlice";
import { ShareSlice, createShareSlice } from "./slices/createShareSlice";
import { GlobalSlice, createGlobalSlice } from "./slices/createGlobalSlice";

type StoreState = GlobalSlice & ModalSlice & AlertSlice & ShareSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createGlobalSlice(...a),
    ...createModalSlice(...a),
    ...createAlertSlice(...a),
    ...createShareSlice(...a),
}));
