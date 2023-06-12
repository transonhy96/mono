import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fragment } from "react";
export interface TabItem {
  title: string;
  desc: string;
  content: JSX.Element | React.ReactNode;
  key: string;
  asForm?: boolean;
  action?: string;
}
export interface TabProps {
  tabs: TabItem[];
  active: string;
}
export function Tab(props: TabProps) {
  const { tabs, active } = props;
  return (
    <Tabs defaultValue={active} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {tabs.length > 0 &&
          tabs.map((s) => (
            <Fragment key={s.key}>
              <TabsTrigger value={s.key}>{s.title}</TabsTrigger>
            </Fragment>
          ))}
      </TabsList>

      {tabs.length > 0 &&
        tabs.map((s) => (
          <TabsContent key={s.key} value={s.key}>
            {s.asForm ? <></> : <div>{s.content}</div>}
          </TabsContent>
        ))}
    </Tabs>
  );
}
