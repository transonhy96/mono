// store.ts

import {create} from 'zustand'
import { ModalSlice, createModalSlice } from './slices/createModalSlice'
import { AlertSlice, createAlertSlice } from './slices/createAlertSlice'

type StoreState = ModalSlice & AlertSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
    ...createAlertSlice(...a),
}))