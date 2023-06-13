// store.ts

import create from 'zustand'
import { ModalSlice, createModalSlice } from './slices/createModalSlice'

type StoreState = ModalSlice & {}

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
}))