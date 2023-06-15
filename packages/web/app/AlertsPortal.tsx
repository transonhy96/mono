"use client";

import { Alerts } from "@/components";
import { useAppStore } from "@/lib/store";

export function AlertsPortal() {
    const { renderAlerts } = useAppStore();
    return (
        <>
            {renderAlerts.length > 0 &&
                renderAlerts.map((s) => <Alerts key={s.id} {...s}></Alerts>)}
        </>
    );
}
