import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export interface SheetProps {
  trigger: React.ReactNode;
  action?: React.ReactNode;
  position: "right" | "left";
  title: string;
  desc: string;
  actionType?: "submit" | "button";
  children?: React.ReactNode;
}
export function Sidebar(props: SheetProps) {
  const {
    trigger,
    action,
    actionType = "button",
    position = "right",
    title,
    desc,
    children,
  } = props;
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent position={position} size="sm">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{desc}</SheetDescription>
        </SheetHeader>
        {children && children}{" "}
        <SheetFooter>
          <SheetClose asChild>
            <Button type={actionType}>{action}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
