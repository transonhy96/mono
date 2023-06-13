import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/lib/store";
import { MODAL } from "@/types/modal";
export interface DialogProps{
    trigger?:React.ReactNode;
    title:string;
    desc?:string;
    children?:React.ReactNode | string | number | undefined;
    type:MODAL
}
export function Dialoger(props: DialogProps) {
  const {trigger,title,desc,children, type} = props;
  const store = useAppStore();
  return (
    <Dialog open={store.modals[type]} onOpenChange={()=>{
      store.toggle(type);
    }}>
      <DialogTrigger asChild>
        {
            trigger
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {desc}
          </DialogDescription>
        </DialogHeader>
        {
            children
        }
      </DialogContent>
    </Dialog>
  )
}
