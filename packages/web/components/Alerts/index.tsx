"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertItem } from "@/types/alertType";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
export function Alerts(props: AlertItem) {
  const { icon, title, desc, type, id = "" } = props;
  const { removeAlert } = useAppStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert(id);
    }, 3200);
    return () => clearTimeout(timer);
  }, [removeAlert, id]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((progress) => progress + (100 * 10) / 3000);
    }, 10);
    return () => clearInterval(timer);
  }, []);
  return (
    <Alert
      className="absolute top-25 left-4 z-50 w-1/4"
      variant={type === "error" ? "destructive" : "default"}
    >
      <div className="relative">
        <Button
          onClick={() => {
            removeAlert(id);
          }}
          className="absolute top-1 right-1 px-2 py-0 h-7 cursor-pointer"
        >
          <X width={12} height={12} />
        </Button>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{desc}</AlertDescription>
      </div>{" "}
      <Progress
        value={progress}
        className="absolute bottom-[1px] right-0 h-1 px-[1px]"
      />
    </Alert>
  );
}
