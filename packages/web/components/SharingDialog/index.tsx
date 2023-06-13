"use client";
import { Dialoger } from "../Dialog";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SharingSchema } from "./schemas/SharingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MODAL } from "@/types/modal";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useAppStore } from "@/lib/store";
export function SharingDialog(){
  const axiosAuth = useAxiosAuth();
  const {toggle,addAlert} = useAppStore();
    const form = useForm<z.infer<typeof SharingSchema>>({
        resolver: zodResolver(SharingSchema),
      });
      async function onSubmit(values: z.infer<typeof SharingSchema>) {
        try {
          const res = await axiosAuth.post("/shares/create",
        {
          url:values.url,
          user_id:0
        });
          if(res.status === 201){
            addAlert({
              title:"Create share",
              type:'success',
              desc:'Create share successfully'
            });
            toggle(MODAL.SHARING);
          }else{
            console.log(res.data);
          }
        } catch (error) {
          //alert error
          console.log(error);
        }
        
      }
    
    return(
      <Dialoger title="Sharing video" type={MODAL.SHARING}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube url</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your youtube url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Confirm</Button>
        </form>
      </Form>
      </Dialoger>
    )
}