"use client";
import { AlertItem } from "@/types/alertType";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";
import { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
export function Alerts(props: AlertItem) {
  const { icon, title, desc, type, id = "" } = props;

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        duration={3000}
        className="bg-secondary rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          {title}
        </Toast.Title>
        <Toast.Description>{desc}</Toast.Description>
        <Toast.Action altText="text" />
        <Toast.Close asChild>
          <Button onClick={() => { }} className="[grid-area:_action]">
            <X width={12} height={12} />
          </Button>
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
