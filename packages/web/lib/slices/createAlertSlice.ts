import { AlertItem } from "@/types/alertType";
import { StateCreator } from "zustand";
export interface AlertSlice {
    alerts: AlertItem[];
    addAlert: (item: AlertItem) => void;
    removeAlert: (id: string) => void;
}
export const createAlertSlice: StateCreator<AlertSlice> = (set, get) => ({
    alerts: [],
    addAlert: (item: AlertItem) => {
        set({
            alerts: [
                ...get().alerts,
                {
                    ...item,
                    id: (get().alerts.length + 1).toString(),
                },
            ],
        });
    },
    removeAlert: (id: string) => {
        set({
            alerts: [...get().alerts.filter((s) => s.id !== id)],
        });
    },
});
