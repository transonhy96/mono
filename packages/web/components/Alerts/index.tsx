import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertItem } from "@/types/alertType";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import {X} from 'lucide-react';
export function Alerts(props:AlertItem) {
const {icon,title,desc,type,id = ''} = props;
const {removeAlert} = useAppStore();
  return (
    <Alert className="absolute top-4 left-4 z-50 w-1/3" variant={type ==='error' ? 'destructive' : 'default'}>
      <div className="relative">
        <Button onClick={()=>{
          removeAlert(id);
        }} className="absolute top-1 right-1 px-2 py-0 h-7 cursor-pointer">
          <X width={12} height={12}/>
        </Button>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {desc}
        </AlertDescription>
      </div>
    </Alert>
  )
}
