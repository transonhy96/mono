// store.ts

import {create} from 'zustand'
import { ModalSlice, createModalSlice } from './slices/createModalSlice'
import { AlertSlice, createAlertSlice } from './slices/createAlertSlice'
import { ShareSlice, createShareSlice } from './slices/createShareSlice'

type StoreState = ModalSlice & AlertSlice & ShareSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
    ...createAlertSlice(...a),
    ...createShareSlice(...a),
}))