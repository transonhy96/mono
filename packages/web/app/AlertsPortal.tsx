"use client";

import { Alerts } from "@/components";
import { useAppStore } from "@/lib/store";

export function AlertsPortal(){
    const {alerts} = useAppStore();
    console.log({alerts})
    return (
        <>
            {
                alerts.length > 0 &&
                alerts.map(s=>
                    <Alerts key={s.id} {...s}></Alerts>    
                )
            }
        </>
    )
}